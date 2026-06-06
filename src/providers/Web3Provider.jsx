'use client';

import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { ethers } from 'ethers';
import { TruestampContract } from '../lib/contract';
import { CONSTANTS } from '../lib/constants';

const Web3Context = createContext({
  address: null,
  isConnected: false,
  chainId: null,
  networkName: null,
  isCorrectNetwork: false,
  connect: async () => {},
  disconnect: () => {},
  switchNetwork: async () => {},
  role: 'user', // 'admin' | 'authority' | 'user'
});

export const useWeb3 = () => useContext(Web3Context);

// Helper: get a read-only provider from Alchemy (NEXT_PUBLIC_ so it works client-side)
function getReadProvider() {
  return new ethers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL || CONSTANTS.RPC_URL
  );
}

// Resolve role: admin > authority (ISSUER_ROLE on-chain) > user
async function resolveRole(account) {
  const adminWallet = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS || '';
  if (adminWallet && account.toLowerCase() === adminWallet.toLowerCase()) {
    return 'admin';
  }
  try {
    // Role check is a read-only call — no signer needed
    const readProvider = getReadProvider();
    const contract = new ethers.Contract(
      TruestampContract.address,
      TruestampContract.abi,
      readProvider
    );
    const issuerRole = await contract.ISSUER_ROLE();
    const isAuthority = await contract.hasRole(issuerRole, account);
    if (isAuthority) return 'authority';
  } catch (err) {
    console.warn('Role check failed (chain unavailable?):', err.message);
  }
  return 'user';
}

export function Web3Provider({ children }) {
  const [address, setAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [role, setRole] = useState('user');
  const [chainId, setChainId] = useState(null);
  const [networkName, setNetworkName] = useState(null);

  const isCorrectNetwork = chainId === CONSTANTS.SUPPORTED_CHAIN_ID_HEX;

  // Switch to Amoy — exported so components can request a switch without full reconnect
  const switchNetwork = useCallback(async () => {
    if (!window.ethereum) return;
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CONSTANTS.SUPPORTED_CHAIN_ID_HEX }],
      });
    } catch (switchError) {
      if (
        switchError.code === 4902 ||
        (switchError.message && switchError.message.includes('Unrecognized chain ID'))
      ) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [CONSTANTS.NETWORK_PARAMS],
          });
        } catch (addError) {
          console.error('Failed to add network:', addError);
          throw new Error(
            `Please add ${CONSTANTS.NETWORK_PARAMS.chainName} to MetaMask manually.`
          );
        }
      } else {
        console.error('Failed to switch network:', switchError);
        throw new Error(
          `Please switch to ${CONSTANTS.NETWORK_PARAMS.chainName} in MetaMask.`
        );
      }
    }
  }, []);

  // Listen for account / chain changes from MetaMask
  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) return;

    const handleAccountsChanged = async (accounts) => {
      if (accounts.length === 0) {
        setAddress(null);
        setIsConnected(false);
        setRole('user');
      } else {
        setAddress(accounts[0]);
        setIsConnected(true);
        const resolved = await resolveRole(accounts[0]);
        setRole(resolved);
      }
    };

    const handleChainChanged = (newChainId) => {
      setChainId(newChainId);
      // Map hex chainId to human-readable network name
      const names = {
        '0x13882': 'Polygon Amoy',
        '0x89': 'Polygon Mainnet',
        '0x1': 'Ethereum Mainnet',
        '0xaa36a7': 'Sepolia Testnet',
      };
      setNetworkName(names[newChainId] || `Chain ${parseInt(newChainId, 16)}`);
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    // Read current chain on mount (no full connect — just observe)
    window.ethereum
      .request({ method: 'eth_chainId' })
      .then(handleChainChanged)
      .catch(() => {});

    // Restore session if already connected
    window.ethereum
      .request({ method: 'eth_accounts' })
      .then((accounts) => {
        if (accounts.length > 0) handleAccountsChanged(accounts);
      })
      .catch(() => {});

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  const connect = useCallback(async () => {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      alert('MetaMask not found. Please install MetaMask.');
      return;
    }
    try {
      // Ensure correct network before requesting accounts
      const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (currentChainId !== CONSTANTS.SUPPORTED_CHAIN_ID_HEX) {
        await switchNetwork();
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      setAddress(account);
      setIsConnected(true);
      const resolvedRole = await resolveRole(account);
      setRole(resolvedRole);
    } catch (error) {
      console.error('Connection failed:', error);
      throw error;
    }
  }, [switchNetwork]);

  const disconnect = useCallback(() => {
    setAddress(null);
    setIsConnected(false);
    setRole('user');
    // Note: MetaMask doesn't expose a programmatic disconnect — we just clear state
  }, []);

  return (
    <Web3Context.Provider
      value={{
        address,
        isConnected,
        chainId,
        networkName,
        isCorrectNetwork,
        connect,
        disconnect,
        switchNetwork,
        role,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

'use client';

import { useState, createContext, useContext } from 'react';
import { ethers } from 'ethers';
import { TruestampContract } from '../lib/contract';

const Web3Context = createContext({
  address: null,
  isConnected: false,
  connect: async () => {},
  disconnect: () => {},
  role: 'user', // 'admin' | 'authority' | 'user'
});

export const useWeb3 = () => useContext(Web3Context);

// Resolve role: admin > authority (ISSUER_ROLE on-chain) > user
async function resolveRole(account) {
  const adminWallet = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS || '';
  if (adminWallet && account.toLowerCase() === adminWallet.toLowerCase()) {
    return 'admin';
  }
  try {
    const readProvider = new ethers.JsonRpcProvider(
      process.env.REACT_APP_ALCHEMY_RPC_URL
    )
    const writeProvider = new ethers.BrowserProvider(window.ethereum)
    const signer = await writeProvider.getSigner()
    const contract = new ethers.Contract(
      TruestampContract.address,
      TruestampContract.abi,
      readProvider
    );
    // Fetch ISSUER_ROLE bytes32 from contract, then check hasRole
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

  const connect = async () => {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      alert('MetaMask not found. Please install MetaMask.');
      return;
    }
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const account = accounts[0];
      setAddress(account);
      setIsConnected(true);
      const resolvedRole = await resolveRole(account);
      setRole(resolvedRole);
    } catch (error) {
      console.error('User rejected connection:', error);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setIsConnected(false);
    setRole('user');
  };

  return (
    <Web3Context.Provider value={{ address, isConnected, connect, disconnect, role }}>
      {children}
    </Web3Context.Provider>
  );
}

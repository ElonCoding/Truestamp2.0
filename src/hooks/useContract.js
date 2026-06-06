'use client';

import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { TruestampContract } from '../lib/contract';
import { CONSTANTS } from '../lib/constants';

// Shared helper — get a read-only provider (no wallet needed)
function getReadProvider() {
  return new ethers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL || CONSTANTS.RPC_URL
  );
}

// Shared helper — get a write provider + signer from MetaMask
async function getWriteSigner() {
  if (!window.ethereum) throw new Error('MetaMask not found. Please install MetaMask.');
  const writeProvider = new ethers.BrowserProvider(window.ethereum);
  return writeProvider.getSigner();
}

/**
 * useContract — real on-chain interactions via ethers v6
 *
 * All write functions auto-ensure the user is on the correct network
 * before sending a transaction.
 */
export function useContract() {
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState(null);
  const [error, setError] = useState(null);

  // Ensure the wallet is on Polygon Amoy before any write call
  const ensureCorrectNetwork = useCallback(async () => {
    const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (currentChainId !== CONSTANTS.SUPPORTED_CHAIN_ID_HEX) {
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
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [CONSTANTS.NETWORK_PARAMS],
          });
        } else {
          throw new Error(`Please switch to ${CONSTANTS.NETWORK_PARAMS.chainName} in MetaMask.`);
        }
      }
    }
  }, []);

  /**
   * whitelistAuthority — admin-only: grant ISSUER_ROLE to an address on-chain.
   * @param {string} address - the wallet address to whitelist
   * @param {string} name - organisation name
   * @param {string} dept - department
   * @param {string} ipfsCID - metadata CID (can be 'ipfs://dummy' if not set)
   */
  const whitelistAuthority = useCallback(async (address, name = '', dept = '', ipfsCID = 'ipfs://dummy') => {
    setLoading(true);
    setError(null);
    setTxHash(null);
    try {
      await ensureCorrectNetwork();
      const signer = await getWriteSigner();
      const contract = new ethers.Contract(TruestampContract.address, TruestampContract.abi, signer);
      const tx = await contract.whitelistAuthority(address, name, dept, ipfsCID);
      const receipt = await tx.wait();
      setTxHash(receipt.hash);
      return { success: true, txHash: receipt.hash };
    } catch (err) {
      const msg = err?.reason || err?.shortMessage || err?.message || 'Transaction failed';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, [ensureCorrectNetwork]);

  /**
   * submitBatch — authority: submit a Merkle root + IPFS CID for a batch of documents.
   * @param {string} merkleRoot - bytes32 hex Merkle root
   * @param {string} ipfsCID - IPFS CID of the batch
   * @param {number} docCount - number of documents in the batch
   */
  const submitBatch = useCallback(async (merkleRoot, ipfsCID, docCount) => {
    setLoading(true);
    setError(null);
    setTxHash(null);
    try {
      await ensureCorrectNetwork();
      const signer = await getWriteSigner();
      const contract = new ethers.Contract(TruestampContract.address, TruestampContract.abi, signer);
      const tx = await contract.submitBatch(merkleRoot, ipfsCID, docCount);
      const receipt = await tx.wait();

      // Parse BatchSubmitted event to get batchId
      let batchId = null;
      for (const log of receipt.logs) {
        try {
          const parsed = contract.interface.parseLog(log);
          if (parsed?.name === 'BatchSubmitted') {
            batchId = parsed.args.batchId?.toString();
          }
        } catch (_) { /* skip unparseable logs */ }
      }

      setTxHash(receipt.hash);
      return { success: true, txHash: receipt.hash, batchId };
    } catch (err) {
      const msg = err?.reason || err?.shortMessage || err?.message || 'Transaction failed';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, [ensureCorrectNetwork]);

  /**
   * verifyHash — read-only: check if a document hash exists on-chain.
   * Returns { verified, batchId, issuer } or { verified: false }.
   * @param {string} docHash - keccak256 hex hash of the document
   */
  const verifyHash = useCallback(async (docHash) => {
    setLoading(true);
    setError(null);
    try {
      const readProvider = getReadProvider();
      const contract = new ethers.Contract(TruestampContract.address, TruestampContract.abi, readProvider);

      const batchIdBN = await contract.documentIndex(docHash);
      const batchId = batchIdBN.toString();
      const verified = batchId !== '0';

      let issuer = null;
      if (verified) {
        const batch = await contract.getBatchInfo(batchIdBN);
        const authInfo = await contract.authorities(batch.issuer);
        issuer = {
          walletAddress: batch.issuer,
          orgName: authInfo.name || 'Unknown Authority',
          department: authInfo.department || '',
          approvedAt: authInfo.ts ? new Date(Number(authInfo.ts) * 1000).toISOString() : null,
        };
      }

      return { verified, batchId: verified ? batchId : null, issuer };
    } catch (err) {
      const msg = err?.reason || err?.shortMessage || err?.message || 'Verification error';
      setError(msg);
      return { verified: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * revokeAuthority — admin-only: revoke ISSUER_ROLE from an address.
   * @param {string} address - wallet address to revoke
   */
  const revokeAuthority = useCallback(async (address) => {
    setLoading(true);
    setError(null);
    setTxHash(null);
    try {
      await ensureCorrectNetwork();
      const signer = await getWriteSigner();
      const contract = new ethers.Contract(TruestampContract.address, TruestampContract.abi, signer);
      const tx = await contract.revokeAuthority(address);
      const receipt = await tx.wait();
      setTxHash(receipt.hash);
      return { success: true, txHash: receipt.hash };
    } catch (err) {
      const msg = err?.reason || err?.shortMessage || err?.message || 'Revoke failed';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, [ensureCorrectNetwork]);

  return {
    loading,
    txHash,
    error,
    whitelistAuthority,
    submitBatch,
    verifyHash,
    revokeAuthority,
  };
}

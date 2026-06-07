'use client';

import { useState, useCallback } from 'react';
import { uploadToLighthouse } from '../lib/ipfsUtils';

/**
 * useIPFS — real Lighthouse IPFS upload hook
 *
 * Usage:
 *   const { uploading, progress, uploadFiles, error } = useIPFS();
 *   const result = await uploadFiles(filesArray);
 *   // result: { cid, name, size } | throws on failure
 */
export function useIPFS() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const uploadFiles = useCallback(async (files) => {
    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      const result = await uploadToLighthouse(files, (pct) => {
        setProgress(pct);
      });
      setProgress(100);
      return result; // { cid, name, size }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setUploading(false);
    }
  }, []);

  return {
    uploading,
    progress,
    error,
    uploadFiles,
  };
}

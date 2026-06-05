'use client';

import { useState } from 'react';

// Placeholder hook for building Merkle trees from files
export function useMerkleTree() {
  const [computing, setComputing] = useState(false);

  const computeRoot = async (files) => {
    setComputing(true);
    
    // Simulate computing hashes for all files and building tree
    await new Promise(r => setTimeout(r, 2000));
    
    const mockRoot = '0x' + Math.random().toString(16).slice(2, 66);
    
    const mockLeaves = files.map(f => ({
      name: f.name,
      hash: '0x' + Math.random().toString(16).slice(2, 66)
    }));

    setComputing(false);
    return { root: mockRoot, leaves: mockLeaves };
  };

  return {
    computing,
    computeRoot
  };
}

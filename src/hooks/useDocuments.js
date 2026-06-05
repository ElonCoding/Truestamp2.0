'use client';

import { useState } from 'react';

// Placeholder hook for fetching user documents
export function useDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDocuments = async (walletAddress) => {
    setLoading(true);
    // Simulate fetch
    await new Promise(r => setTimeout(r, 1000));
    setDocuments([]);
    setLoading(false);
  };

  return {
    documents,
    loading,
    fetchDocuments
  };
}

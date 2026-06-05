'use client';

import { useState, createContext, useContext } from 'react';

// Web3 Provider - placeholder for RainbowKit/wagmi
// Replace body with actual RainbowKit setup when keys are available
const Web3Context = createContext({
  address: null,
  isConnected: false,
  connect: () => {},
  disconnect: () => {},
  role: 'user', // 'admin' | 'authority' | 'user'
});

export const useWeb3 = () => useContext(Web3Context);

export function Web3Provider({ children }) {
  const [address, setAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [role, setRole] = useState('user');

  const connect = () => {
    // Placeholder: swap with RainbowKit connect
    const mockAddr = '0x' + Math.random().toString(16).slice(2, 42).padEnd(40, '0');
    setAddress(mockAddr);
    setIsConnected(true);
    // Demo: assign role based on env admin address
    if (mockAddr.toLowerCase() === (process.env.NEXT_PUBLIC_ADMIN_WALLET || '').toLowerCase()) {
      setRole('admin');
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

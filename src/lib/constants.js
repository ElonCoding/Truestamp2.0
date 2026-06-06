export const CONSTANTS = {
  SUPPORTED_CHAIN_ID: 80002, // Polygon Amoy
  SUPPORTED_CHAIN_ID_HEX: '0x13882',
  APP_NAME: 'TrueStamp',
  BLOCK_EXPLORER_URL: process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL || 'https://amoy.polygonscan.com',
  RPC_URL: process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL || 'https://rpc-amoy.polygon.technology',
  NETWORK_PARAMS: {
    chainId: '0x13882',
    chainName: 'Polygon Amoy Testnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: [
      process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL || 'https://rpc-amoy.polygon.technology',
    ],
    blockExplorerUrls: [
      process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL || 'https://amoy.polygonscan.com',
    ],
  },
};

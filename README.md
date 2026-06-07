# TrueStamp 2.0

TrueStamp 2.0 is an enterprise-grade document verification and certification platform powered by Ethereum/EVM smart contracts, decentralized IPFS storage, and Firebase. It enables authorized institutions (e.g., universities, government agencies, medical facilities) to issue, index, and verify documents in bulk using Merkle Trees for high scalability and minimal gas consumption.

## Key Features

- **Decentralized Document Issuance**: Issue and certify documents by anchoring cryptographic Merkle Roots on-chain rather than committing individual documents, minimizing transaction costs.
- **Bulk Uploading & Merkle Tree Generation**: Authority interface to drag-and-drop multiple documents, compute Keccak-256 hashes, generate a Merkle Tree, and register the root on-chain.
- **Instant Document Verification**: Public-facing verification route that lets users upload a file, fetch its Merkle Proof from IPFS or Firebase, and verify its validity against the on-chain registry.
- **Institutional Onboarding & Whitelisting**: Dual-dashboard flow allowing Admins to manage, approve, or revoke Whitelisted Authority keys.
- **Nominee Claim Protocol**: Support for backup wallets / nominees to claim ownership of accounts based on an expiry model.

---

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript & JavaScript (ESM)
- **Smart Contracts**: Solidity (OpenZeppelin AccessControl, MerkleProof) compiled and managed with Hardhat
- **Decentralized Storage**: [Lighthouse Web3](https://www.lighthouse.storage/) (IPFS)
- **Database / Backend**: Firebase & Firebase Admin SDK (auth records, application forms, metadata indexes)
- **Web3 & Wallet**: [Wagmi](https://wagmi.sh/), [Viem](https://viem.sh/), and [RainbowKit](https://www.rainbowkit.com/)
- **Styling**: Tailwind CSS & Framer Motion (for animations)
- **Email Dispatch**: [Resend](https://resend.com/)

---

## Prerequisites

Before setting up the project locally, ensure you have the following installed:

- **Node.js**: `v20.x` or higher
- **npm** or **pnpm**
- **MetaMask** or any WalletConnect-compatible Web3 wallet (connected to a testnet like Polygon Amoy)
- **Firebase Project**: A Firebase project configured with Firestore Database and Authentication
- **Lighthouse API Key**: An API key generated from Lighthouse Web3 dashboard for IPFS uploading

---

## Getting Started

### 1. Clone and Install

```bash
git clone <repository-url> truestamp2.0
cd truestamp2.0
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory and define the following variables:

```env
# Blockchain
NEXT_PUBLIC_CONTRACT_ADDRESS=0x13C5ebdaC5fa97ee26a07E7D3C0b0f6eEc2A2F3d
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x13C5ebdaC5fa97ee26a07E7D3C0b0f6eEc2A2F3d
NEXT_PUBLIC_CHAIN_ID=80002
NEXT_PUBLIC_ALCHEMY_RPC_URL=https://polygon-amoy.g.alchemy.com/v2/your-api-key
NEXT_PUBLIC_BLOCK_EXPLORER_URL=https://amoy.polygonscan.com
DEPLOYER_PRIVATE_KEY=your_private_key_here

# Decentralized Storage
LIGHTHOUSE_API_KEY=your_lighthouse_api_key
NEXT_PUBLIC_LIGHTHOUSE_API_KEY=your_lighthouse_api_key

# Firebase SDK configuration
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="..."
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

# Email
RESEND_API_KEY=your_resend_api_key

# App Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
ADMIN_WALLET_ADDRESS=....
NEXT_PUBLIC_ADMIN_WALLET_ADDRESS=....

# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

### 3. Run the Development Server

Start the Next.js local server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Directory Architecture

```
├── app/
│   ├── admin/             # Admin Dashboard UI (Whitelisting, Revocation)
│   ├── api/               # API Routes (IPFS upload backend, email dispatch, user checks)
│   ├── authority/         # Issuer Dashboard & Bulk Document Uploader
│   ├── dashboard/         # General user dashboard
│   ├── login/             # Firebase auth pages
│   ├── onboard/           # Institution onboarding forms
│   ├── verify/            # Public document verification interface
│   ├── globals.css        # Core custom styling (Tailwind context)
│   ├── layout.js          # Root HTML skeleton + React Query & Wagmi context providers
│   └── page.js            # Landing homepage with smooth Hero sections
├── src/
│   ├── components/        # Shared component ecosystem (navbar, uploader, dashboard grids)
│   ├── hooks/             # Custom React hooks for contract state & transactions
│   ├── providers/         # WalletConnect, RainbowKit, and Theme providers
│   └── lib/               # Utility functions
│       ├── contract.js    # TrueStamp contract Address, ABI specifications, helper functions
│       ├── firebase.js    # Firebase initialization logic (Client-side SDK)
│       ├── firebaseAdmin.js # Firebase Admin SDK for backend tasks (Node environment)
│       ├── ipfsUtils.js   # Merkle tree building and browser-safe hash comparisons
│       └── lighthouse.js  # Lighthouse IPFS wrapper functions
```

---

## Role Privileges & Access Controls

The platform implements access controls via the smart contract roles:

### 👑 Admin (`DEFAULT_ADMIN_ROLE`)
- **Authority Whitelisting**: Approves onboarded institutions.
  - On-chain call: `whitelistAuthority(address addr, string name, string dept, string ipfsMetadataCID)`.
- **Authority Revocation**: Deactivates compromised or inactive institutions.
  - On-chain call: `revokeAuthority(address addr)`.
- **Admin Dashboard (`/admin`)**: Managed review queue for institutional applicants.

### 🏢 Authority / Issuer (`ISSUER_ROLE`)
- **Document Certification**: Computes file hashes, bundles them into a Merkle Tree.
- **Batch Submission**: Records the batch metadata and roots.
  - On-chain call: `submitBatch(bytes32 merkleRoot, string ipfsCID, uint256 docCount)`.
- **Document Indexing**: Indexes document hashes to make verification lookup instantaneous.
  - On-chain call: `indexDocument(bytes32 docHash, uint256 batchId)`.

---

## Available Scripts

In the project root, you can run:

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `dev` | `npm run dev` | Runs the Next.js local development server with hot-reloading |
| `build` | `npm run build` | Compiles the Next.js application for production |
| `start` | `npm run start` | Runs the compiled production server |
| `lint` | `npm run lint` | Runs ESLint utility checks to analyze code health |

---

## Document Verification Lifecycle

1. **Upload & Hash**: The Authority selects PDF files. The browser hashes each file using Keccak-256.
2. **Merkle Construction**: A Merkle Tree is constructed locally. The root hash is generated.
3. **Decentralized Storage**: The original documents and mapping metadata are uploaded to IPFS via Lighthouse.
4. **Smart Contract Registry**: The Merkle Root, IPFS CID, and document count are submitted to the on-chain ledger.
5. **Public Verification**: A user drops their certified PDF on `/verify`. The application looks up the file hash, fetches the Merkle Proof and original batch details from IPFS/on-chain contract, and validates it cryptographically against the root in `verifyDocument(bytes32 docHash, bytes32[] merkleProof, uint256 batchId)`.

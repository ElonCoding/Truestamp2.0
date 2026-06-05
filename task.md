# TrueStamp Frontend Build — Task Tracker

## Setup & Config
- [x] Read skill & implementation plan
- [ ] Initialize Next.js 14 project
- [ ] Install all dependencies
- [ ] Configure Tailwind + globals.css

## Global Providers & Layout
- [ ] ThemeProvider.jsx
- [ ] Web3Provider.jsx (RainbowKit placeholder)
- [ ] Root layout.js (providers, navbar, footer)
- [ ] Navbar.jsx + WalletButton.jsx
- [ ] Footer.jsx
- [ ] TransactionStatus.jsx
- [ ] StatusBadge.jsx
- [ ] LoadingSpinner.jsx
- [ ] RoleGuard.jsx

## Landing Page (/)
- [ ] Hero.jsx (3D animated, CTA)
- [ ] Features.jsx (4 phase cards)
- [ ] HowItWorks.jsx (step flow)
- [ ] TrustBanner.jsx (Polygon)
- [ ] page.js (landing)

## Phase 1: Onboarding (/onboard)
- [ ] ApplicationForm.jsx (multi-step)
- [ ] WalletSetup.jsx
- [ ] onboard/page.js
- [ ] onboard/verify/page.js

## Phase 1: Admin (/admin)
- [ ] ApplicationCard.jsx
- [ ] ApprovalModal.jsx
- [ ] admin/page.js
- [ ] admin/applications/[id]/page.js
- [ ] admin/authorities/page.js

## Phase 2: Authority (/authority)
- [x] Sidebar.jsx
- [x] BulkUploader.jsx (drag-drop + progress)
- [x] BatchCard.jsx
- [ ] UploadStats.jsx
- [x] authority/dashboard
- [x] authority/page.js
- [ ] authority/upload/page.js
- [ ] authority/batches/page.js

## Phase 3: Verify (/verify)
- [x] DropZone.jsx
- [x] VerificationResult.jsx
- [ ] IssuerDetails.jsx
- [x] verify/page.js

## Phase 4: Dashboard (/dashboard)
- [ ] DocumentCard.jsx
- [ ] DocumentViewer.jsx
- [x] NomineeForm.jsx
- [x] dashboard/page.js
- [ ] dashboard/documents/[docId]/page.js
- [ ] dashboard/nominee/page.js

## Hooks & Lib
- [x] useContract.js
- [x] useRole.js
- [x] useMerkleTree.js
- [x] useIPFS.js
- [ ] useDocuments.js
- [ ] lib/contract.js
- [ ] lib/merkle.js
- [ ] lib/firebase.js
- [ ] lib/constants.js

## API Routes
- [ ] api/verify/route.js
- [ ] api/admin/applications/route.js
- [ ] api/admin/whitelist/route.js
- [ ] api/authority/upload/route.js
- [ ] api/authority/batches/route.js
- [ ] api/user/documents/route.js
- [ ] api/user/nominee/route.js

## Config Files
- [ ] package.json
- [ ] tailwind.config.js
- [ ] next.config.js
- [ ] .env.local.example

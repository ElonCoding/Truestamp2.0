# TrueStamp Role Privileges

This document outlines the roles, access controls, and specific privileges of the **Admin** and **Authority (Issuer)** roles within the TrueStamp platform.

---

## 👑 Admin (DEFAULT_ADMIN_ROLE)

The deployer/governance wallet responsible for system trust setup and authority verification.

### Key Privileges

1. **Authority Whitelisting**
   - Approve onboarded institutions.
   - On-chain action: `whitelistAuthority(address addr, string name, string dept)`.
2. **Authority Revocation**
   - Revoke institution status if compromised/inactive.
   - On-chain action: `revokeAuthority(address addr)`.
3. **Application Management**
   - Access to Admin Dashboard (`/admin`).
   - Review pending applications, verify institutional domains, and approve or reject submissions.

---

## 🏢 Authority / Issuer (ISSUER_ROLE)

Verified institutions (e.g., universities, government sectors) authorized to issue authenticable documents.

### Key Privileges

1. **Document Issuance**
   - Upload documents in bulk (`/authority/upload`).
   - Generate Merkle Trees from document hashes.
2. **Batch Submission**
   - Record batch proof roots on-chain.
   - On-chain action: `submitBatch(bytes32 merkleRoot, string ipfsCID, uint255 docCount)`.
3. **Document Indexing**
   - Bind document hashes to specific batch IDs.
   - On-chain action: `indexDocument(bytes32 docHash, bytes32 batchId)`.
4. **History & Analytics**
   - Access to Issuer Dashboard (`/authority`).
   - View batch histories, track doc counts, and view IPFS links.

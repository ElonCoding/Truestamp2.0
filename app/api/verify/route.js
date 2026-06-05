import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { hash } = body;

    if (!hash) {
      return NextResponse.json({ error: 'Document hash is required' }, { status: 400 });
    }

    // In production:
    // 1. Check Truestamp smart contract if hash/merkle leaf exists
    // 2. Fetch associated batch metadata from Lighthouse IPFS
    // 3. Fetch issuer metadata from Firestore

    // Mock response
    const isVerified = hash.startsWith('0x') && hash.length === 66;

    if (isVerified) {
      return NextResponse.json({
        verified: true,
        hash,
        batchId: 'abc123def456',
        issuer: {
          orgName: 'LNCT University',
          department: "Registrar's Office",
          walletAddress: '0xAbCd1234567890AbCd1234567890AbCd12345678',
          approvedAt: '2025-05-19T10:00:00Z',
          website: 'https://lnct.ac.in',
        }
      });
    } else {
      return NextResponse.json({ verified: false });
    }

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

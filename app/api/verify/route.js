export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getFirestoreDb, getLocalBatches, getLocalApplications } from '../../../src/lib/firebaseAdmin';

export async function POST(request) {
  try {
    const body = await request.json();
    const { hash } = body;

    if (!hash) {
      return NextResponse.json({ error: 'Document hash is required' }, { status: 400 });
    }

    const targetHash = hash.toLowerCase();

    const db = getFirestoreDb();
    let batches = [];
    let applications = [];

    if (db) {
      try {
        const batchSnapshot = await db.collection('batches').get();
        batchSnapshot.forEach((doc) => batches.push(doc.data()));
        const appSnapshot = await db.collection('applications').get();
        appSnapshot.forEach((doc) => applications.push(doc.data()));
      } catch (firestoreErr) {
        console.warn('Firestore fetch failed in verify, falling back to local JSON:', firestoreErr.message);
        batches = getLocalBatches();
        applications = getLocalApplications();
      }
    } else {
      batches = getLocalBatches();
      applications = getLocalApplications();
    }

    let foundBatch = null;
    let foundFile = null;

    for (const b of batches) {
      if (b.files && Array.isArray(b.files)) {
        const file = b.files.find(f => f.keccak256?.toLowerCase() === targetHash || f.keccak?.toLowerCase() === targetHash);
        if (file) {
          foundBatch = b;
          foundFile = file;
          break;
        }
      }
    }

    if (foundBatch && foundFile) {
      const issuerWallet = foundBatch.authorityWallet?.toLowerCase();
      const issuerApp = applications.find(a => a.walletAddress?.toLowerCase() === issuerWallet);

      return NextResponse.json({
        verified: true,
        hash,
        batchId: foundBatch.id,
        txHash: foundBatch.txHash,
        file: {
          name: foundFile.name,
          size: foundFile.size ? (typeof foundFile.size === 'number' ? `${(foundFile.size / 1024).toFixed(1)} KB` : foundFile.size) : 'Unknown Size',
          cid: foundBatch.ipfsCID,
        },
        issuer: {
          orgName: issuerApp ? issuerApp.orgName : 'Approved Authority',
          department: issuerApp ? issuerApp.department : 'Registrar Office',
          walletAddress: foundBatch.authorityWallet,
          approvedAt: issuerApp ? issuerApp.submittedAt : foundBatch.submittedAt,
          website: issuerApp ? issuerApp.website : null,
        }
      });
    }

    return NextResponse.json({ verified: false });

  } catch (error) {
    console.error('Error in public verify API route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

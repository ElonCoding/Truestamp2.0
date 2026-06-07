export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getFirestoreDb, getLocalBatches } from '../../../../src/lib/firebaseAdmin';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const authorityWallet = searchParams.get('authorityWallet');

    const db = getFirestoreDb();
    let batches = [];

    if (db) {
      try {
        const snapshot = await db.collection('batches').get();
        snapshot.forEach((doc) => {
          batches.push(doc.data());
        });
      } catch (firestoreErr) {
        console.warn('Firestore fetch failed, falling back to local JSON:', firestoreErr.message);
        batches = getLocalBatches();
      }
    } else {
      batches = getLocalBatches();
    }

    if (authorityWallet) {
      const target = authorityWallet.toLowerCase();
      batches = batches.filter(b => b.authorityWallet?.toLowerCase() === target);
    }

    // Sort by submittedAt descending
    batches.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

    return NextResponse.json({ success: true, batches });
  } catch (error) {
    console.error('Error fetching batches:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

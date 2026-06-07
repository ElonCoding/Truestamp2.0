export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getFirestoreDb, getLocalBatches } from '../../../../../src/lib/firebaseAdmin';

export async function GET(request, { params }) {
  try {
    const { batchId } = params;

    if (!batchId) {
      return NextResponse.json({ error: 'Batch ID is required' }, { status: 400 });
    }

    const db = getFirestoreDb();
    let batch = null;

    if (db) {
      try {
        const doc = await db.collection('batches').doc(batchId).get();
        if (doc.exists) {
          batch = doc.data();
        }
      } catch (firestoreErr) {
        console.warn('Firestore single fetch failed, falling back to local JSON:', firestoreErr.message);
        const batches = getLocalBatches();
        batch = batches.find((b) => b.id === batchId) || null;
      }
    } else {
      const batches = getLocalBatches();
      batch = batches.find((b) => b.id === batchId) || null;
    }

    if (!batch) {
      return NextResponse.json({ error: 'Batch not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, batch });
  } catch (error) {
    console.error('Error fetching single batch:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

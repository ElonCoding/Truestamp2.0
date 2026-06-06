import { NextResponse } from 'next/server';
import { getFirestoreDb, getLocalApplications } from '../../../../src/lib/firebaseAdmin';

export async function GET() {
  try {
    const db = getFirestoreDb();
    let applications = [];

    if (db) {
      try {
        const snapshot = await db.collection('applications').get();
        snapshot.forEach((doc) => {
          applications.push(doc.data());
        });
      } catch (firestoreErr) {
        console.warn('Firestore fetch failed, falling back to local JSON:', firestoreErr.message);
        applications = getLocalApplications();
      }
    } else {
      applications = getLocalApplications();
    }

    // Sort by submittedAt descending
    applications.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

    return NextResponse.json({ success: true, applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

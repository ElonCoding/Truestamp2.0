import { NextResponse } from 'next/server';
import { getFirestoreDb, getLocalApplications, saveLocalApplications } from '../../../../src/lib/firebaseAdmin';

export async function POST(request) {
  try {
    const body = await request.json();
    const { applicationId, status, txHash } = body;

    if (!applicationId || !status) {
      return NextResponse.json({ error: 'Application ID and Status are required' }, { status: 400 });
    }

    const db = getFirestoreDb();
    let updated = false;

    if (db) {
      try {
        const docRef = db.collection('applications').doc(applicationId);
        const doc = await docRef.get();
        if (doc.exists) {
          const updateData = { status, updatedAt: new Date().toISOString() };
          if (txHash) updateData.txHash = txHash;
          await docRef.update(updateData);
          updated = true;
        }
      } catch (firestoreErr) {
        console.warn('Firestore update failed, falling back to local JSON:', firestoreErr.message);
        // Fallback local update
        const apps = getLocalApplications();
        const index = apps.findIndex(a => a.id === applicationId);
        if (index !== -1) {
          apps[index].status = status;
          if (txHash) apps[index].txHash = txHash;
          apps[index].updatedAt = new Date().toISOString();
          saveLocalApplications(apps);
          updated = true;
        }
      }
    } else {
      const apps = getLocalApplications();
      const index = apps.findIndex(a => a.id === applicationId);
      if (index !== -1) {
        apps[index].status = status;
        if (txHash) apps[index].txHash = txHash;
        apps[index].updatedAt = new Date().toISOString();
        saveLocalApplications(apps);
        updated = true;
      }
    }

    if (!updated) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Authority status updated to ${status} successfully`,
      txHash: txHash || null,
    });

  } catch (error) {
    console.error('Error updating whitelist status:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

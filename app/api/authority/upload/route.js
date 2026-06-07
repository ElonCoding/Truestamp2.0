import { NextResponse } from 'next/server';
import { getFirestoreDb, getLocalBatches, saveLocalBatches } from '../../../../src/lib/firebaseAdmin';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      merkleRoot,
      ipfsCID,
      metadataCID,
      docCount,
      txHash,
      batchId,
      authorityWallet,
      files,
      gatewayUrl,
      submittedAt,
      network,
      chainId,
    } = body;

    if (!merkleRoot || !ipfsCID || !authorityWallet || !batchId) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const newBatch = {
      id: batchId,
      merkleRoot,
      ipfsCID,
      metadataCID: metadataCID || null,
      docCount,
      txHash: txHash || null,
      authorityWallet: authorityWallet.toLowerCase(),
      files: files || [],
      gatewayUrl: gatewayUrl || `https://gateway.lighthouse.storage/ipfs/${ipfsCID}`,
      submittedAt: submittedAt || new Date().toISOString(),
      network: network || 'Polygon Amoy Testnet',
      chainId: chainId || 80002,
      status: 'verified',
    };

    const db = getFirestoreDb();
    if (db) {
      try {
        await db.collection('batches').doc(batchId).set(newBatch);
      } catch (firestoreErr) {
        console.warn('Firestore batch save failed, falling back to local JSON:', firestoreErr.message);
        const localBatches = getLocalBatches();
        const filtered = localBatches.filter(b => b.id !== batchId);
        filtered.push(newBatch);
        saveLocalBatches(filtered);
      }
    } else {
      const localBatches = getLocalBatches();
      const filtered = localBatches.filter(b => b.id !== batchId);
      filtered.push(newBatch);
      saveLocalBatches(filtered);
    }

    return NextResponse.json({
      success: true,
      batchId,
      txHash,
    });

  } catch (error) {
    console.error('Error in batch upload route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

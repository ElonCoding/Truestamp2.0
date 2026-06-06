import { NextResponse } from 'next/server';

/**
 * POST /api/onboard
 * Accepts an authority application and stores it (Firebase or in-memory fallback).
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      orgName,
      orgType,
      department,
      website,
      email,
      walletAddress,
      description,
      members,
      chainId,
      network,
    } = body;

    // Basic validation
    if (!orgName || !email || !walletAddress) {
      return NextResponse.json(
        { error: 'orgName, email and walletAddress are required.' },
        { status: 400 }
      );
    }

    // Validate the wallet address format
    if (!/^0x[0-9a-fA-F]{40}$/.test(walletAddress)) {
      return NextResponse.json(
        { error: 'Invalid wallet address format.' },
        { status: 400 }
      );
    }

    // Build the application record
    const application = {
      id: `app_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      orgName: orgName.trim(),
      orgType: orgType || 'Other',
      department: department?.trim() || '',
      website: website?.trim() || '',
      email: email.trim().toLowerCase(),
      walletAddress: walletAddress.toLowerCase(),
      description: description?.trim() || '',
      members: Array.isArray(members) ? members.filter(Boolean) : [],
      chainId: chainId || 80002,
      network: network || 'Polygon Amoy Testnet',
      status: 'pending',
      emailVerified: true,
      submittedAt: new Date().toISOString(),
    };

    // --- Firebase Firestore integration (enabled when credentials are configured) ---
    try {
      const { initializeApp, getApps, cert } = await import('firebase-admin/app');
      const { getFirestore } = await import('firebase-admin/firestore');

      const firebaseConfig = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      };

      if (firebaseConfig.projectId && firebaseConfig.clientEmail && firebaseConfig.privateKey) {
        if (!getApps().length) {
          initializeApp({ credential: cert(firebaseConfig) });
        }
        const db = getFirestore();
        await db.collection('applications').doc(application.id).set(application);
        console.log(`[Onboard] Application ${application.id} saved to Firestore.`);
      } else {
        // Firebase not fully configured — log locally only
        console.log('[Onboard] Firebase not configured. Application (in-memory only):', application);
      }
    } catch (firebaseErr) {
      // Don't fail the request if Firebase is unavailable
      console.warn('[Onboard] Firestore write failed (continuing):', firebaseErr.message);
    }

    // Send notification email to admin if Resend is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'TrueStamp <noreply@truestamp.io>',
          to: process.env.ADMIN_EMAIL || 'admin@truestamp.io',
          subject: `New Authority Application: ${orgName}`,
          html: `
            <h2>New Authority Application</h2>
            <p><strong>Organization:</strong> ${orgName} (${orgType})</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Wallet:</strong> ${walletAddress}</p>
            <p><strong>Network:</strong> ${network} (Chain ID: ${chainId})</p>
            <p><strong>Description:</strong> ${description || 'N/A'}</p>
            <p><strong>Application ID:</strong> ${application.id}</p>
          `,
        });
      } catch (emailErr) {
        console.warn('[Onboard] Admin notification email failed:', emailErr.message);
      }
    }

    return NextResponse.json(
      { success: true, applicationId: application.id, message: 'Application submitted successfully.' },
      { status: 201 }
    );
  } catch (err) {
    console.error('[Onboard] Unexpected error:', err);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}

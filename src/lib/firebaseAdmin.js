import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';

let db = null;

// Helper to get local JSON database path
function getLocalDbPath() {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return path.join(dir, 'applications.json');
}

// Read from local JSON fallback
export function getLocalApplications() {
  const filePath = getLocalDbPath();
  if (!fs.existsSync(filePath)) {
    // Return initial mock applications if file doesn't exist yet
    const initial = [
      { id: '1', orgName: 'LNCT University', orgType: 'University', department: "Registrar's Office", email: 'admin@lnct.ac.in', website: 'https://lnct.ac.in', walletAddress: '0xAbCd1234567890AbCd1234567890AbCd12345678', status: 'pending', submittedAt: '2025-05-20T10:00:00Z', emailVerified: true },
      { id: '2', orgName: 'AIIMS Bhopal', orgType: 'Hospital', department: 'Medical Records', email: 'records@aiimsbhopal.edu.in', website: 'https://aiimsbhopal.edu.in', walletAddress: '0x1234AbCd5678Ef901234AbCd5678Ef9012345678', status: 'pending', submittedAt: '2025-05-21T14:30:00Z', emailVerified: true },
      { id: '3', orgName: 'MP State Government', orgType: 'Government Body', department: 'Revenue Department', email: 'revenue@mp.gov.in', website: 'https://mp.gov.in', walletAddress: '0xDeAdBeEf1234567890DeAdBeEf1234567890DeAd', status: 'approved', submittedAt: '2025-05-18T09:15:00Z', emailVerified: true },
      { id: '4', orgName: 'TechCorp Ltd', orgType: 'Corporate', department: 'HR', email: 'hr@techcorp.com', website: 'https://techcorp.com', walletAddress: '0xFaCe0987654321FaCe0987654321FaCe09876543', status: 'rejected', submittedAt: '2025-05-15T08:00:00Z', emailVerified: false },
    ];
    fs.writeFileSync(filePath, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (e) {
    console.error('Error reading local db:', e);
    return [];
  }
}

// Write to local JSON fallback
export function saveLocalApplications(apps) {
  const filePath = getLocalDbPath();
  try {
    fs.writeFileSync(filePath, JSON.stringify(apps, null, 2), 'utf-8');
    return true;
  } catch (e) {
    console.error('Error writing local db:', e);
    return false;
  }
}

// Initialize Firestore if credentials are provided
export function getFirestoreDb() {
  if (db) return db;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (projectId && clientEmail && privateKey) {
    try {
      if (!getApps().length) {
        initializeApp({
          credential: cert({
            projectId,
            clientEmail,
            privateKey,
          }),
        });
      }
      db = getFirestore();
      return db;
    } catch (e) {
      console.error('Failed to initialize Firebase Admin:', e);
      return null;
    }
  }
  return null;
}

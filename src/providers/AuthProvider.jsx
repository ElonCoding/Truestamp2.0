'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../lib/firebase';

const AuthContext = createContext({
  user: null,
  loading: true,
  isMock: false,
  login: async (email, password) => {},
  signup: async (email, password) => {},
  logout: async () => {},
  resetPassword: async (email) => {},
  loginWithGoogle: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMock, setIsMock] = useState(false);

  // Check if Firebase is properly configured
  const hasFirebaseConfig = 
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
    !process.env.NEXT_PUBLIC_FIREBASE_API_KEY.includes('api_key_here');

  useEffect(() => {
    if (!hasFirebaseConfig || !auth) {
      console.log('Firebase auth not configured or failed to initialize. Using Mock Auth Provider.');
      setIsMock(true);
      // Initialize mock session from localStorage
      const mockSession = localStorage.getItem('truestamp_mock_user');
      if (mockSession) {
        setUser(JSON.parse(mockSession));
      }
      setLoading(false);
      return;
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || firebaseUser.email.split('@')[0],
            photoURL: firebaseUser.photoURL || null,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return unsubscribe;
    } catch (err) {
      console.warn('Firebase onAuthStateChanged error, falling back to mock auth:', err);
      setIsMock(true);
      const mockSession = localStorage.getItem('truestamp_mock_user');
      if (mockSession) {
        setUser(JSON.parse(mockSession));
      }
      setLoading(false);
    }
  }, [hasFirebaseConfig]);

  // --- Core Auth Functions ---

  const login = async (email, password) => {
    setLoading(true);
    if (isMock) {
      // Fetch mock users from localStorage
      const mockUsers = JSON.parse(localStorage.getItem('truestamp_mock_users') || '[]');
      const existingUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!existingUser) {
        setLoading(false);
        throw new Error('User not found. Please register.');
      }
      if (existingUser.password !== password) {
        setLoading(false);
        throw new Error('Invalid password.');
      }
      
      const sessionUser = {
        uid: existingUser.uid,
        email: existingUser.email,
        displayName: existingUser.displayName || email.split('@')[0],
        photoURL: null,
      };
      
      setUser(sessionUser);
      localStorage.setItem('truestamp_mock_user', JSON.stringify(sessionUser));
      setLoading(false);
      return sessionUser;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const u = userCredential.user;
      const sessionUser = {
        uid: u.uid,
        email: u.email,
        displayName: u.displayName || u.email.split('@')[0],
        photoURL: u.photoURL || null,
      };
      setUser(sessionUser);
      setLoading(false);
      return sessionUser;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signup = async (email, password) => {
    setLoading(true);
    if (isMock) {
      const mockUsers = JSON.parse(localStorage.getItem('truestamp_mock_users') || '[]');
      const exists = mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (exists) {
        setLoading(false);
        throw new Error('Email already exists. Please login instead.');
      }
      
      const newMockUser = {
        uid: 'mock_' + Math.random().toString(36).substring(2, 9),
        email,
        password,
        displayName: email.split('@')[0],
      };
      
      mockUsers.push(newMockUser);
      localStorage.setItem('truestamp_mock_users', JSON.stringify(mockUsers));
      
      const sessionUser = {
        uid: newMockUser.uid,
        email: newMockUser.email,
        displayName: newMockUser.displayName,
        photoURL: null,
      };
      
      setUser(sessionUser);
      localStorage.setItem('truestamp_mock_user', JSON.stringify(sessionUser));
      setLoading(false);
      return sessionUser;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const u = userCredential.user;
      const sessionUser = {
        uid: u.uid,
        email: u.email,
        displayName: u.displayName || u.email.split('@')[0],
        photoURL: u.photoURL || null,
      };
      setUser(sessionUser);
      setLoading(false);
      return sessionUser;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    if (isMock) {
      setUser(null);
      localStorage.removeItem('truestamp_mock_user');
      setLoading(false);
      return;
    }

    try {
      await signOut(auth);
      setUser(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const resetPassword = async (email) => {
    if (isMock) {
      // Just simulate sending a reset email
      const mockUsers = JSON.parse(localStorage.getItem('truestamp_mock_users') || '[]');
      const exists = mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (!exists) {
        throw new Error('If this email is registered, we have sent instructions. (Mock mode: User not found in localStorage)');
      }
      return true;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    if (isMock) {
      // Simulate Gmail login
      const mockGmailUser = {
        uid: 'mock_gmail_' + Math.random().toString(36).substring(2, 9),
        email: 'demo-google@gmail.com',
        displayName: 'Demo Google User',
        photoURL: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
      };
      setUser(mockGmailUser);
      localStorage.setItem('truestamp_mock_user', JSON.stringify(mockGmailUser));
      setLoading(false);
      return mockGmailUser;
    }

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const u = result.user;
      const sessionUser = {
        uid: u.uid,
        email: u.email,
        displayName: u.displayName || u.email.split('@')[0],
        photoURL: u.photoURL || null,
      };
      setUser(sessionUser);
      setLoading(false);
      return sessionUser;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isMock, login, signup, logout, resetPassword, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

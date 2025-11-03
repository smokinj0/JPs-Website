// auth.js — FIXED for browser use
let auth;

// auth.js — FIXED
import { auth } from './firebase.js';

export async function signIn() {
  try {
    const { GoogleAuthProvider, signInWithPopup } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js');
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Auth error:', error);
    throw error;
  }
}

// Dynamically load Firebase Auth and get the auth instance
async function getAuthInstance() {
  if (auth) return auth;

  const { getAuth } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js');
  const { app } = await import('./firebase.js'); // Reuse existing firebase.js
  auth = getAuth(app);
  return auth;
}

export async function signIn() {
  try {
    const auth = await getAuthInstance();
    const { GoogleAuthProvider, signInWithPopup } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js');
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Auth error:', error);
    throw error;
  }
}

export async function signOutUser() {
  try {
    const auth = await getAuthInstance();
    const { signOut } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js');
    await signOut(auth);
  } catch (error) {
    console.error('Sign out error:', error);
  }
}

export async function watchAuthState(callback) {
  const auth = await getAuthInstance();
  const { onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js');
  return onAuthStateChanged(auth, callback);
}
// firebase.js — FIXED for browser use
let app, auth, db;

// Load config and initialize Firebase
async function initFirebase() {
  if (app) return { app, auth, db };

  // Fetch config from JSON file
  const response = await fetch('./assets/firebase-config.json');
  const firebaseConfig = await response.json();

  // Load Firebase SDK from CDN
  const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
  const { getAuth } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js');
  const { getFirestore } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');

  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);

  return { app, auth, db };
}

// Initialize on import
initFirebase();

// Export for other modules
export { auth, db };
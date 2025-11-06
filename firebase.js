// firebase.js — FIXED for browser use
let app, db;

// Load config and initialize Firebase
async function initFirebase() {
  if (app) return { app, db, };

  // Fetch config from JSON file
  const response = await fetch('./assets/firebase-config.json');
  const firebaseConfig = await response.json();

  // Load Firebase SDK from CDN
  const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
  const { getAuth } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js');
  const { getFirestore } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
  //const { getPerformance } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-performance.js');

  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  //performance = getPerformance(app);

  return { app, db, auth };
}

// Initialize on import
initFirebase();

// Export for other modules
export { db, auth, initFirebase };
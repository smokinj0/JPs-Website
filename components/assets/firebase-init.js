// 1. Import necessary services (Add Firestore)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
//import { getPerformance } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-performance.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"; 
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVnqPeDkwaQDTsqBtz8vebmiqptSIf7fo",
  authDomain: "web-assessment-2.firebaseapp.com",
  projectId: "web-assessment-2",
  storageBucket: "web-assessment-2.firebasestorage.app",
  messagingSenderId: "881953900315",
  appId: "1:881953900315:web:87caeb8081b65172cc35be"
};

// 3. Initialize Firebase App
const app = initializeApp(firebaseConfig);

const db = getFirestore(app); 
const auth = getAuth(app);

// Export all services for use in contact.js and other modules
export { app, db, auth }; 

console.log("✅ Firebase Initialization complete.");

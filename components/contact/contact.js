// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AlzaSyCVnqPeDwaQDT5gBzt8vebmipTSIf7o",
  authDomain: "web-assessment-2.firebaseapp.com",
  projectId: "web-assessment-2",
  storageBucket: "web-assessment-2.appspot.com",
  messagingSenderId: "881959300315",
  appId: "1:881959300315:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Wait for the page to load
window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");

  if (!form) {
    console.error("Form not found!");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await addDoc(collection(db, "enquiries"), {
        name,
        email,
        phone,
        message,
        timestamp: new Date().toISOString()
      });

      alert("✅ Message sent successfully!");
      form.reset();
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send. Check console for details.");
    }
  });
});

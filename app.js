console.log("🚀 app.js loaded and ready!");
// app.js — FIXED
import { db } from './firebase.js';
import { signIn, signOutUser, watchAuthState } from './auth.js';
const { collection, getDocs } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');

//WRAP EVERYTHING IN DOMContentLoaded
document.addEventListener('DOMContentLoaded', async () => {

  // DOM elements
  const signInBtn = document.getElementById('signInBtn');
  const signOutBtn = document.getElementById('signOutBtn');
  const output = document.getElementById('output');
  const citiesOutput = document.getElementById('citiesOutput');

  // Load cities from Firestore
  async function getCities() {
    try {
      const citiesCol = collection(db, 'cities');
      const citySnapshot = await getDocs(citiesCol);
      const cityList = citySnapshot.docs.map(doc => doc.data().name || 'Unnamed');
      citiesOutput.innerHTML = `<strong>Cities:</strong> ${cityList.join(', ')}`;
    } catch (error) {
      console.error('Error loading cities:', error);
      citiesOutput.textContent = 'Cities: Failed to load';
    }
  }

  // Set up auth state listener
  watchAuthState((user) => {
    if (user) {
      output.innerHTML = `<strong>User:</strong> ${user.displayName} (${user.email})`;
      signInBtn.style.display = 'none';
      signOutBtn.style.display = 'inline-block';
      getCities();
    } else {
      output.textContent = 'User: Not signed in';
      signInBtn.style.display = 'inline-block';
      signOutBtn.style.display = 'none';
      citiesOutput.textContent = 'Cities: Loading...';
    }
  });

  // Attach event listeners
  signInBtn?.addEventListener('click', () => {
    signIn().catch(console.error);
  });

  signOutBtn?.addEventListener('click', () => {
    signOutUser();
  });

});
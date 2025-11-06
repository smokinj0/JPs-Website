import { db } from "../assets/firebase-init.js";
import {
  collection, addDoc, deleteDoc, doc,
  onSnapshot, query, orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const ADMIN_PASSWORD = "josh123";
const testimonialsRef = collection(db, "testimonials");
const container = document.querySelector(".clients-container");

const loginBox = document.getElementById("admin-login-box");
const loginInput = document.getElementById("admin-pass");
const loginBtn = document.getElementById("login-btn");
const crudPanel = document.getElementById("admin-crud-panel");

let isAdmin = false;

// --- LOGIN ----
loginBtn.addEventListener("click", () => {
  if (loginInput.value === ADMIN_PASSWORD) {
    isAdmin = true;
    loginBox.style.display = "none";
    crudPanel.style.display = "block";
    loadClients();
    alert("✅ Admin mode enabled!");
  } else {
    alert("❌ Wrong password!");
  }
});

// --- DISPLAY & CRUD ---
function loadClients() {
  const q = query(testimonialsRef, orderBy("order", "asc"));
  onSnapshot(q, (snap) => {
    container.innerHTML = "";
    snap.forEach((docSnap) => addClientToPage(docSnap.data(), docSnap.id));
  });
}

function addClientToPage(data, id) {
  const div = document.createElement("div");
  div.className = "client-card";
  div.dataset.fid = id;
  div.innerHTML = `
    ${data.before ? `<img src="${data.before}" alt="Before" style="max-width:200px; display:block; margin:auto;">` : ""}
    ${data.after ? `<img src="${data.after}" class="before-after" alt="After" style="max-width:200px; display:block; margin:auto;">` : ""}
    <h3>${data.name}</h3>
    <p>${data.quote}</p>
    ${isAdmin
      ? `<button class="delete-btn" data-id="${id}" style="background:#e53935;color:white;margin-top:10px;border:none;border-radius:5px;padding:5px 15px;">Delete</button>`
      : ""}
  `;
  container.appendChild(div);
}

window.addNewClient = async function () {
  if (!isAdmin) return alert("Admin login required.");
  const name = prompt("Client Name:");
  const quote = prompt("Testimonial:");
  const before = prompt("Profile Picture URL (../assets/...):");
  const after = prompt("After Pic URL (optional):");
  if (!name || !quote) return alert("Name and testimonial required.");
  try {
    await addDoc(testimonialsRef, {
      name, quote, before: before || null, after: after || null, order: 999
    });
    alert("✅ Client added!");
  } catch (err) {
    alert("Error: " + err.message);
  }
};

document.addEventListener("click", async (e) => {
  if (!isAdmin) return;
  const id = e.target.dataset.id;
  if (!id) return;
  if (e.target.classList.contains("delete-btn")) {
    if (confirm("Delete this client?")) {
      try {
        await deleteDoc(doc(db, "testimonials", id));
        document.querySelector(`[data-fid="${id}"]`)?.remove();
        alert("🗑️ Deleted!");
      } catch (err) {
        alert(err.message);
      }
    }
  }
});

import { auth, db } from './firebase-init.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const role = userDoc.data().role;

    if (role === "admin") {
      window.location.href = "dashboard.html";
    } else if (role === "dokter") {
      window.location.href = "rekam_medis.html";
    } else if (role === "perawat") {
      window.location.href = "pendaftaran.html";
    } else if (role === "apoteker") {
      window.location.href = "laporan.html";
    } else {
      alert("Role tidak dikenali.");
    }

  } catch (error) {
    alert("Login gagal: " + error.message);
  }
});

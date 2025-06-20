import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCNXnCQra0ek0VKlA7ecSfmY_ML9Ci4oXI",
  authDomain: "liftandfit-b7ffd.firebaseapp.com",
  projectId: "liftandfit-b7ffd",
  storageBucket: "liftandfit-b7ffd.firebasestorage.app",
  messagingSenderId: "813184073980",
  appId: "1:813184073980:web:adc62f0cd2ce1d0de29779",
  measurementId: "G-29LX4SS1G9"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export function initializeAuth() {
  console.log('Initializing auth...');
  const signupModal = document.querySelector("#signup-modal");
  const signinModal = document.querySelector("#signin-modal");
  const openSignupBtn = document.querySelector("#open-signup-btn");
  const openSigninBtn = document.querySelector(".open-signin-btn");
  const signoutBtn = document.querySelector("#signout-btn");
  const closeBtns = document.querySelectorAll(".close-btn");
  const signInLink = document.querySelector(".sign-in-link");
  const signUpLink = document.querySelector(".sign-up-link");
  const signupForm = signupModal ? signupModal.querySelector("form") : null;
  const signinForm = signinModal ? signinModal.querySelector("form") : null;
  const signinError = document.querySelector(".signinError");
  const signupError = document.querySelector(".signupError");
  const profileBtn = document.querySelector("#profile-btn");
  const signupGoogleBtn = signupModal ? signupModal.querySelector("button:not([type='submit'])") : null;
  const signinGoogleBtn = signinModal ? signinModal.querySelector("button:not([type='submit'])") : null;

  if (!openSigninBtn) {
    console.error('open-signin-btn not found');
    return;
  }

  function toggleAuthButtons(user) {
    console.log('Toggling auth buttons...', user);
    if (user) {
      openSigninBtn.classList.add("hidden");
      if (openSignupBtn) openSignupBtn.classList.add("hidden");
      if (profileBtn) {
        profileBtn.classList.remove("hidden");
        profileBtn.src = user.photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwaC2JFGV1ztlUeZeuElwPBFz2lJHjuxAn-w&s";
      }
      if (signoutBtn) signoutBtn.classList.remove("hidden");
    } else {
      openSigninBtn.classList.remove("hidden");
      if (profileBtn) profileBtn.classList.add("hidden");
      if (signoutBtn) signoutBtn.classList.add("hidden");
    }
  }

  openSignupBtn?.addEventListener("click", () => {
    console.log('Open signup clicked');
    if (signupModal) {
      signupModal.classList.remove("hidden", "opacity-0");
      signupModal.classList.add("opacity-100");
      if (signupError) signupError.classList.add("hidden");
    }
  });

  openSigninBtn.addEventListener("click", () => {
    console.log('Open signin clicked');
    if (signinModal) {
      signinModal.classList.remove("hidden", "opacity-0");
      signinModal.classList.add("opacity-100");
      if (signinError) signinError.classList.add("hidden");
    }
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (signupModal) signupModal.classList.add("hidden", "opacity-0");
      if (signinModal) signinModal.classList.add("hidden", "opacity-0");
      if (signupError) signupError.classList.add("hidden");
      if (signinError) signinError.classList.add("hidden");
    });
  });

  signInLink?.addEventListener("click", () => {
    if (signupModal) signupModal.classList.add("hidden", "opacity-0");
    if (signinModal) {
      signinModal.classList.remove("hidden", "opacity-0");
      signinModal.classList.add("opacity-100");
    }
    if (signupError) signupError.classList.add("hidden");
    if (signinError) signinError.classList.add("hidden");
  });

  signUpLink?.addEventListener("click", () => {
    if (signinModal) signinModal.classList.add("hidden", "opacity-0");
    if (signupModal) {
      signupModal.classList.remove("hidden", "opacity-0");
      signupModal.classList.add("opacity-100");
    }
    if (signinError) signinError.classList.add("hidden");
    if (signupError) signupError.classList.add("hidden");
  });

  signupModal?.addEventListener("click", (e) => {
    if (e.target === signupModal) {
      signupModal.classList.add("hidden", "opacity-0");
      if (signupError) signupError.classList.add("hidden");
    }
  });

  signinModal?.addEventListener("click", (e) => {
    if (e.target === signinModal) {
      signinModal.classList.add("hidden", "opacity-0");
      if (signinError) signinError.classList.add("hidden");
    }
  });

  signupForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = signupForm.elements.email.value;
    const password = signupForm.elements.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (signupError) {
          signupError.textContent = "Sign up successful!";
          signupError.classList.add("text-green-600");
          signupError.classList.remove("hidden");
          setTimeout(() => {
            if (signupModal) signupModal.classList.add("hidden", "opacity-0");
            signupForm.reset();
          }, 1000);
        }
      })
      .catch((error) => {
        if (signupError) {
          signupError.textContent =
            error.code === "auth/email-already-in-use" ? "User with this email already exists!" :
            error.code === "auth/invalid-email" ? "Invalid email format!" :
            error.code === "auth/weak-password" ? "Password must be at least 6 characters!" :
            "Error: " + error.message;
          signupError.classList.add("text-red-600");
          signupError.classList.remove("hidden");
          signupForm.reset();
        }
      });
  });

  signinForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = signinForm.elements.email.value;
    const password = signinForm.elements.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (signinError) {
          signinError.textContent = "Sign in successful!";
          signinError.classList.add("text-green-600");
          signinError.classList.remove("hidden");
          setTimeout(() => {
            if (signinModal) signinModal.classList.add("hidden", "opacity-0");
            signinForm.reset();
          }, 1000);
        }
      })
      .catch((error) => {
        if (signinError) {
          signinError.textContent =
            error.code === "auth/wrong-password" || error.code === "auth/user-not-found" ? "Invalid email or password!" :
            error.code === "auth/invalid-email" ? "Invalid email format!" :
            "Error: " + error.message;
          signinError.classList.add("text-red-600");
          signinError.classList.remove("hidden");
          signinForm.reset();
        }
      });
  });

  signupGoogleBtn?.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        if (signupError) {
          signupError.textContent = "Signed in with Google successfully!";
          signupError.classList.add("text-green-600");
          signupError.classList.remove("hidden");
          setTimeout(() => {
            if (signupModal) signupModal.classList.add("hidden", "opacity-0");
          }, 1000);
        }
      })
      .catch((error) => {
        if (signupError) {
          signupError.textContent =
            error.code === "auth/popup-closed-by-user" ? "Google sign-in popup closed!" :
            "Error: " + error.message;
          signupError.classList.add("text-red-600");
          signupError.classList.remove("hidden");
        }
      });
  });

  signinGoogleBtn?.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        if (signinError) {
          signinError.textContent = "Signed in with Google successfully!";
          signinError.classList.add("text-green-600");
          signinError.classList.remove("hidden");
          setTimeout(() => {
            if (signinModal) signinModal.classList.add("hidden", "opacity-0");
          }, 1000);
        }
      })
      .catch((error) => {
        if (signinError) {
          signinError.textContent =
            error.code === "auth/popup-closed-by-user" ? "Google sign-in popup closed!" :
            "Error: " + error.message;
          signinError.classList.add("text-red-600");
          signinError.classList.remove("hidden");
        }
      });
  });

  signoutBtn?.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        alert("Signed out successfully!");
      })
      .catch((error) => {
        alert("Error signing out: " + error.message);
      });
  });

  onAuthStateChanged(auth, (user) => {
    console.log('Auth state changed:', user);
    toggleAuthButtons(user);
    if (user) {
      console.log("User is signed in:", user.email);
      localStorage.setItem("currentUser", user.email);
    } else {
      console.log("No user is signed in");
      localStorage.removeItem("currentUser");
    }
  });
}
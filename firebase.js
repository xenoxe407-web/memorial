// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

// Firestore
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "memorial-dff6c.firebaseapp.com",
  projectId: "memorial-dff6c",
  storageBucket: "memorial-dff6c.firebasestorage.app",
  messagingSenderId: "774936683234",
  appId: "1:774936683234:web:81f2329781e4a2982834bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

console.log("✅ Firebase Connected!");
console.log("✅ Firestore Connected!");

async function saveTestFlower() {
  try {
    const docRef = await addDoc(collection(db, "flowers"), {
      type: "rose",
      message: "My very first flower 🌸",
      createdAt: new Date()
    });

    console.log("✅ Flower saved!");
    console.log("Document ID:", docRef.id);

  } catch (error) {
    console.error(error);
  }
}

saveTestFlower();
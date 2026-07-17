// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

// Firestore
import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDF1rvPrVjtdrjDmbTKYB3gSK7ussdJAhI",
    authDomain: "memorial-dff6c.firebaseapp.com",
    projectId: "memorial-dff6c",
    storageBucket: "memorial-dff6c.firebasestorage.app",
    messagingSenderId: "774936683234",
    appId: "1:774936683234:web:81f2329781e4a2982834bb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("✅ Firebase Connected!");
console.log("✅ Firestore Connected!");

// ===========================
// Save Flower
// ===========================

export async function saveFlower(type, x, y, message, author) {

    await addDoc(collection(db, "flowers"), {

        type,
        x,
        y,
        message,
        author,
        createdAt: Date.now()

    });

}

// ===========================
// Realtime Listener
// ===========================

export function listenFlowers(callback) {

    return onSnapshot(collection(db, "flowers"), (snapshot) => {

        const flowers = [];

        snapshot.forEach((doc) => {

            flowers.push(doc.data());

        });

        callback(flowers);

    });

}
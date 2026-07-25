// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

// Firestore
import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot,
    serverTimestamp,
    query,
    orderBy,
    doc,
    updateDoc,
    increment
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

export { db };

console.log("✅ Firebase Connected!");
console.log("✅ Firestore Connected!");

// ===========================
// Save Flower
// ===========================

export async function saveFlower(flowerData) {

    console.log("Saving:", flowerData);

    await addDoc(

        collection(db, "flowers"),

        {

            ...flowerData,

            createdAt: serverTimestamp()

        }

    );

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

// ===========================
// Save Memory
// ===========================

export async function saveMemory(memoryData) {

    console.log("Saving Memory:", memoryData);

    await addDoc(

        collection(db, "memories"),

        {

            ...memoryData,

            likes: 0,

            createdAt: serverTimestamp()

        }

    );

}

// ===========================
// Realtime Memories
// ===========================

export function listenMemories(callback) {

    const q = query(

        collection(db, "memories"),

        orderBy("createdAt", "desc")

    );

    return onSnapshot(q, (snapshot) => {

        const memories = [];

        snapshot.forEach((doc) => {

            memories.push({

                id: doc.id,

                ...doc.data()

            });

        });

        callback(memories);

    });

}

// ===========================
// Like Memory
// ===========================

export async function likeMemory(memoryId) {

    await updateDoc(

        doc(db, "memories", memoryId),

        {

            likes: increment(1)

        }

    );

}

/* ===========================
   Candle
=========================== */

export async function saveCandle(){

    await addDoc(
        collection(db, "candles"),
        {
            createdAt: serverTimestamp()
        }
    );

}

export function listenCandles(callback){

    const candlesRef = collection(db, "candles");

    onSnapshot(candlesRef, (snapshot)=>{

        callback(snapshot.size);

    });

}
// =========================
// HOME PAGE
// =========================

console.log("🏠 Home page loaded.");

// =========================
// ELEMENTS
// =========================

import { listenCandles } from "./firebase.js";

const candleBtn = document.getElementById("candleBtn");
const messageBtn = document.getElementById("messageBtn");
const gardenBtn = document.getElementById("gardenBtn");
const memoryBtn = document.getElementById("memoryBtn");
const aboutBtn = document.getElementById("aboutBtn");

// =========================
// NAVIGATION
// =========================

// Light a Candle
candleBtn?.addEventListener("click", () => {

    window.location.href = "candle.html";

});

// Leave a Message
messageBtn?.addEventListener("click", () => {

    window.location.href = "write-memory.html";

});

// Flower Garden
gardenBtn?.addEventListener("click", () => {

    window.location.href = "flower-garden.html";

});

// Memories
memoryBtn?.addEventListener("click", () => {

    window.location.href = "memory-book.html";

});

// About
aboutBtn?.addEventListener("click", () => {

    window.location.href = "about.html";

});

const candleCount = document.getElementById("candleCount");

if (candleCount) {

    listenCandles((count) => {

        console.log("Candles:", count);

        candleCount.textContent = count.toLocaleString();

        console.log(candleCount);

    });

}
import {
    saveFlower,
    listenFlowers
} from "./firebase.js";

import { flowerZones } from "./flowerZones.js";

let currentFlowers = [];

// ==========================
// ELEMENTS
// ==========================

const addFlowerButton = document.getElementById("addFlowerButton");
const flowerSheet = document.getElementById("flowerSheet");
const overlay = document.getElementById("overlay");
const cancelSheet = document.getElementById("cancelSheet");
const flowerLayer = document.getElementById("flower-layer");

const placeFlower = document.getElementById("placeFlower");

const flowerOptions = document.querySelectorAll(".flower-option");

const visitorName = document.getElementById("visitorName");
const visitorMessage = document.getElementById("visitorMessage");

const popupOverlay = document.getElementById("flowerPopupOverlay");

const popupFlower = document.getElementById("popupFlower");

const popupAuthor = document.getElementById("popupAuthor");

const popupMessage = document.getElementById("popupMessage");

const popupDate = document.getElementById("popupDate");

const closePopup = document.getElementById("closePopup");

// ==========================
// VARIABLES
// ==========================

let selectedFlower = null;


// ==========================
// OPEN SHEET
// ==========================

addFlowerButton.addEventListener("click", () => {

    flowerSheet.classList.add("show");
    overlay.classList.add("show");

});

// ==========================
// CLOSE SHEET
// ==========================

function closeSheet() {

    flowerSheet.classList.remove("show");
    overlay.classList.remove("show");

}

cancelSheet.addEventListener("click", closeSheet);
overlay.addEventListener("click", closeSheet);

// ==========================
// FLOWER SELECTION
// ==========================

flowerOptions.forEach(flower => {

    flower.addEventListener("click", () => {

        flowerOptions.forEach(item => {

            item.classList.remove("selected");

        });

        flower.classList.add("selected");

        selectedFlower = flower.dataset.flower;

        console.log(selectedFlower);

    });

});

// ==========================
// PLACE FLOWER
// ==========================

placeFlower.addEventListener("click", async () => {

    if (!selectedFlower) {

        alert("Please choose a flower first 🌸");
        return;

    }

    // Find used zones
    const usedZones = new Set(
        currentFlowers.map(f => f.zoneId)
    );

    // Find first available zone
    const zone = flowerZones.find(
        z => !usedZones.has(z.id)
    );

    if (!zone) {

        alert("The garden is full! 🌸");
        return;

    }

    // Random position inside the zone
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * zone.radius;

    const randomX = Math.cos(angle) * distance;
    const randomY = Math.sin(angle) * distance;

    await saveFlower({

        type: selectedFlower,

        zoneId: zone.id,

        x: zone.x + randomX,

        y: zone.y + randomY,

        author: visitorName.value.trim() || "Someone",

        message: visitorMessage.value.trim()

    });

    console.log("🌸 Flower Saved!");

    closeSheet();

});

// ==========================
// DRAW FLOWERS
// ==========================

function drawFlowers(flowers){

    flowerLayer.innerHTML = "";

    flowers.forEach(flower => {

        // Flower container
        const marker = document.createElement("div");

        marker.classList.add("flower-marker");

        marker.style.left = `${flower.x}px`;
        marker.style.top = `${flower.y}px`;

        // Flower image
        const img = document.createElement("img");

        img.src = `assets/flowers/${flower.type}.png`;

        img.classList.add("garden-flower");

        // Name plate
        const name = document.createElement("div");

        name.classList.add("flower-name");

        name.textContent = flower.author || "Anonymous";

        // Assemble
        marker.appendChild(img);
        marker.appendChild(name);

        // Make flower clickable
        marker.addEventListener("click", () => {

            popupFlower.src = `assets/flowers/${flower.type}.png`;

            popupAuthor.textContent = flower.author || "Someone";

            popupMessage.textContent =
                flower.message || "No message left.";

            if (flower.createdAt?.toDate) {

                popupDate.textContent =
                    flower.createdAt
                    .toDate()
                    .toLocaleDateString("en-US", {

                year: "numeric",
                month: "long",
                day: "numeric"

            });

            } else {

                popupDate.textContent = "";

            }  

            popupOverlay.classList.add("show");

        });

        flowerLayer.appendChild(marker);

    });

}

closePopup.addEventListener("click", () => {

    popupOverlay.classList.remove("show");

});

popupOverlay.addEventListener("click", (e) => {

    if (e.target === popupOverlay) {

        popupOverlay.classList.remove("show");

    }

});
// ==========================
// LOAD FLOWERS
// ==========================

listenFlowers((flowers) => {

    console.log(flowers);

    currentFlowers = flowers;

    drawFlowers(flowers);

});
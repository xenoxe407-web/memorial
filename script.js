import { saveFlower, listenFlowers } from "./firebase.js";

let selectedFlower = null;
let clickX = 0;
let clickY = 0;

const flowerButtons = document.querySelectorAll(".flower-option");
const selectedFlowerText = document.getElementById("selectedFlowerText");
const memorialArea = document.getElementById("memorial-area");

const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");

const offerModal = document.getElementById("offerModal");
const authorInput = document.getElementById("authorInput");
const messageInput = document.getElementById("messageInput");
const offerBtn = document.getElementById("offerBtn");
const cancelBtn = document.getElementById("cancelBtn");

// =======================
// Create Flower
// =======================

function createFlower(type, x, y, message = "", author = "Anonymous") {

    const flower = document.createElement("div");
    flower.classList.add("flower");

    switch (type) {
        case "rose":
            flower.textContent = "🌹";
            break;
        case "tulip":
            flower.textContent = "🌷";
            break;
        case "sunflower":
            flower.textContent = "🌻";
            break;
        case "cherry":
            flower.textContent = "🌸";
            break;
    }

    flower.style.left = x + "px";
    flower.style.top = y + "px";

    // Show popup
    flower.addEventListener("click", (event) => {

        event.stopPropagation();

        popupMessage.innerHTML = `
            <strong>${author || "Anonymous"}</strong><br><br>
            ${message || "No message."}
        `;

        popup.style.left = (x + 35) + "px";
        popup.style.top = y + "px";

        popup.classList.remove("hidden");

    });

    memorialArea.appendChild(flower);

}

// =======================
// Hide Popup
// =======================

memorialArea.addEventListener("click", () => {

    popup.classList.add("hidden");

});

// =======================
// Real-time Listener
// =======================

listenFlowers((flowers) => {

    document.querySelectorAll(".flower").forEach(f => f.remove());

    flowers.forEach(flower => {

        createFlower(
            flower.type,
            flower.x,
            flower.y,
            flower.message,
            flower.author
        );

    });

});

// =======================
// Select Flower
// =======================

flowerButtons.forEach(button => {

    button.addEventListener("click", () => {

        selectedFlower = button.dataset.flower;

        selectedFlowerText.textContent =
            "Selected Flower: " + selectedFlower;

    });

});

// =======================
// Open Offer Modal
// =======================

memorialArea.addEventListener("click", (event) => {

    // Don't open modal if clicking a flower
    if (event.target.classList.contains("flower")) {
        return;
    }

    if (selectedFlower === null) {

        alert("Please choose a flower first. 🌸");
        return;

    }

    clickX = event.offsetX;
    clickY = event.offsetY;

    authorInput.value = "";
    messageInput.value = "";

    offerModal.classList.remove("hidden");

});

// =======================
// Cancel
// =======================

cancelBtn.addEventListener("click", () => {

    offerModal.classList.add("hidden");

});

// =======================
// Offer Flower
// =======================

offerBtn.addEventListener("click", async () => {

    const author = authorInput.value.trim() || "Anonymous";
    const message = messageInput.value.trim();

    await saveFlower(
        selectedFlower,
        clickX,
        clickY,
        message,
        author
    );

    // Close modal
    offerModal.classList.add("hidden");

    // Reset selection
    selectedFlower = null;
    selectedFlowerText.textContent = "Selected Flower: None";

});
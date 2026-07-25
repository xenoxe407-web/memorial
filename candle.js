import {
    saveCandle,
    listenCandles
} from "./firebase.js";

const lightCandleBtn = document.getElementById("lightCandleBtn");
const candleCount = document.getElementById("candleCount");

const candleModal = document.getElementById("candleModal");
const closeModalBtn = document.getElementById("closeModalBtn");

const mainCandle = document.getElementById("mainCandle");
const candleGlow = document.querySelector(".candle-glow");

listenCandles((count) => {

    candleCount.textContent = count;

});

function turnOnCandle(){

    mainCandle.src = "assets/icons/candle-on.png";

    candleGlow.classList.add("show");

}

function turnOffCandle(){

    mainCandle.src = "assets/icons/candle-off.png";

    candleGlow.classList.remove("show");

}

function showModal(){

    candleModal.classList.add("show");

}

function hideModal(){

    candleModal.classList.remove("show");

}

closeModalBtn.addEventListener("click", () => {

    hideModal();

});

lightCandleBtn.addEventListener("click", async () => {

    lightCandleBtn.disabled = true;

    lightCandleBtn.querySelector("span").textContent = "Lighting...";

    turnOnCandle();

    await saveCandle();

    // Modal comes next...

    setTimeout(() => {

    showModal();

    lightCandleBtn.disabled = false;

    lightCandleBtn.querySelector("span").textContent = "Light a Candle";

    }, 500);

});


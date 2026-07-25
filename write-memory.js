import { saveMemory } from "./firebase.js";

const backBtn = document.querySelector(".back-btn");
const memoryName = document.getElementById("memoryName");
const anonymousCheck = document.getElementById("anonymousCheck");
const memoryText = document.getElementById("memoryText");
const charCount = document.getElementById("charCount");
const submitButton = document.querySelector(".submit-memory-btn");


memoryText.addEventListener("input", () => {

    const count = memoryText.value.length;

    charCount.textContent = count;

    if (count >= 900) {

        charCount.style.color = "#FFD166";

    } else {

        charCount.style.color = "#D7C4F5";

    }

});

anonymousCheck.addEventListener("change", () => {

    if (anonymousCheck.checked) {

        memoryName.value = "Anonymous";

        memoryName.disabled = true;

    } else {

        memoryName.value = "";

        memoryName.disabled = false;

        memoryName.focus();

    }

});

submitButton.addEventListener("click", async () => {

    const name = memoryName.value.trim();
    const memory = memoryText.value.trim();

    // Validate Name
    if (!anonymousCheck.checked && name === "") {

        alert("Please enter your name.");

        memoryName.focus();

        return;

    }

    // Validate Memory
    if (memory === "") {

        alert("Please write a memory before submitting.");

        memoryText.focus();

        return;

    }

    // Passed validation

    await saveMemory({

    name,

    message: memory,

    anonymous: anonymousCheck.checked

});

submitButton.disabled = true;
submitButton.textContent = "Saving...";

memoryName.value = "";
memoryText.value = "";
anonymousCheck.checked = false;
memoryName.disabled = false;

charCount.textContent = "0";

window.location.href = "memory-book.html";

});

backBtn.addEventListener("click", () => {

    window.location.href = "memory-book.html";

});
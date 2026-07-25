import {

    listenMemories,
    likeMemory

} from "./firebase.js";

const clickedHearts = {};
const memoryList = document.getElementById("memoryList");
const closePopup = document.getElementById("closePopup");
const searchInput = document.getElementById("searchInput");

const overlay = document.getElementById("memoryOverlay");

const writeMemoryBtn = document.getElementById("writeMemoryBtn");

const popupName = document.getElementById("popupName");
const popupDate = document.getElementById("popupDate");
const popupMessage = document.getElementById("popupMessage");
const popupLikeCount = document.getElementById("popupLikeCount");

// Write Memory Button

writeMemoryBtn.addEventListener("click", () => {

    window.location.href = "write-memory.html";

});

// ===========================
// Load Memories
// ===========================

listenMemories((memories) => {

    memoryList.innerHTML = "";

    memories.forEach((memory) => {

        const preview =
            memory.message.length > 120
                ? memory.message.substring(0, 120) + "..."
                : memory.message;

        let date = "";

        if (memory.createdAt) {

            date = memory.createdAt.toDate().toLocaleDateString(
                "en-US",
                {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }
            );

        }

        memoryList.innerHTML += `

        <article
            class="memory-card"

            data-id="${memory.id}"
            data-name="${memory.name}"
            data-date="${date}"
            data-message="${memory.message}"
            data-likes="${memory.likes}">

            <div class="memory-header-row">

                <div class="memory-author">

                    <img
                        src="assets/icons/feather.png"
                        class="memory-avatar">

                    <div>

                        <h3>${memory.name}</h3>

                        <span>${date}</span>

                    </div>

                </div>

                <button class="favorite-btn">

                    <img
                        <img
                            src="${
                                clickedHearts[memory.id]
                                    ? 'assets/icons/heart-filled.png'
                                    : 'assets/icons/heart-outline.png'
                            }"
                            alt="Like">

                </button>

            </div>

            <div class="memory-divider"></div>

            <p class="memory-preview">

                ${preview}

            </p>

            <button class="read-more-link">

                Read More →

            </button>

        </article>

        `;

    });

    attachPopupEvents();

});

// ===========================
// Popup
// ===========================

function attachPopupEvents() {

    document.querySelectorAll(".read-more-link").forEach((button) => {

        button.onclick = () => {

            const card = button.closest(".memory-card");

            popupName.textContent = card.dataset.name;
            popupDate.textContent = card.dataset.date;
            popupMessage.textContent = card.dataset.message;
            popupLikeCount.textContent = card.dataset.likes;

            overlay.classList.remove("hidden");

            requestAnimationFrame(() => {

                overlay.classList.add("show");

            });

        };

    });

    document.querySelectorAll(".favorite-btn").forEach((button) => {

        button.onclick = async () => {

            const card = button.closest(".memory-card");

            console.log("❤️ Clicked");
            console.log("ID:", card.dataset.id);

            try {

                const img = button.querySelector("img");

                img.src = "assets/icons/heart-filled.png";

                clickedHearts[card.dataset.id] = true;

                await likeMemory(card.dataset.id);

                console.log("after like");

                console.log("Image:", img);

                console.log("New src:", img.src);

            } catch (error) {

                console.error(error);

            }

        };

    });

}

overlay.onclick = (e) => {

    if (e.target === overlay) {

        closeMemoryPopup();

    }

};

function closeMemoryPopup(){

    overlay.classList.remove("show");

    setTimeout(() => {

        overlay.classList.add("hidden");

    }, 250);

}

closePopup.onclick = closeMemoryPopup;

searchInput.addEventListener("input", () => {

    const keyword = searchInput.value.toLowerCase();

    document.querySelectorAll(".memory-card").forEach((card) => {

        const name = card.dataset.name.toLowerCase();
        const message = card.dataset.message.toLowerCase();
        const date = card.dataset.date.toLowerCase();

        const found =
            name.includes(keyword) ||
            message.includes(keyword) ||
            date.includes(keyword);

        card.style.display = found
            ? ""
            : "none";

    });

});
// =========================
// ELEMENTS
// =========================

const musicButton = document.getElementById("music-toggle");
const musicIcon = document.getElementById("music-icon");
const bgMusic = document.getElementById("bgMusic");

// If page has no music elements, do nothing
if (!musicButton || !musicIcon || !bgMusic) {

    console.log("🎵 Music elements not found.");

} else {

    // 🔊 Background music volume
    bgMusic.volume = 0.15;

    // =========================
    // LOAD SAVED STATE
    // =========================

    const savedPlaying =
        localStorage.getItem("musicPlaying") === "true";

    const savedTime =
        parseFloat(localStorage.getItem("musicTime")) || 0;

    // Restore playback position
    bgMusic.currentTime = savedTime;

    if (savedPlaying) {

        bgMusic.play().then(() => {

            musicIcon.src = "assets/icons/music-on.png";

        }).catch(() => {

            // Browser blocked autoplay.
            // Wait for next user interaction.
            musicIcon.src = "assets/icons/music-off.png";

        });

    }

    // =========================
    // TOGGLE MUSIC
    // =========================

    musicButton.addEventListener("click", async () => {

        if (bgMusic.paused) {

            try {

                await bgMusic.play();

                musicIcon.src =
                    "assets/icons/music-on.png";

                localStorage.setItem(
                    "musicPlaying",
                    "true"
                );

            } catch (err) {

                console.error(err);

            }

        } else {

            bgMusic.pause();

            musicIcon.src =
                "assets/icons/music-off.png";

            localStorage.setItem(
                "musicPlaying",
                "false"
            );

        }

    });

    // =========================
    // SAVE POSITION
    // =========================

    bgMusic.addEventListener("timeupdate", () => {

        localStorage.setItem(
            "musicTime",
            bgMusic.currentTime
        );

    });

    // =========================
    // WHEN MUSIC ENDS
    // =========================

    bgMusic.addEventListener("ended", () => {

        localStorage.setItem(
            "musicPlaying",
            "false"
        );

        localStorage.setItem(
            "musicTime",
            0
        );

        musicIcon.src =
            "assets/icons/music-off.png";

    });

}
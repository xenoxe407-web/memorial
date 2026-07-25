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

    // Wait until audio metadata is ready
    bgMusic.addEventListener("loadedmetadata", () => {

        if (savedTime > 0) {
            bgMusic.currentTime = savedTime;
        }

        if (savedPlaying) {

            bgMusic.play().then(() => {

                musicIcon.src = "assets/icons/music-on.png";

            }).catch(() => {

                // Browser blocked autoplay
                musicIcon.src = "assets/icons/music-off.png";

            });

        }

    });

    // =========================
    // TOGGLE MUSIC
    // =========================

    musicButton.addEventListener("click", async () => {

        if (bgMusic.paused) {

            try {

            const savedTime =
            parseFloat(localStorage.getItem("musicTime")) || 0;

        if (savedTime > 0) {
            bgMusic.currentTime = savedTime;
        }

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

    setInterval(() => {

    if (!bgMusic.paused) {

        localStorage.setItem(
            "musicTime",
            bgMusic.currentTime
        );

    }

    }, 3000);

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

    function saveMusicState() {

    localStorage.setItem(
        "musicTime",
        bgMusic.currentTime
    );

    localStorage.setItem(
        "musicPlaying",
        !bgMusic.paused
    );

    }

    window.addEventListener(
        "pagehide",
        saveMusicState
    );

    window.addEventListener(
        "beforeunload",
        saveMusicState
    );

    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.visibilityState === "hidden") {

                saveMusicState();

            }

        }
    );

}
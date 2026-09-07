/* ==========================================================
   RABIYA EXPERIENCE
========================================================== */


/* ==========================================================
   VARIABLES
========================================================== */

const screens = document.querySelectorAll(".screen");

const music = document.getElementById("backgroundMusic");

let currentScreen = 0;

let discoveredPhotos = 0;


/* ==========================================================
   SCREEN TRANSITION
========================================================== */

function goToScreen(number) {

    screens.forEach((screen, index) => {

        screen.classList.toggle(
            "active",
            index === number
        );

    });

    currentScreen = number;

}


/* ==========================================================
   START EXPERIENCE
========================================================== */

const beginButton =
    document.getElementById("beginButton");

beginButton.addEventListener("click", async () => {

    /*
        Browsers usually allow audio to start
        after the user clicks a button.
    */

    try {

        music.volume = 0;

        await music.play();

        fadeMusicIn();

    } catch (error) {

        console.log(
            "Audio could not start automatically.",
            error
        );

    }

    goToScreen(1);

});


/* ==========================================================
   MUSIC FADE IN
========================================================== */

function fadeMusicIn() {

    let volume = 0;

    const fade = setInterval(() => {

        volume += 0.02;

        music.volume = Math.min(volume, 0.65);

        if (volume >= 0.65) {

            clearInterval(fade);

        }

    }, 60);

}


/* ==========================================================
   SCREEN 2 — MEMORIES
========================================================== */

const memoryCards =
    document.querySelectorAll(".memory-card");

const memoryModal =
    document.getElementById("memoryModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalText =
    document.getElementById("modalText");

const modalClose =
    document.getElementById("modalClose");

const modalNext =
    document.getElementById("modalNext");


const memories = [

    {
        title: "Where it began.",
        text:
        "A normal beginning to something that would eventually become a collection of memories."
    },

    {
        title: "One little moment.",
        text:
        "Sometimes the smallest moments end up being the ones you remember the longest."
    },

    {
        title: "Still here.",
        text:
        "Funny how certain moments stay somewhere in your head long after the moment itself is gone."
    }

];


memoryCards.forEach((card) => {

    card.addEventListener("click", () => {

        const index =
            Number(card.dataset.memory);

        modalTitle.textContent =
            memories[index].title;

        modalText.textContent =
            memories[index].text;

        memoryModal.classList.add("active");

    });

});


modalClose.addEventListener("click", () => {

    memoryModal.classList.remove("active");

});


modalNext.addEventListener("click", () => {

    memoryModal.classList.remove("active");

});


/* Continue from Remember */

const rememberContinue =
    document.getElementById("rememberContinue");

rememberContinue.addEventListener("click", () => {

    goToScreen(2);

});


/* ==========================================================
   SCREEN 3 — PHOTO WALL
========================================================== */

const photoCards =
    document.querySelectorAll(".photo-card");

const wallCounter =
    document.getElementById("wallCounter");

const wallContinue =
    document.getElementById("wallContinue");


photoCards.forEach((card) => {

    card.addEventListener("click", () => {

        const alreadyFlipped =
            card.classList.contains("flipped");


        if (!alreadyFlipped) {

            card.classList.add("flipped");

            discoveredPhotos++;

            updateWallCounter();

        }

    });

});


function updateWallCounter() {

    wallCounter.textContent =
        `${discoveredPhotos} / ${photoCards.length} discovered`;


    if (
        discoveredPhotos ===
        photoCards.length
    ) {

        wallContinue.classList.remove("hidden");

    }

}


/* Continue from wall */

wallContinue.addEventListener("click", () => {

    goToScreen(3);

});


/* ==========================================================
   SCREEN 4 — PAUSE
========================================================== */

const pauseContinue =
    document.getElementById("pauseContinue");


pauseContinue.addEventListener("click", () => {

    goToScreen(4);

});


/* ==========================================================
   SCREEN 5 — FINAL DOOR
========================================================== */

const doorContainer =
    document.getElementById("doorContainer");

const openDoor =
    document.getElementById("openDoor");

const videoReveal =
    document.getElementById("videoReveal");

const finalVideo =
    document.getElementById("finalVideo");


openDoor.addEventListener("click", () => {

    /*
        First open the doors.
    */

    doorContainer.classList.add("open");

    openDoor.classList.add("hidden");


    /*
        Give the door animation time
        before revealing the video.
    */

    setTimeout(() => {

        fadeMusicOut();

        /* Show the video container immediately */
        videoReveal.classList.add("active");

        /* Show video element right away — don't wait for loadeddata */
        videoReveal.classList.add("video-ready");

        /* Hide placeholder immediately */
        const placeholder =
            videoReveal.querySelector(".video-placeholder");
        if (placeholder) {
            placeholder.style.display = "none";
        }

        /* Attempt auto-play */
        finalVideo.play().catch(() => {
            /* If autoplay is blocked, the user can press play manually */
        });

    }, 2200);

});


/* ==========================================================
   FADE MUSIC OUT
========================================================== */

function fadeMusicOut() {

    let volume = music.volume;

    const fade = setInterval(() => {

        volume -= 0.025;

        music.volume =
            Math.max(volume, 0);

        if (volume <= 0) {

            clearInterval(fade);

            music.pause();

        }

    }, 50);

}


/* ==========================================================
   ESC KEY
========================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            memoryModal.classList.remove(
                "active"
            );

        }

    }
);
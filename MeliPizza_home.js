/* ========================== */
/* 🖼️ SCHIMBARE AUTOMATĂ IMAGINE PRINCIPALĂ 🖼️ */
/* ========================== */
const slider = document.querySelector(".slider");
const images = document.querySelectorAll(".slider img");
const totalImages = images.length;
let currentIndex = 0;

// Funcție pentru actualizarea poziției sliderului
function updateSliderPosition() {
    slider.style.transform = `translateX(-${currentIndex * 100}vw)`;
}

// 🔄 Schimbare automată imagine
function autoSlide() {
    currentIndex = (currentIndex + 1) % totalImages;
    updateSliderPosition();
}
let slideInterval = setInterval(autoSlide, 6000); // Tranziție la 6 secunde pentru un efect mai natural

// 🔄 Navigare manuală
document.querySelector(".left-arrow").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateSliderPosition();
    resetAutoSlide();
});

document.querySelector(".right-arrow").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalImages;
    updateSliderPosition();
    resetAutoSlide();
});

// ⏳ Resetare auto-slide la interacțiune
function resetAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(autoSlide, 6000);
}

/* ========================== */
/* 🔄 CARUSELA PRODUSE 🔄 */
/* ========================== */
document.addEventListener("DOMContentLoaded", () => {
    const carousels = document.querySelectorAll(".menu-section");

    carousels.forEach(section => {
        const carousel = section.querySelector(".menu-items");
        const leftArrow = section.querySelector(".left-arrow");
        const rightArrow = section.querySelector(".right-arrow");
        const items = Array.from(carousel.children);
        const itemWidth = items[0].offsetWidth + 30; // Lățimea + gap
        const visibleItems = Math.floor(section.offsetWidth / itemWidth); // Număr dinamic de produse vizibile
        const totalItems = items.length;
        let index = 0;
        let autoMove;

        function updateCarousel() {
            carousel.style.transform = `translateX(-${index * itemWidth}px)`;
        }

        function moveCarousel(direction) {
            if (direction === "right") {
                if (index < totalItems - visibleItems) {
                    index++;
                } else {
                    index = 0; // Resetare la început
                }
            } else {
                if (index > 0) {
                    index--;
                } else {
                    index = totalItems - visibleItems; // Mergem la ultimul set de produse
                }
            }
            updateCarousel();
        }

        leftArrow.addEventListener("click", () => {
            moveCarousel("left");
            restartAutoPlay();
        });

        rightArrow.addEventListener("click", () => {
            moveCarousel("right");
            restartAutoPlay();
        });

        function startAutoPlay() {
            autoMove = setInterval(() => moveCarousel("right"), 3000);
        }

        function restartAutoPlay() {
            clearInterval(autoMove);
            startAutoPlay();
        }

        // Start automat
        startAutoPlay();
    });
});











document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll(".fade-in");

    function checkFadeIn() {
        fadeElements.forEach((element) => {
            const position = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (position < windowHeight * 0.8) {
                element.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", checkFadeIn);
    checkFadeIn(); // Call once to check on load

    // Parallax effect for main image
    window.addEventListener("scroll", function () {
        const parallax = document.querySelector(".parallax img");
        let scrollPos = window.scrollY;
        parallax.style.transform = `translateY(${scrollPos * 0.3}px)`;
    });
});

/* =========================================================
   NIKKIRTHA — MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PRELOADER
       ===================================================== */

    const loader = document.getElementById("loader");

    window.addEventListener("load", function () {

        setTimeout(function () {

            if (loader) {
                loader.classList.add("hide");
            }

        }, 500);

    });


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuBtn = document.querySelector(".menu-btn");
    const navMenu = document.querySelector(".navbar ul");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", function () {

            navMenu.classList.toggle("active");

            if (navMenu.classList.contains("active")) {

                menuBtn.innerHTML = "✕";

            } else {

                menuBtn.innerHTML = "☰";

            }

        });


        /* Close menu when a navigation link is clicked */

        const navLinks = document.querySelectorAll(".navbar ul a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("active");

                menuBtn.innerHTML = "☰";

            });

        });

    }


    /* =====================================================
       SCROLL ANIMATIONS
       ===================================================== */

    const animatedElements = document.querySelectorAll(
        ".card, .about-card, .origin-card, .info-card, " +
        ".timeline-item, .faq details, .pronounce-box, " +
        ".contact-container"
    );

    const observerOptions = {
        threshold: 0.12
    };

    const observer = new IntersectionObserver(function (
        entries,
        observer
    ) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    }, observerOptions);


    animatedElements.forEach(function (element) {

        observer.observe(element);

    });


    /* =====================================================
       BACK TO TOP BUTTON
       ===================================================== */

    const topButton = document.getElementById("topBtn");

    if (topButton) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 500) {

                topButton.classList.add("show");

            } else {

                topButton.classList.remove("show");

            }

        });


        topButton.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       SMOOTH SCROLLING
       ===================================================== */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                const header = document.querySelector("header");

                const headerHeight = header
                    ? header.offsetHeight
                    : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }

        });

    });


    /* =====================================================
       NAVBAR SHADOW ON SCROLL
       ===================================================== */

    const header = document.querySelector("header");

    function updateNavbar() {

        if (!header) {
            return;
        }

        if (window.scrollY > 50) {

            header.style.boxShadow =
                "0 8px 25px rgba(91, 45, 63, 0.08)";

        } else {

            header.style.boxShadow = "none";

        }

    }

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();


    /* =====================================================
       CONTACT FORM
       ===================================================== */

    const contactForm =
        document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            alert(
                "Thank you for your message! " +
                "The contact form is currently a demonstration."
            );

            contactForm.reset();

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION LINK
       ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navigationLinks =
        document.querySelectorAll(".navbar ul a");

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 150;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection = section.getAttribute("id");

            }

        });


        navigationLinks.forEach(function (link) {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === "#" + currentSection) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveLink
    );

    updateActiveLink();


    /* =====================================================
       ESCAPE KEY — CLOSE MOBILE MENU
       ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            if (
                navMenu &&
                navMenu.classList.contains("active")
            ) {

                navMenu.classList.remove("active");

                if (menuBtn) {
                    menuBtn.innerHTML = "☰";
                }

            }

        }

    });


    /* =====================================================
       REDUCED MOTION SUPPORT
       ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (prefersReducedMotion) {

        document.documentElement.style.scrollBehavior =
            "auto";

    }

});
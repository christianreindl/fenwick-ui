import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import "./scss/main.scss";

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".featured-image",
        scrub: true,
    },
});

tl.fromTo(
    ".featured-image__inner",
    {
        yPercent: -40,
        height: "140%",
        ease: "none",
    },
    {
        yPercent: 0,
        height: "140%",
        ease: "none",
    },
    0
);

const tlCases = gsap.timeline({
    scrollTrigger: {
        trigger: ".home__cases",
        scrub: 1,
        end: "bottom top"
    },
});


let homeCases = gsap.utils.toArray(".home__case");

homeCases.forEach((section, i) => {
    section.image = section.querySelector(".home__case__image__inner");
    section.pattern = section.querySelector(".home__case__pattern");
    const depth = section.dataset.depth;
    const movement = -(section.offsetHeight * depth * 2);

    console.log("depth", depth);

    tlCases
        .to(section, {
            y: movement,
            ease: "none",
        }, 0)

    gsap.to(section.pattern, {
        scrollTrigger: {
            trigger: section,
            scrub: 1,
        },
        yPercent: 30,
        ease: "none",
    });

    gsap.from(section.image, {
        scrollTrigger: {
            trigger: section,
            toggleActions: "restart none none reverse",
        },
        height: "25%",
        duration: 0.75,
        ease: "power3.out",
    });
});

// Navigation

const navContainer = document.querySelector(".nav");
const navUnderlay = document.querySelector(".nav__megamenu__underlay");

const navWayfinding = document.querySelector(".wayfinding--sticky");

const navHamburger = document.querySelector(".nav__button--hamburger");
const navSearch = document.querySelector(".nav__button--search");

const navActions = document.querySelectorAll(".nav__action");
const navItems = document.querySelectorAll(".nav__item");
const navLinks = document.querySelectorAll(".nav__link");

let hamburgerMenuIsOpen = false;

function hideTopMegamenu(event) {
    Array.prototype.forEach.call(navItems, (navItem) => {
        navItem.classList.remove("nav__item--active");
    });
    navContainer.classList.remove("nav--megamenu-open", "dark");
}

function showTopMegamenu(event) {
    navContainer.classList.add("nav--megamenu-open", "dark");
    Array.prototype.forEach.call(navItems, (navItem) => {
        navItem.classList.remove("nav__item--active");
    });

    const navItem = event.currentTarget.parentNode;
    navItem.classList.add("nav__item--active");
}

function toggleHamburgerMenu(event) {
    if (hamburgerMenuIsOpen) {
        Array.prototype.forEach.call(navActions, (navAction) => {
            navAction.classList.remove("nav__action--active");
        });
        navContainer.classList.remove("nav--hamburger-open", "dark");
        hamburgerMenuIsOpen = false;
    } else {
        navContainer.classList.add("nav--hamburger-open", "dark");
        Array.prototype.forEach.call(navActions, (navAction) => {
            navAction.classList.remove("nav__action--active");
        });
        event.currentTarget.classList.add("nav__action--active");
        hamburgerMenuIsOpen = true;
    }
}

function checkScroll() {
    const startY = 100; //The point where the navbar changes in px
    if (window.pageYOffset > startY) {
        navContainer.classList.add("nav--scrolled");
        navWayfinding.classList.add("wayfinding--scrolled");
    } else {
        navContainer.classList.remove("nav--scrolled");
        navWayfinding.classList.remove("wayfinding--scrolled");
    }
}

Array.prototype.forEach.call(navLinks, (navLink) => {
    navLink.addEventListener("focus", showTopMegamenu);
});
Array.prototype.forEach.call(navLinks, (navLink) => {
    navLink.addEventListener("mouseenter", showTopMegamenu);
});

navSearch.addEventListener("click", showTopMegamenu);
navSearch.addEventListener("focus", showTopMegamenu);

navHamburger.addEventListener("click", toggleHamburgerMenu);
navContainer.addEventListener("mouseleave", hideTopMegamenu);

navUnderlay.addEventListener("mouseenter", hideTopMegamenu);

window.addEventListener("scroll", checkScroll);
window.addEventListener("load", checkScroll);

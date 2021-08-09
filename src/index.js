import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Vibrant from "node-vibrant";


gsap.registerPlugin(ScrollTrigger);



// -----------------------------------------------------------------------------
// Home Parallax Animation
// -----------------------------------------------------------------------------


const tlCases = gsap.timeline({
    scrollTrigger: {
        trigger: ".home__tiles",
        scrub: 1,
        end: "bottom top",
    },
});

gsap.from(".home__title__line", {
    yPercent: 100,
    stagger: 0.1,
    duration: 1,
    ease: "power3.out",
});

let homeTiles = gsap.utils.toArray(".home__tile");

homeTiles.forEach((section, i) => {
    section.image = section.querySelector(".home__case__image__inner");
    section.pattern = section.querySelector(".home__case__pattern");
    section.marquee = section.querySelector(".home__tile__marquee");

    const depth = section.dataset.depth;
    const movement = -(section.offsetHeight * depth * 2);


    ScrollTrigger.matchMedia({
        "(max-width: 639px)": function () {
            // Mobile
        },
        "(min-width: 640px": function () {
            // Tablet and Desktop
            tlCases.to(section, { y: movement, ease: "none" }, 0);
        },
    });

    gsap.to(section.pattern, {
        scrollTrigger: {
            trigger: section,
            scrub: 1,
        },
        yPercent: 40,
        ease: "none",
    });

    gsap.to(section.marquee, {
        scrollTrigger: {
            trigger: section,
            scrub: 1,
        },
        x: -200,
        ease: "none",
    });

    gsap.from(section.image, {
        scrollTrigger: {
            trigger: section,
            toggleActions: "restart none none reverse",
        },
        height: "25%",
        duration: 1.25,
        ease: "power3.out",
    });
});



// -----------------------------------------------------------------------------
// Article Featured Image Parallax
// -----------------------------------------------------------------------------


gsap.fromTo(
    ".featured-image__inner",
    {
        yPercent: -30,
        height: "130%",
        ease: "none",
    },
    {
        scrollTrigger: {
            trigger: ".featured-image",
            scrub: true,
        },    
        yPercent: 0,
        height: "130%",
        ease: "none",
    }
);






// -----------------------------------------------------------------------------
// Navigation Event Listeners.
// In a nutshell, for the sake of this demo I'm only applying classes,
// so all animations are happening via CSS.
// -----------------------------------------------------------------------------

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
        navItem.classList.remove("nav__item--expanded");
    });
    navContainer.classList.remove("nav--megamenu-open", "dark");
}

function showTopMegamenu(event) {
    navContainer.classList.add("nav--megamenu-open", "dark");
    Array.prototype.forEach.call(navItems, (navItem) => {
        navItem.classList.remove("nav__item--expanded");
    });

    const navItem = event.currentTarget.parentNode;
    navItem.classList.add("nav__item--expanded");
}

function toggleHamburgerMenu(event) {
    if (hamburgerMenuIsOpen) {
        Array.prototype.forEach.call(navActions, (navAction) => {
            navAction.classList.remove("nav__action--expanded");
        });
        navContainer.classList.remove("nav--hamburger-open", "dark");
        hamburgerMenuIsOpen = false;
    } else {
        navContainer.classList.add("nav--hamburger-open", "dark");
        Array.prototype.forEach.call(navActions, (navAction) => {
            navAction.classList.remove("nav__action--expanded");
        });
        event.currentTarget.classList.add("nav__action--expanded");
        hamburgerMenuIsOpen = true;
    }
}

function checkScroll() {
    const startY = 100; //The point where the navbar changes in px
    if (window.pageYOffset > startY) {
        navContainer && navContainer.classList.add("nav--scrolled");
        navWayfinding && navWayfinding.classList.add("wayfinding--scrolled");
    } else {
        navContainer && navContainer.classList.remove("nav--scrolled");
        navWayfinding && navWayfinding.classList.remove("wayfinding--scrolled");
    }
}

Array.prototype.forEach.call(navLinks, (navLink) => {
    navLink.addEventListener("focus", showTopMegamenu);
});
Array.prototype.forEach.call(navLinks, (navLink) => {
    navLink.addEventListener("mouseenter", showTopMegamenu);
});

navSearch && navSearch.addEventListener("click", showTopMegamenu);
navSearch && navSearch.addEventListener("focus", showTopMegamenu);
navHamburger && navHamburger.addEventListener("click", toggleHamburgerMenu);
navContainer && navContainer.addEventListener("mouseleave", hideTopMegamenu);
navUnderlay && navUnderlay.addEventListener("mouseenter", hideTopMegamenu);
window.addEventListener("scroll", checkScroll);
window.addEventListener("load", checkScroll);



// -----------------------------------------------------------------------------
// Compound Filter States (Filter with 2 states on Insights page)
// -----------------------------------------------------------------------------

const filtersCompound = document.querySelector(".filters__compound");
const filtersToggleButtons = document.querySelectorAll(
    ".filters__compound__toggle"
);
let filtersMultiselectActive = false;

function toggleCompoundFilters(event) {
    console.log("Test");
    if (filtersMultiselectActive) {
        filtersCompound.classList.remove("filters__compound--mutliselect");
        filtersMultiselectActive = false;
    } else {
        filtersCompound.classList.add("filters__compound--mutliselect");
        filtersMultiselectActive = true;
    }
}

Array.prototype.forEach.call(filtersToggleButtons, (toggle) => {
    toggle.addEventListener("click", toggleCompoundFilters);
});



// -----------------------------------------------------------------------------
// Extracting color from people photos and applying them as background
// -----------------------------------------------------------------------------

const people = document.querySelectorAll(".person");

Array.prototype.forEach.call(people, (person) => {
    person.background = person.querySelector(".person__background");
    person.photo = person.querySelector(".person__photo");

    Vibrant.from(person.photo.src).getPalette((err, palette) => {
        person.background.style.backgroundColor = palette.LightMuted.hex;
    });
});

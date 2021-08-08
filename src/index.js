import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Vibrant from 'node-vibrant'

gsap.registerPlugin(ScrollTrigger);

const breakpoints = {
    small: 0,
    medium: 640,
    large: 1024,
    xlarge: 1200,
    xxlarge: 1440,
};

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
        end: "bottom top",
    },
});

gsap.from(".home__title__line", {
    yPercent: 100,
    stagger: 0.1,
    duration: 1,
    ease: "power3.out",
});

let homeCases = gsap.utils.toArray(".home__case");

homeCases.forEach((section, i) => {
    section.image = section.querySelector(".home__case__image__inner");
    section.pattern = section.querySelector(".home__case__pattern");
    section.marquee = section.querySelector(".home__case__marquee");

    const depth = section.dataset.depth;
    const movement = -(section.offsetHeight * depth * 2);

    console.log("depth", depth);

    ScrollTrigger.matchMedia({
        // Mobile
        "(max-width: 800px)": function () {},
        // Tablet and Desktop
        "(min-width: 1200px": function () {
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





// Filters

const filtersCompound = document.querySelector(".filters__compound");
const filtersToggleButtons = document.querySelectorAll(".filters__compound__toggle");
let filtersMultiselectActive = false

function toggleCompoundFilters(event) {
    console.log("Test")
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





// Photos
const people = document.querySelectorAll('.person');

Array.prototype.forEach.call(people, (person) => {
    person.background = person.querySelector('.person__background');
    person.photo = person.querySelector('.person__photo');

    Vibrant.from(person.photo.src).getPalette((err, palette) => {
        person.background.style.backgroundColor = palette.LightMuted.hex;
    })

});

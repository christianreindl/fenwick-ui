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



const navContainer = document.querySelector('.nav')
const navUnderlay = document.querySelector('.nav__megamenu__underlay')

const navItems = document.querySelectorAll('.nav__item')
const navLinks = document.querySelectorAll('.nav__link')


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

function checkScroll() {
  const startY = 10; //The point where the navbar changes in px
  if (window.pageYOffset > startY) {
    navContainer.classList.add('nav--scrolled');
  } else {
    navContainer.classList.remove('nav--scrolled');
  }
}

Array.prototype.forEach.call(navLinks, navLink => {
  navLink.addEventListener('focus', showTopMegamenu)
});
Array.prototype.forEach.call(navLinks, navLink => {
  navLink.addEventListener('mouseenter', showTopMegamenu)
});

navContainer.addEventListener('mouseleave', hideTopMegamenu)
navUnderlay.addEventListener('mouseenter', hideTopMegamenu)

window.addEventListener('scroll', checkScroll)
window.addEventListener('load', checkScroll)

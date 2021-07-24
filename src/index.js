import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import "./scss/main.scss";

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".featured-image",
    scrub: true
  }
});

tl.fromTo(
  ".featured-image__inner",
  {
    yPercent: -40,
    height: "140%",
    ease: "none"
  },
  {
    yPercent: 0,
    height: "140%",
    ease: "none"
  },
  0
);

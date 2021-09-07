import gsap from "gsap";


const slideDelay = 5;
const slideDuration = 1.5;
const slideEase = "power3.inOut";

const carousels = gsap.utils.toArray(".home__people__carousel");
const carouselPrevButton = document.querySelector(".home__people__prev");
const carouselNextButton = document.querySelector(".home__people__next");

carousels.forEach((carousel) => {
  const slides = carousel.querySelectorAll(".home__people__carousel__slide");
  const progressWrap = gsap.utils.wrap(0, 1);
  const numSlides = slides.length;
  const startingSlide = carousel.dataset.start || 0;
  let snapX;
  
  gsap.set(slides, {
    xPercent: i => i * 100 - 100 * startingSlide
  });

  const wrap = gsap.utils.wrap(-100, (numSlides - 1) * 100);
  const timer = gsap.delayedCall(slideDelay, autoPlay);
  const animation = gsap.to(slides, {
    xPercent: "+=" + (numSlides * 100),
    duration: 1,
    ease: "none",
    paused: true,
    repeat: -1,
    modifiers: {
      xPercent: wrap 
    }
  });

  const proxy = document.createElement("div");
  let slideAnimation = gsap.to({}, {});
  let slideWidth = 0;
  let wrapWidth = 0;
  carousel.appendChild(proxy);
  resize();
  window.addEventListener("resize", resize);


  function animateSlides(direction) {
    timer.restart(true);
    slideAnimation.kill();
    const x = snapX(gsap.getProperty(proxy, "x") + direction * slideWidth);
    
    slideAnimation = gsap.to(proxy, {
      x: x,
      duration: slideDuration,
      ease: slideEase,
      onUpdate: updateProgress
    });
  }

  carouselPrevButton && carouselPrevButton.addEventListener("click", function() {
    animateSlides(1);
  });
  
  carouselNextButton && carouselNextButton.addEventListener("click", function() {
    animateSlides(-1);
  });

  function autoPlay() {  
    animateSlides(1);
  }

  function updateProgress() { 
    animation.progress(progressWrap(gsap.getProperty(proxy, "x") / wrapWidth));
  }

  function resize() {

    const norm = (gsap.getProperty(proxy, "x") / wrapWidth) || 0;

    slideWidth = slides[0].offsetWidth;
    wrapWidth = slideWidth * numSlides;
    snapX = gsap.utils.snap(slideWidth);

    gsap.set(proxy, {
      x: norm * wrapWidth
    });

    animateSlides(0);
    slideAnimation.progress(1);
  }

})

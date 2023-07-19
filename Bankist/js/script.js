"use strict";
/*----------- Start Modal Window -----------*/
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnOpenModal = document.querySelectorAll(".btn--show-modal"); // get nodeList of all Buttons
const btnCloseModal = document.querySelector(".btn--close-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnOpenModal.forEach((btn) => {
  btn.addEventListener("click", openModal);
});
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
/*----------- End Modal Window -----------*/

///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////

/*----------- Start Heading text_Button Scroll -----------*/
const textBtnScroll = document.querySelector(".btn--scroll");
textBtnScroll.addEventListener("click", () => {
  document.getElementById("section--1").scrollIntoView({ behavior: "smooth" });
});
/*----------- End Heading text_Button Scroll -----------*/

///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////

/*----------- Start Navigation Links Scroll -----------*/
// Using --event delegation-- to write only one function in the parent element that applied to all child links with propagation (more efficient)
const navLinks = document.querySelector(".nav__links");
navLinks.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    e.target.classList.contains("nav__link") &&
    !e.target.classList.contains("nav__link--btn")
  ) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

/* or using  (scroll-behavior: smooth;)  at css file :) :) */
/*----------- End Navigation Links Scroll -----------*/

///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////

/*----------- Start Navigation link hover effect -----------*/
// Using Event delegation
const nav = document.querySelector(".nav");
const navLogo = document.querySelector(".nav__logo");
const navLinksList = document.querySelectorAll(".nav__link");

const handleLinkHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    // console.log(this); // this = opacity that send as argument
    navLogo.style.opacity = this;
    navLinksList.forEach((link) => {
      if (link !== e.target) link.style.opacity = this;
    });
  }
};

// how we can passing an argument to function in eventListener
nav.addEventListener("mouseover", handleLinkHover.bind(0.5));
nav.addEventListener("mouseout", handleLinkHover.bind(1));

// nice solution Also  -put opacity as parameter in the function
// nav.addEventListener("mouseover", (e) => {
//   handleLinkHover(e, 0.5);
// });
// nav.addEventListener("mouseout", (e) => {
//   handleLinkHover(e, 1);
// });

/*----------- End Navigation link hover effect -----------*/

///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////

/*----------- Start Sticky Navigation -----------*/
// const header = document.querySelector(".header");
// const section_1 = document.querySelector("#section--1");

// // Bad Performance :(  عشان كل ما تعمل سكرول هيتنفذ ال ايفنت
// window.addEventListener("scroll", (e) => {
//   const initialCoords = section_1.getBoundingClientRect();
//   if (window.scrollY >= initialCoords.top) {
//     header.classList.add("sticky");
//   } else {
//     header.classList.remove("sticky");
//   }
// });

// Implemetn it using The Intersection Observer API.
const landing = document.querySelector(".landing");
const header = document.querySelector(".header");

const stickyNav = function (entries) {
  entries.forEach((entry) => {
    // console.log(entry);
    // console.log(entry.isIntersecting);
    if (!entry.isIntersecting) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });
};
const obsOptions = {
  root: null,
  threshold: 0,
};

const landingObserver = new IntersectionObserver(stickyNav, obsOptions);
landingObserver.observe(landing);
/*----------- End Sticky Navigation -----------*/

///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////

/*---------- Start Revealing section on scroll ----------*/
//Implemetn it using The Intersection Observer API.
const allSections = document.querySelectorAll(".section");

const sectionRevealing = function (entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // console.log("true");
      entry.target.classList.remove("section--hidden");
      observer.unobserve(entry.target); // for performance
    }
  });
};
const obsOptions_2 = {
  root: null,
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(
  sectionRevealing,
  obsOptions_2
);
allSections.forEach((sec) => {
  sec.classList.add("section--hidden");
  sectionObserver.observe(sec);
});
/*---------- End Revealing section on scroll ----------*/

///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////

/* Start Lazy loading Images (Important for Website Performance)*/
//Implemetn it using The Intersection Observer API.
// features__container
// feature
// img
// 1 - Replace src attribute with data-src
// 2 - remove lazy-img class

const featureImages = document.querySelectorAll(".feature img");

const imageLoading = function (entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Replace src attribute with data-src
      const newImageUrl = entry.target.dataset.src;
      entry.target.setAttribute("src", newImageUrl);
      // remove lazy-img class after complete loading image (work done behind the scenes)
      entry.target.addEventListener("load", function () {
        entry.target.classList.remove("lazy-img");
      });
      observer.unobserve(entry.target);
    }
  });
};
const obsOptions_3 = {
  root: null,
  threshold: 1,
};

const Imagesobserver = new IntersectionObserver(imageLoading, obsOptions_3);
featureImages.forEach((image) => {
  Imagesobserver.observe(image);
});
/* End Lazy loading Images*/

///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////

/*----------- Start Tabbed Component at section--2 -----------*/
const tabs = document.querySelectorAll(".operation__tab");
const tabsContainer = document.querySelector(".operations__tabs--container");
const operationsContentents = document.querySelectorAll(".operations__content");

const removeActiveClass = function (elements, className) {
  elements.forEach((element) => element.classList.remove(className));
};

const addActiveClass = function (element, className) {
  element.classList.add(className);
};

// Using Event delegation
// attach the event handler only on one parent element
tabsContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(`.operation__tab`); // even if clicked span element it works
  if (clicked) {
    if (
      clicked.classList.contains("operation__tab") &&
      !clicked.classList.contains("operation__tab--active")
    ) {
      // handle Taps
      removeActiveClass(tabs, "operation__tab--active");
      addActiveClass(clicked, "operation__tab--active");
      const tabNumber = clicked.dataset.tab; // return (data-tap)
      // console.log(tabNumber);
      // console.log(tabs);

      // handle operations content
      removeActiveClass(operationsContentents, "operations__content--active");
      const contententNumber = document.querySelector(
        `.operations__content--${tabNumber}`
      );
      addActiveClass(contententNumber, "operations__content--active");
      // console.log(operationsContentents);
    }
  }
});
/*----------- End Tabbed Component at section--2 -----------*/

///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////

/* Start Building a Slider at section--3 */

const slides = document.querySelectorAll(".slide");
const sliderBtnRight = document.querySelector(".slider__btn--right");
const sliderBtnLeft = document.querySelector(".slider__btn--left");
const dotsContainer = document.querySelector(".dots");

let currSlide = 0;
const maxSlides = slides.length;

const createSlides = function (slide) {
  // 0% 100% 200%
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
createSlides(0);

const createDots = function () {
  for (let i = 0; i < maxSlides; i++) {
    let dotHTML = `<button class="dot" data-slide=${i}></button>`;
    dotsContainer.insertAdjacentHTML("beforeend", dotHTML);
  }
};
createDots();

const activeDots = function (slide) {
  document.querySelectorAll(".dot").forEach((d) => {
    d.classList.remove("dot__active");
  });
  document
    .querySelector(`.dot[data-slide="${slide}"]`)
    .classList.add("dot__active");
};
activeDots(0);

const nextSlide = function () {
  if (currSlide >= maxSlides - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  createSlides(currSlide);
  activeDots(currSlide);
};

const previousSlide = function () {
  if (currSlide === 0) {
    currSlide = maxSlides - 1;
  } else {
    currSlide--;
  }
  createSlides(currSlide);
  activeDots(currSlide);
};

//////////////////////Events Handler/////////////////////////
// Next Slide
sliderBtnRight.addEventListener("click", nextSlide);
// Previous Slide
sliderBtnLeft.addEventListener("click", previousSlide);

// Keyboard handle
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    nextSlide();
  }
  if (e.key === "ArrowLeft") {
    previousSlide();
  }
});

// Dots handle
dotsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("dot")) {
    const slideShow = e.target.dataset.slide;
    createSlides(slideShow);
    activeDots(slideShow);
    currSlide = slideShow;
  }
});

/* End Building a Slider at section--3 */

///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////

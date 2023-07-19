"use strict";

// DOM API METHODS Referrance
///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////

// Selecting Elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

//////////////Uisng This Methods All the Time///////////////////
const headerEL = document.querySelector(".header");
console.log(headerEL);
const sectionsList = document.querySelectorAll(".section");
console.log(sectionsList); // Returns a Node List
///////////////////////////////////////

const sectionEL = document.getElementById("section--1");
console.log(sectionEL);
const allButtons = document.getElementsByTagName("button");
console.log(allButtons); // Returns a Html Collection -- Live collection update if any DOM change occur
const btns = document.getElementsByClassName("btn");
console.log(btns);

///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////

// Creating and Inserting Elements
//.insertAdjacentHTML (easy method)
/* 
containerMovements.insertAdjacentHTML("afterbegin", rowHtml); from Dispaly Movments Function at Bankist Project
rowHtml => Is a String variable stores Html code
*/

// or creating element from scratch
const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML =
  'We use cookies for improved functionality and analytics.  <button class="btn btn__cookie--close">Got it!</button>';
console.log(message);
const headerElement = document.querySelector(".header");
// headerElement.append(message); // insert this new elemetn at bottom
// headerElement.prepend(message);
// headerElement.after(message);
// headerElement.before(message);

///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////

// Deleting Elements
/*
const btnCloseCookie = document.querySelector(".btn__cookie--close");
btnCloseCookie.addEventListener("click", () => {
  // message.remove();
  message.classList.add("hidden"); // not deleted the element but make nice transition
});
*/
///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////
///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////
///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////

// Styles
message.style.backgroundColor = "#37383d";
message.style.setProperty("background-color", "#37383d"); //or this method

console.log(message.style.backgroundColor);
console.log(message.style.height); // only read Inline Styles
console.log(message.style.color); // only read Inline Styles

console.log(getComputedStyle(message)); // get all Styles
console.log(getComputedStyle(message).height);
console.log(getComputedStyle(message).color);

// Change :root Variables styles (at documentElement)
// document.documentElement.style.setProperty("--color-primary", "darkorange");

///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////

//Attributes
const logo = document.querySelector(".logo");
console.log(logo.getAttribute("src"));
console.log(logo.getAttribute("alt"));

logo.setAttribute("alt", "Bankist Awesome Logo 2022");
console.log(logo.getAttribute("alt"));

// data attributes
console.log(logo.dataset.versionNumber);
logo.dataset.versionNumber = "4.5";
console.log(logo.dataset.versionNumber);

///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////

// Clases
// logo.classList.add();
// logo.classList.remove();
// logo.classList.toggle();
// logo.classList.contains();

///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////
///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////
///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////

// Events and Event Handlers
// https://developer.mozilla.org/en-US/docs/Web/Events
const h1 = document.querySelector(".landing__title h1");
const alertH1 = (e) => {
  alert(`Great! you are reading the heading :D`);

  h1.removeEventListener("mouseenter", alertH1); // remove this event after occur once.
};

// h1.addEventListener("mouseenter", alertH1); // add event when hover on h1

///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////

// Event Propagationانتشار او توالد   Bubbling and Capturing
const randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const randomColor = function () {
  return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
};

/*
const navLink = document.querySelector(".nav__link");
navLink.addEventListener("mouseenter", (e) => {
  navLink.style.backgroundColor = randomColor();

  // to stop Propagation
  // e.stopPropagation();
});

const navLinks = document.querySelector(".nav__links");
navLinks.addEventListener("mouseenter", () => {
  navLinks.style.backgroundColor = randomColor();
});

const nav = document.querySelector(".nav");
nav.addEventListener("mouseenter", () => {
  nav.style.backgroundColor = randomColor();
});
*/
console.log("-------------------------");
console.log("-------------------------");
///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////
///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////
///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////

// DOM Traversing
const H1 = document.querySelector("h1");

// going downwards: Childs
console.log(H1.querySelectorAll(".highlight"));
console.log(H1.childNodes); // all nodes in this element
console.log(H1.children); // best
console.log(H1.firstElementChild);
console.log(H1.lastElementChild);
// H1.firstElementChild.style.color = "blue";
// H1.lastElementChild.style.color = "orange";

// going upwards: Parents
console.log(H1.parentNode);
console.log(H1.parentElement);

H1.closest(".header"); // ooposite of querySelector (select parents)
// H1.closest(".header").style.background = "var( --gradient-secondary)";

// going Sideways: Siblings
console.log(h1.previousElementSibling); // no sibilings before it
console.log(h1.nextElementSibling);

console.log(h1.parentElement.children); // nice trick to get all sibilings as HTML Collections

console.log([...h1.parentElement.children]); // convert it to an Array

///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////
///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////
///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////

// Implemetn Sticky Navigation using The Intersection Observer رصدAPI
/*
const section_1 = document.querySelector("#section--1");

const obsCallback = function (entries, observer) {
  entries.forEach((entry) => {
    console.log(entry);
  });
};
const obsOptions = {
  root: null,
  threshold: 0.1,
};

const observer = new IntersectionObserver(obsCallback, obsOptions);

observer.observe(section_1);
*/

///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////
///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////
///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////

// Lifecycle DOM Events

// After only html and JS loaded
// document.addEventListener("DOMContentLoaded", (e) => {
//   console.log(`HTML AND JS Files Loaded Successfully `);
//   console.log(e);
// });

// After All Files Loaded (images , css files and other )
// document.addEventListener("load", (e) => {
//   console.log("All Page Files are Loaded successfully ");
//   console.log(e);
// });

// Ask user if he was sure to leave this page
// document.addEventListener("beforeunload", (e) => {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = " ";
// });

///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////
///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////
///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////

// Different Ways to loade a JS file into HTML (PDF page 149)
/*

1 - Regular way => at the end of <body> without any attribute
    - Scripts are fetched and executed after the HTML is completely parsed
    - Use if you need to support old browsers

2 - using Async attributes in <head>
    - Scripts are fetched asynchronously and executed immediately
    - Use for 3rd-party scripts where order doesn’t matter (e.g. Google Analytics)
    - use async with any code that my code will not interact with 

3 - using Defer attributes in <head> (The Best Technique)
    - Scripts are fetched asynchronously andexecuted after the HTML is completely parsed
    - This is overall the best solution! Use for your own scripts, and when order matters (e.g. including a library)

*/
///////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////

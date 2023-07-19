"use strict";

/* --------------- Start Toggle Button --------------- */
const toggleBtn = document.querySelector(".theme__toggle--btn");
const rootDocument = document.documentElement;

toggleBtn.addEventListener("click", (e) => {
  if (rootDocument.classList.contains("dark")) {
    rootDocument.classList.remove("dark");
    rootDocument.style.setProperty("--color-primary", "#000");
    e.target.style.color = "#fff";
    e.target.innerHTML = "Dark Mode";
  } else {
    rootDocument.classList.add("dark");
    rootDocument.style.setProperty("--color-primary", "#fff");
    toggleBtn.style.color = "#333";
    e.target.innerHTML = "Light Mode";
  }
});
/* --------------- End Toggle Button --------------- */

/* --------------- Start Clock Animation --------------- */
const timeEl = document.querySelector(".time");
const dateEl = document.querySelector(".date");
const hourNeedleEl = document.querySelector(".hour");
const minuteNeedleEl = document.querySelector(".minute");
const secondNeedleEl = document.querySelector(".second");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let i = 10;
const getTime = function () {
  const now = new Date();
  const monthIndex = now.getMonth();
  const dayIndex = now.getDay();
  const day = String(now.getDate()).padStart(2, 0);
  const hours = String(now.getHours() % 12).padStart(2, 0);
  const type = `${now.getHours() >= 12 ? "PM" : "AM"}`;
  const minutes = String(now.getMinutes()).padStart(2, 0);
  const seconds = now.getSeconds();
  /////////////////////////////////////
  //////////////////////////////////
  /////////////////////////////
  timeEl.innerHTML = `${hours}:${minutes} ${type}`;
  dateEl.innerHTML = `${days[dayIndex]}, ${months[monthIndex]} <span class="day__circle">${day}</span>`;
  /////////////////////////////////////
  //////////////////////////////////
  /////////////////////////////
  hourNeedleEl.style.transform = `translate(-50%, -100%) rotate(${scale(
    hours,
    0,
    12,
    0,
    360
  )}deg)`;
  minuteNeedleEl.style.transform = `translate(-50%, -100%) rotate(${scale(
    minutes,
    0,
    60,
    0,
    360
  )}deg)`;
  secondNeedleEl.style.transform = `translate(-50%, -100%) rotate(${scale(
    seconds,
    0,
    60,
    0,
    360
  )}deg)`;
  console.log(secondNeedleEl);
};

// StackOverflow https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function scale(num, in_min, in_max, out_min, out_max) {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

getTime();
setInterval(getTime, 1000);

/* --------------- End Clock Animation --------------- */

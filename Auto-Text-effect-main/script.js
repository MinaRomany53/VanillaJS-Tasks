"use strict";

const textEl = document.querySelector(".heading");
const speedInputEl = document.querySelector(".box__input");

const text = `"Leo Messi" Is The Best Player In The World.`;
let index = 1;
let speed = 300 / speedInputEl.value;

const write = function () {
  textEl.innerHTML =
    text.slice(0, index) + `<span class = "heading__cursor">|</span>`;
  index++;
  if (index > text.length) {
    index = 0;
  }
  setTimeout(write, speed);
};

write();

speedInputEl.addEventListener("input", (e) => {
  if (
    speedInputEl.value &&
    speedInputEl.value <= 5 &&
    speedInputEl.value >= 1
  ) {
    speed = 300 / speedInputEl.value;
  }
});

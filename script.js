"use strict";

window.addEventListener("DOMContentLoaded", getUserInput);

let userInput = document.querySelector(".color_picker");

function getUserInput() {
  document.querySelector(".color_picker").addEventListener("input", colorBox);
}

function colorBox() {
  console.log("colorBox");

  let hex = userInput.value;
  document.querySelector(".color_box").style.backgroundColor = hex;

  document.querySelector(".hexfield").textContent = hex;
  hexToRbgConverter(hex);
}

function hexToRbgConverter(hexCode) {
  const hexR = hexCode.substring(1, 3);
  const r = parseInt(hexR, 16);
  const hexG = hexCode.substring(3, 5);
  const g = parseInt(hexG, 16);
  const hexB = hexCode.substring(5, 7);
  const b = parseInt(hexB, 16);

  document.querySelector(".rgbfield").textContent = `${r}, ${g}, ${b}`;
  rbgToHslConverter(r, g, b);
}

function rbgToHslConverter(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  document.querySelector(".hslfield").textContent = `${h}, ${s}, ${l}`;
  console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
}

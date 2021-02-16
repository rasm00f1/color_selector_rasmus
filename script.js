"use strict";

window.addEventListener("DOMContentLoaded", getUserInput);

function getUserInput() {
  document.querySelector(".color_picker").addEventListener("input", colorBox);
  const input = document.querySelector(".color_picker");
  return input.value;
}

function colorBox() {
  const hex = getUserInput();
  displayColor(hex);
  displayHex(hex);

  const rgbObject = hexToRbgConverter(hex);
  displayRGB(rgbObject);

  const hslObject = rbgToHslConverter(rgbObject.r, rgbObject.g, rgbObject.b);
  displayHSL(hslObject);

  //just a test
  const hex2 = rgbToHexConverter(rgbObject);
  console.log(hex2);
}

function hexToRbgConverter(hexCode) {
  const hexR = hexCode.substring(1, 3);
  const r = parseInt(hexR, 16);
  const hexG = hexCode.substring(3, 5);
  const g = parseInt(hexG, 16);
  const hexB = hexCode.substring(5, 7);
  const b = parseInt(hexB, 16);

  return { r, g, b };
}

function rgbToHexConverter(rgbObject) {
  let hexR = rgbObject.r.toString(16);
  let hexG = rgbObject.g.toString(16);
  let hexB = rgbObject.b.toString(16);

  if (hexR.length < 2) {
    hexR = "0" + hexR;
  }
  if (hexG.length < 2) {
    hexG = "0" + hexG;
  }
  if (hexB.length < 2) {
    hexB = "0" + hexB;
  }

  return "#" + hexR + hexG + hexB;
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

  console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing

  return { h, s, l };
}

function rgbToCSS(rgbObject) {
  const cssString = `rgb(${rgbObject.r}, ${rgbObject.g}, ${rgbObject.b})`;
  return cssString;
}

function displayColor(hex) {
  document.querySelector(".color_box").style.backgroundColor = hex;
}

function displayHex(hex) {
  document.querySelector(".hexfield").textContent = hex;
}

function displayRGB(rgbObject) {
  document.querySelector(".rgbfield").textContent = `${rgbObject.r}, ${rgbObject.g}, ${rgbObject.b}`;
}

function displayHSL(hslObject) {
  document.querySelector(".hslfield").textContent = `${hslObject.h.toFixed(0)}, ${hslObject.s.toFixed(0)}, ${hslObject.l.toFixed(0)}`;
}

"use strict";

window.addEventListener("DOMContentLoaded", getUserInput);

function getUserInput() {
  document.querySelector(".color_picker").addEventListener("input", handleUserInput);
}

function handleUserInput(event) {
  const color = event.target.value;
  colorBox(color);
}

function colorBox(color) {
  const rgbObject = hexToRbgConverter(color);

  const hslObject = rbgToHslConverter(rgbObject.r, rgbObject.g, rgbObject.b);

  const hslArray = getHarmony(hslObject);

  let n;

  hslArray.forEach((element) => {
    // Sending the index of the curren element
    n = hslArray.indexOf(element) + 1;
    // Displays the harmonies hsl values
    displayHSL(element, n);

    // Converts the hsl to rgb
    let rgbElement = hslToRgbConverter(element);
    displayRGB(rgbElement, n);

    let hexElement = rgbToHexConverter(rgbElement);
    displayHex(hexElement, n);

    displayColor(hexElement, n);
  });
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

function hslToRgbConverter(hslObject) {
  const h = hslObject.h;
  const s = hslObject.s / 100;
  const l = hslObject.l / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
}

function rgbToCSS(rgbObject) {
  const cssString = `rgb(${rgbObject.r}, ${rgbObject.g}, ${rgbObject.b})`;
  return cssString;
}

function getHarmony(hslObject) {
  //styrer den valgte harmony i selecten.
  let select = document.querySelector("#harmony_menu");
  let selectedValue = select.value;

  let hslArray;

  if (selectedValue === "analogous") {
    hslArray = calculateAnalogue(hslObject);
  } else if (selectedValue === "monochromatic") {
    hslArray = calculateMonochromatic(hslObject);
  } else if (selectedValue === "triad") {
    hslArray = calculateTriad(hslObject);
  } else if (selectedValue === "complementary") {
    hslArray = calculateComplementary(hslObject);
  } else if (selectedValue === "compound") {
    hslArray = calculateCompound(hslObject);
  } else if (selectedValue === "shades") {
    hslArray = calculateShades(hslObject);
  }

  // loop through hslObject of array, to make sure no values are negative
  hslArray.forEach((hslObject) => {
    if (hslObject.h < 0) {
      hslObject.h = hslObject.h + 360;
    }
    if (hslObject.h > 360) {
      hslObject.h = hslObject.h - 360;
    }
    if (hslObject.l < 0) {
      hslObject.l = hslObject.l + 360;
    }
    if (hslObject.l > 360) {
      hslObject.l = hslObject.l - 360;
    }
    if (hslObject.s < 0) {
      hslObject.s = hslObject.s + 360;
    }
    if (hslObject.s > 360) {
      hslObject.s = hslObject.s - 360;
    }
  });
  return hslArray;
}

function calculateAnalogue(hslObject) {
  let hslArray = new Array(5);
  let hValue = -40;

  for (let i = 0; i < hslArray.length; i++) {
    hslArray[i] = { h: hslObject.h + hValue, s: hslObject.s, l: hslObject.l };
    hValue += 20;
  }

  return hslArray;
}

function calculateMonochromatic(hslObject) {
  let hslArray = new Array(5);
  let lValue = -20;

  for (let i = 0; i < hslArray.length; i++) {
    hslArray[i] = { h: hslObject.h, s: hslObject.s, l: hslObject.l + lValue };
    lValue += 15;
  }

  return hslArray;
}

function calculateTriad(hslObject) {
  let hslArray = new Array(3);

  for (let i = 0; i < hslArray.length; i++) {
    hslArray[0] = { h: hslObject.h + 60, s: hslObject.s, l: hslObject.l };
    hslArray[1] = { h: hslObject.h + 60, s: hslObject.s, l: hslObject.l };
    hslArray[2] = { h: hslObject.h, s: hslObject.s, l: hslObject.l };
    hslArray[3] = { h: hslObject.h - 60, s: hslObject.s, l: hslObject.l };
    hslArray[4] = { h: hslObject.h - 60, s: hslObject.s, l: hslObject.l };
  }

  return hslArray;
}

function calculateComplementary(hslObject) {
  let hslArray = new Array(5);

  for (let i = 0; i < hslArray.length; i++) {
    hslArray[0] = { h: hslObject.h, s: hslObject.s, l: hslObject.l + 10 };
    hslArray[1] = { h: hslObject.h, s: hslObject.s, l: hslObject.l + 20 };
    hslArray[2] = { h: hslObject.h, s: hslObject.s, l: hslObject.l };
    hslArray[3] = { h: hslObject.h + 180, s: hslObject.s, l: hslObject.l };
    hslArray[4] = { h: hslObject.h + 180, s: hslObject.s, l: hslObject.l - 10 };
  }

  return hslArray;
}

function calculateCompound(hslObject) {
  let hslArray = new Array(5);
  let hValue = -40;

  for (let i = 0; i < hslArray.length; i++) {
    hslArray[i] = { h: hslObject.h + hValue, s: hslObject.s, l: hslObject.l };
    hValue += 20;
    hslArray[1] = { h: hslObject.h + 180, s: hslObject.s, l: hslObject.l };
  }

  return hslArray;
}

function calculateShades(hslObject) {
  let hslArray = new Array(5);

  for (let i = 0; i < hslArray.length; i++) {
    hslArray[0] = { h: hslObject.h, s: hslObject.s, l: hslObject.l + 10 };
    hslArray[1] = { h: hslObject.h, s: hslObject.s, l: hslObject.l - 20 };
    hslArray[2] = { h: hslObject.h, s: hslObject.s, l: hslObject.l };
    hslArray[3] = { h: hslObject.h, s: hslObject.s, l: hslObject.l - 10 };
    hslArray[4] = { h: hslObject.h, s: hslObject.s, l: hslObject.l + 20 };
  }
  return hslArray;
}

function displayColor(hex, index) {
  document.querySelector(`.color_${index} .color_box`).style.backgroundColor = hex;
}

function displayHex(hex, index) {
  document.querySelector(`.color_${index} .color_text .hexfield`).textContent = hex;
}

function displayRGB(rgbObject, index) {
  document.querySelector(`.color_${index} .color_text .rgbfield`).textContent = `${rgbObject.r}, ${rgbObject.g}, ${rgbObject.b}`;
}

function displayHSL(hslObject, index) {
  document.querySelector(`.color_${index} .color_text .hslfield`).textContent = `${hslObject.h.toFixed(0)}, ${hslObject.s.toFixed(0)}%, ${hslObject.l.toFixed(0)}%`;
}

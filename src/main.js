import { setYear } from "./js/set-year.js";
import { animateImagesOnLoad } from "./js/animate-lazy-load-img.js";
// import { setRandomBackground, getContrastingColor } from './js/g et-colors.js';
// import { imageNavigation } from "./js/image-navigation.js";

document.addEventListener("DOMContentLoaded", function () {
    // setRandomBackground();
    // getContrastingColor();
    // imageNavigation();
    animateImagesOnLoad();
    setYear();
});

// const loader = document.querySelector("#loader");
// window.addEventListener("load", function() {
//     if (loader) {
//         loader.classList.add('done');
//     }
// });
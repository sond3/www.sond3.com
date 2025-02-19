import { setYear } from "./js/set-year.js";
// import { setRandomBackground, getContrastingColor } from './js/g et-colors.js';
import { copyImageToInfo } from "./js/image-follow.js";
import { imageNavigation } from "./js/image-navigation.js";
import { animateImagesOnLoad } from "./js/animate-lazy-load-img.js";

document.addEventListener("DOMContentLoaded", function () {
    // setRandomBackground();
    // getContrastingColor();
    animateImagesOnLoad();
    imageNavigation();
    copyImageToInfo();
    setYear();
});

// const loader = document.querySelector("#loader");
// window.addEventListener("load", function() {
//     if (loader) {
//         loader.classList.add('done');
//     }
// });
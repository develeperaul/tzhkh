// import "virtual:svg-icons-register";
console.log("sss");
import "animate.css";

import "./marguee.js";

import "./animation.js";
import "./select.js";
import "./accordeon.js";
import "./stepper.js";
import "./sidebar.js";
import "./tabs.js";

// import "swiper/css/bundle";

// import "swiper/swiper.min.css";
import Swiper from "swiper";
import { EffectFade, Navigation, Pagination, FreeMode } from "swiper/modules";
document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".home-slider", {
    modules: [EffectFade, Navigation, FreeMode],

    // freeMode: true,
    centeredSlides: true,
    loop: true,
    spaceBetween: 8,
    navigation: {
      nextEl: ".next",
      prevEl: ".prev",
    },
  });

  new Swiper(".history-slider", {
    modules: [EffectFade, Navigation, Pagination, FreeMode],
    slidesPerView: 1.2,
    // freeMode: true,
    centeredSlides: true,
    loop: true,
    spaceBetween: 8,
    init: true,
    autoHeight: false,
    // fadeEffect: {
    //   crossFade: true,
    // },
    breakpoints: {
      1024: {
        spaceBetween: 32,
        slidesPerView: 1.4,
        autoHeight: false,
      },
    },
    navigation: {
      nextEl: ".next",
      prevEl: ".prev",
    },
  });
});

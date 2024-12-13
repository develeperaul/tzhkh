// import "virtual:svg-icons-register";
import "animate.css";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

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
import {
  EffectFade,
  Navigation,
  Pagination,
  FreeMode,
  Autoplay,
} from "swiper/modules";
document.addEventListener("DOMContentLoaded", () => {
  const info = document.querySelector("#info");
  if (info) {
    if (!window.localStorage.getItem("info")) {
      info.classList.add("active");
      const btn = info.querySelector("button");
      if (btn) {
        btn.onclick = () => {
          window.localStorage.setItem("info", "1");
          info.classList.remove("active");
        };
      }
    }
  }

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

  new Swiper(".general-slider", {
    modules: [EffectFade, Navigation, Pagination, Autoplay],
    effect: "fade",
    autoHeight: true,
    autoplay: {
      delay: 10000,
    },
    loop: true,
    fadeEffect: {
      crossFade: true,
    },
    breakpoints: {
      1024: {
        autoHeight: false,
      },
    },
    navigation: {
      nextEl: ".btn-next",
      prevEl: ".btn-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
  });

  Fancybox.bind("[data-fancybox]", {
    // Your custom options
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabs");
  if (tabs && tabs.length > 0) {
    [...tabs].forEach((tab) => {
      const btns = tab.querySelectorAll("[data-target]");
      if (btns && btns.length > 0) {
        [...btns].forEach((btn) => {
          btn.onclick = clicktTab.bind(null, btn, btns);
        });
      }
    });
  }

  function clicktTab(_this, btns, e) {
    btns.forEach((btn) => {
      if (btn.classList.contains("active") && _this != btn) {
        const idTarget = btn.getAttribute("data-target");
        if (idTarget) {
          btn.classList.remove(...["active"]);
          // btn.classList.add('btn-round');
          const targetActive = document.querySelector(`#${idTarget}`);
          if (targetActive) {
            targetActive.classList.remove("active");
          }
        }
      }
    });
    const idTarget = _this.getAttribute("data-target");
    if (idTarget) {
      const targetActive = document.querySelector(`#${idTarget}`);
      if (targetActive) {
        // _this.classList.remove('btn-round');
        _this.classList.add(...["active"]);
        targetActive.classList.add("active");
        // const swiper = targetActive.querySelector('.swiper').swiper;
        // if (swiper) {
        //   // swiper.enabled();

        //   swiper.slideToLoop(0);
        // }
      }
    }
  }
});

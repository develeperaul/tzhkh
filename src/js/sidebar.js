document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar__desc");

  let observer = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
      const btns = document.querySelector('[data-target="sidebar"]');
      if (
        mutation.target.classList.contains("active") ||
        mutation.target.classList.contains("open")
      ) {
        btns.classList.add("active");
      } else {
        btns.classList.remove("active");
      }
      if (mutation.target.classList.contains("animate__fadeOutLeft"))
        btns.classList.remove("active");
    }
  });
  observer.observe(document.querySelector(".sidebar"), {
    attributeFilter: ["class"],
  });
});

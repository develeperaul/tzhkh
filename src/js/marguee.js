document.addEventListener('DOMContentLoaded', () => {
  const lerp = (current, target, factor) =>
    current * (1 - factor) + target * factor;

  class LoopingText {
    constructor(el, direction = true) {
      this.el = el;
      this.direction = direction;
      this.lerp = { current: 0, target: 0 };
      this.interpolationFactor = 0.1;
      this.speed = 0.08;
      this.events();
      this.render();
    }

    events() {
      // window.addEventListener(
      //   "scroll",
      //   () => (this.lerp.target += this.speed * 5)
      // );
    }

    animate() {
      this.lerp.target += this.speed;
      this.lerp.current = lerp(
        this.lerp.current,
        this.lerp.target,
        this.interpolationFactor
      );

      if (this.lerp.target > 100) {
        this.lerp.current -= this.lerp.target;
        this.lerp.target = 0;
      }
      
      this.el.style.transform = this.direction
        ? `translateX(${this.lerp.current}%)`
        : `translateX(-${this.lerp.current}%)`;
    }

    render() {
      this.animate();
      window.requestAnimationFrame(() => this.render());
    }
  }

  document.querySelectorAll('.marquee__direction-container').forEach((el) => {
    if (el.classList.contains('left')) new LoopingText(el, false);
    else new LoopingText(el);
  });
});

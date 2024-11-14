document.addEventListener('DOMContentLoaded', () => {
  const accordeonList = document.querySelectorAll('.accordeon .item');
  if (accordeonList)
    [...accordeonList].forEach((item) => {
      const itemHead = item.querySelector('.item__head');
      itemHead.onclick = function (e) {
        const accordeon = closestParent(this, 'accordeon');
        if (this.parentNode.classList.contains('active')) {
          this.parentNode.classList.remove('active');
        } else {
          if (accordeon)
            [...accordeon.querySelectorAll('.item')].forEach((i) =>
              i.classList.remove('active')
            );
          this.parentNode.classList.add('active');
        }
      };
    });
  function closestParent(child, className) {
    if (!child || child == document) {
      return null;
    }
    if (child.classList.contains(className)) {
      return child;
    } else {
      return closestParent(child.parentNode, className);
    }
  }
});

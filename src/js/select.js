document.addEventListener('DOMContentLoaded', () => {
  const selects = document.querySelectorAll('.select ');
  [...selects].forEach((select) => {
    initSelect(select);
  });
});
let openSelect;
export function initSelect(select) {
  select.onclick = actionSelect;
  const initEl = select.querySelector('.select__options [data-init]');
  if (initEl) {
    const head = select.querySelector('.select__head');
    const input = select.querySelector('input');
    const val = initEl.dataset.val;
    setVal(initEl, head, input, val);
    // selectOpt()
    // selectOpt.bind(null, opt, head, options, this, null);
  }
}
function actionSelect(e) {
  const head = this.querySelector('.select__head');
  const body = this.querySelector('.select__body');
  
  let options;
  if (this.hasAttribute('data-sel')) {
    options = this.querySelectorAll('.select__options > *');
  }
  if (this.hasAttribute('data-sel2')) {
    options = this.querySelectorAll('.select__option-list > *');
  }

  const currentTarget = e.target;
  if (currentTarget === head) {
    if (this.classList.contains('active')) this.classList.remove('active');
    else {
      this.classList.add('active');
      [...options].forEach((opt) => {
        const optsChild = opt.querySelectorAll('.checkbox__childs > *');
        if (optsChild.length > 0) {
          [...optsChild].forEach(
            (optChild) =>
              (optChild.onclick = selectOpt.bind(
                null,
                optChild,
                head,
                optsChild,
                this,
                opt
              ))
          );
        }
        opt.onclick = selectOpt.bind(null, opt, head, options, this, null);
      });
      window.onclick = windowTarget.bind(null, this);
      setTimeout(() => (openSelect = this), 0);
    }
  }
}
function selectOpt(opt, head, options, _this, parentChild = null, e) {
  const val = opt.dataset.val;
  const input = _this.querySelector('input');
  const valcheck = opt.dataset.valcheck;
  if (val) {
    [...options].forEach((o) => {
      if (o !== opt && o.classList.contains('active'))
        o.classList.remove('active');
    });
    _this.classList.remove('active');
    setVal(opt, head, input, val);
    // opt.classList.add('active');
    // head.setAttribute('data-select', val);
    // input.value = val;
    // input.dispatchEvent(new Event('change'));
    // head.textContent = opt.textContent;
  }
  if (valcheck) {
    const checkboxInput = opt.querySelector('input');
    if (parentChild) {
      let check = false;
      const parentChildInput = parentChild.querySelector(
        'input[type="checkbox"]'
      );
      for (const o of [...options]) {
        const inputCheck = o.querySelector('input');
        if (!inputCheck.checked) {
          check = false;
          break;
        }
        check = true;
      }
      if (check) {
        parentChildInput.checked = true;
      } else {
        parentChildInput.checked = false;
      }

      // [...options].forEach(o=>{
      //   if()
      // })
    }
    if (checkboxInput.checked && !opt.classList.contains('active')) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
    checkboxInput.dispatchEvent(new Event('change'));
    // [...options].forEach((o) => {
    //   if (o !== opt && o.classList.contains('active'))
    //     o.classList.remove('active');
    // });
  }
  // else {
  //   console.log(opt);
  //   const checkboxInput = opt.querySelector('input');
  //   const optsChild = opt.querySelectorAll('.checkbox__childs > *');
  //   if (optsChild.length > 0) {
  //     [...optsChild].forEach(
  //       (optChild) => {
  //         const inp = optChild.querySelector('input');
  //         if (checkboxInput.checked) {
  //           if (!inp.checked) inp.checked = true;
  //           else inp.checked = false;
  //         }
  //       }
  //       // (optChild.onclick = selectOpt.bind(
  //       //   null,
  //       //   optChild,
  //       //   head,
  //       //   optsChild,
  //       //   this,
  //       //   opt
  //       // ))
  //     );
  //   }
  // }
}
function windowTarget(_this, e) {
  if (!e.composedPath().includes(_this)) {
    _this.classList.remove('active');
  } else if (openSelect && openSelect !== _this) {
    openSelect.classList.remove('active');
    openSelect = undefined;
  }
}

function setVal(opt, head, input, val) {
  opt.classList.add('active');
  head.setAttribute('data-select', val);
  input.value = val;
  input.dispatchEvent(new Event('change'));
  head.textContent = opt.textContent;
}

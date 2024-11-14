
document.addEventListener('DOMContentLoaded', () => {
  class Stepper {
    constructor(el) {
      this.el = el;
      this.currentSlide = 0;
      this.slideLength = 0;
      this.constraints = {};
      this.btnsContent = this.el.querySelectorAll('.stepper__btns');
      this.slides = this.el.querySelectorAll('.stepper__content-slide');
      this.progressList = this.el.querySelectorAll('.progresses .progress');
      
      
      this.stepperIsForm = this.el.tagName === 'FORM' ? true : false;
      
      // if (window.constraints[this.el.id]) {
      //   window.constraints[this.el.id].addEventListener('set', /.*/, (res) => {
      //     setTimeout(() => this.initial(), 0);
      //   });
      //   window.constraints[this.el.id].addEventListener(
      //     'delete',
      //     /.*/,
      //     (res) => {
      //       setTimeout(() => this.initial(), 0);
      //     }
      //   );
      // }
      this.initial('first');
    }
    initial(first) {
      if (this.slides) this.slideLength = this.slides.length;
      
      if (this.progressList[this.currentSlide])
          this.progressList[this.currentSlide].classList.add('active');
      // if (this.stepperIsForm) {
      //   this.constraints = this.el?.id
      //     ? window.constraints[this.el.id].data
      //     : {};
      // }
      [...this.slides].forEach((slide, index) => {
        if (index !== 0 && first)
          slide.classList.add('stepper__content-slide--hide');
        // if(!first)
        const currentConstraints = {};
        if (this.stepperIsForm) {
          const inputsName = [];
          const inputs = slide.querySelectorAll('input, textarea');
          [...inputs].forEach((inpt) => {
            inputsName.push(inpt.name);
          });
          for (let key in this.constraints) {
            if (inputsName.includes(key)) {
              currentConstraints[key] = this.constraints[key];
            }
          }

          
          let buttonNext;

          if (this.slideLength > 0) {
            if (index === 0) {
              buttonNext = this.el.querySelector(
                '.stepper__btns[data-step="first"] .btn-next'
              );
              
            } else
              buttonNext = this.el.querySelector(
                '.stepper__btns:not([data-step="first"]) .btn-next'
              );

            // if (!first && index === this.currentSlide)
            //   this.checkInvalid(buttonNext, errors);
          }

          // for (let i = 0; i < inputs.length; ++i) {
          //   inputs.item(i).addEventListener('change', (ev) => {
          //     // const errors = validate(this.el, currentConstraints) || {};

          //     // if (buttonNext) this.checkInvalid(buttonNext, errors);
          //   });
          // }
        }
      });

      [...this.btnsContent].forEach((btnContent) => {
        if (btnContent.dataset.step !== 'first' && first)
          btnContent.classList.add('stepper__btns-hidden');
        const btnBack = btnContent.querySelector('.btn-back');
        const btnNext = btnContent.querySelector('.btn-next');
        if (btnBack) {
          btnBack.onclick = this.back.bind(this);
        }
        if (btnNext) {
          btnNext.onclick = this.next.bind(this);
        }
      });
    }
    checkInvalid(btn, errors) {
      if (Object.keys(errors).length === 0) {
        btn.removeAttribute('disabled');
      } else {
        btn.setAttribute('disabled', true);
      }
    }
    back(e) {
      if (this.slides[this.currentSlide - 1]) {
        this.slides[this.currentSlide].classList.add(
          'stepper__content-slide--hide'
        );
        if (this.progressList[this.currentSlide])
          this.progressList[this.currentSlide].classList.remove('active');
        this.currentSlide--;
        [...this.btnsContent].forEach((btnContent) => {
          if (this.currentSlide === 0) {
            if (btnContent.dataset.step === 'first') {
              btnContent.classList.remove('stepper__btns-hidden');
            } else {
              if (!btnContent.classList.contains('stepper__btns-hidden'))
                btnContent.classList.add('stepper__btns-hidden');
            }
          }
          if (this.currentSlide > 0) {
            if (!btnContent.dataset.step) {
              btnContent.classList.remove('stepper__btns-hidden');
            } else {
              if (!btnContent.classList.contains('stepper__btns-hidden'))
                btnContent.classList.add('stepper__btns-hidden');
            }
          }
        });

        this.slides[this.currentSlide].classList.remove(
          'stepper__content-slide--hide'
        );
      }
    }
    next(e) {
      if (this.slides[this.currentSlide + 1]) {
        this.slides[this.currentSlide].classList.add(
          'stepper__content-slide--hide'
        );
        this.currentSlide++;

        const currentConstraints = {};
        if (this.stepperIsForm) {
          const inputsName = [];
          const inputs =
            this.slides[this.currentSlide].querySelectorAll('input, textarea');
          [...inputs].forEach((inpt) => {
            inputsName.push(inpt.name);
          });
          for (let key in this.constraints) {
            if (inputsName.includes(key)) {
              currentConstraints[key] = this.constraints[key];
            }
          }
          // const errors = validate(this.el, currentConstraints) || {};
          const buttonNext = this.el.querySelector(
            '.stepper__btns:not([data-step="first"]) .btn-next'
          );
          // this.checkInvalid(buttonNext, errors);
        }

        if (this.progressList[this.currentSlide])
          this.progressList[this.currentSlide].classList.add('active');
        if (this.currentSlide > 0) {
          [...this.btnsContent].forEach((btnContent) => {
            if (this.currentSlide === this.slideLength - 1) {
              if (btnContent.dataset.step === 'last') {
                btnContent.classList.remove('stepper__btns-hidden');
              } else btnContent.classList.add('stepper__btns-hidden');
            } else {
              if (btnContent.dataset.step === 'first') {
                btnContent.classList.add('stepper__btns-hidden');
              }
              if (!btnContent.dataset.step) {
                btnContent.classList.remove('stepper__btns-hidden');
                const btnNext = btnContent.querySelector('.btn-next');
                // if (btnNext) this.checkInvalid(btnNext, errors);
              } else {
                btnContent.classList.add('stepper__btns-hidden');
              }
            }
          });
        }

        this.slides[this.currentSlide].classList.remove(
          'stepper__content-slide--hide'
        );
      }
    }
  }

  const steppers = document.querySelectorAll('.stepper');
  [...steppers].forEach((stepper) => {
    new Stepper(stepper);
  });
});

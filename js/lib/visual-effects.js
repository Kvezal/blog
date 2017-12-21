const OPACITY_HIDDEN = 0;
const OPACITY_SHOWING = 1;


const INITIAL_DELAY = 20;


class VisialEffects {
  static showElement(tab, delay) {
    tab.style.opacity = OPACITY_HIDDEN;
    tab.style.transitionDuration = `${delay}ms`;

    window.setTimeout(() => {
      tab.style.opacity = OPACITY_SHOWING;
    }, INITIAL_DELAY);
  }


  static hideElement(modal, delay) {
    modal.style.transitionDuration = `${delay}ms`;
    modal.style.opacity = OPACITY_HIDDEN;
  }


  static showOpacity(items, speedShowing) {
    items.forEach((item, index) => {
      item.style.opacity = OPACITY_HIDDEN;
      item.style.transitionDuration = `750ms`;

      window.setTimeout(() => {
        item.style.opacity = OPACITY_SHOWING;
      }, INITIAL_DELAY + speedShowing * index);
    });
  }


  static showScaleOpacity(items, speedShowing) {
    items.forEach((item, index) => {
      item.style.opacity = OPACITY_HIDDEN;
      item.style.transform = `scale(0.3)`;
      item.style.transitionDuration = `750ms`;

      window.setTimeout(() => {
        item.style.opacity = OPACITY_SHOWING;
        item.style.transform = `scale(1)`;
      }, INITIAL_DELAY + speedShowing * index);
    });
  }


  static showTranslateOpacity(items, speedShowing) {
    items.forEach((item, index) => {
      item.style.opacity = OPACITY_HIDDEN;
      item.style.transitionDuration = `1000ms`;

      item.style.transform = (index % 2) ? `translate(-150px)` :
        `translate(150px)`;

      window.setTimeout(() => {
        item.style.opacity = OPACITY_SHOWING;
        item.style.transform = `translate(0)`;
      }, INITIAL_DELAY + speedShowing * index);
    });
  }


  static hideOpacity(items, speedShowing) {
    items.forEach((item, index) => {
      item.style.transitionDuration = `250ms`;

      window.setTimeout(() => {
        item.style.opacity = OPACITY_HIDDEN;
      }, INITIAL_DELAY + speedShowing * index);
    });
  }


  static hideScaleOpacity(items, speedShowing) {
    items.forEach((item, index) => {
      item.style.transitionDuration = `250ms`;

      window.setTimeout(() => {
        item.style.opacity = OPACITY_HIDDEN;
        item.style.transform = `scale(0.3)`;
      }, INITIAL_DELAY + speedShowing * index);
    });
  }


  static hideTranslateOpacity(items, speedShowing) {
    items.forEach((item, index) => {
      item.style.transitionDuration = `250ms`;

      window.setTimeout(() => {
        item.style.opacity = OPACITY_HIDDEN;

        item.style.transform = (index % 2) ? `translate(-100px)` :
          `translate(100px)`;
      }, INITIAL_DELAY + speedShowing * index);
    });
  }
}


export default VisialEffects;

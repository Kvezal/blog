const OPACITY_HIDDEN = 0;
const OPACITY_SHOWING = 1;


const INITIAL_DELAY = 20;


class VisialEffects {
  static showOpacity(items, speedShowing) {
    items.forEach((item, index) => {
      item.style.opacity = OPACITY_HIDDEN;
      item.style.transitionDuration = `.75s`;

      window.setTimeout(() => {
        item.style.opacity = OPACITY_SHOWING;
      }, INITIAL_DELAY + speedShowing * index);
    });
  }


  static showScaleOpacity(items, speedShowing) {
    items.forEach((item, index) => {
      item.style.opacity = OPACITY_HIDDEN;
      item.style.transform = `scale(0.3)`;
      item.style.transitionDuration = `.75s`;

      window.setTimeout(() => {
        item.style.opacity = OPACITY_SHOWING;
        item.style.transform = `scale(1)`;
      }, INITIAL_DELAY + speedShowing * index);
    });
  }


  static showTranslateOpacity(items, speedShowing) {
    items.forEach((item, index) => {
      item.style.opacity = OPACITY_HIDDEN;
      item.style.transitionDuration = `1s`;

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
      item.style.transitionDuration = `.25s`;

      window.setTimeout(() => {
        item.style.opacity = OPACITY_HIDDEN;
      }, INITIAL_DELAY + speedShowing * index);
    });
  }


  static hideScaleOpacity(items, speedShowing) {
    items.forEach((item, index) => {
      item.style.transitionDuration = `.25s`;

      window.setTimeout(() => {
        item.style.opacity = OPACITY_HIDDEN;
        item.style.transform = `scale(0.3)`;
      }, INITIAL_DELAY + speedShowing * index);
    });
  }


  static hideTranslateOpacity(items, speedShowing) {
    items.forEach((item, index) => {
      item.style.transitionDuration = `.25s`;

      window.setTimeout(() => {
        item.style.opacity = OPACITY_HIDDEN;

        item.style.transform = (index % 2) ? `translate(-100px)` :
          `translate(100px)`;
      }, INITIAL_DELAY + speedShowing * index);
    });
  }
}


export default VisialEffects;

const OPACITY_HIDDEN = 0;
const OPACITY_SHOWING = 1;


class VisialEffects {
  static showOpacity(items, speedShowing) {
    items.forEach((item, index) => {
      item.style.opacity = OPACITY_HIDDEN;
      item.style.transitionDuration = `.75s`;

      window.setTimeout(() => {
        item.style.opacity = OPACITY_SHOWING;
      }, speedShowing * index);
    });
  }


  static hideOpacity(items, speedShowing) {
    items.forEach((item, index) => {
      item.style.transitionDuration = `.25s`;

      window.setTimeout(() => {
        item.style.opacity = OPACITY_HIDDEN;
      }, speedShowing * index);
    });
  }
}


export default VisialEffects;

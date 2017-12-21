import ItemDescriptionView from '../views/item-description-view';

import Utils from '../lib/utils';
import {saveState} from '../lib/change-url';
import VisialEffects from '../lib/visual-effects';


const SCROLL_STEP = 26;
const START_SCROLL_ELEMENT = 0;
const MIN_WIDTH_BROWSER = 1000;
const KEY_CODE_ESC = 27;
const TIME_SHOWING_MODAL = 500;
const TIME_HIDING_MODAL = 250;

class ItemDescriptionPresenter {
  init(data, state, wrapper) {
    this.view = new ItemDescriptionView(data, state.currentTab);

    const closeDescription = () => {
      window.removeEventListener(`keydown`, btnCloseDescriptionKeyPressHandler);
      state.currentWindow = ``;
      saveState(state);

      VisialEffects.hideElement(this.view.description, TIME_HIDING_MODAL);
      VisialEffects.hideElement(this.view.overlay, TIME_HIDING_MODAL);

      window.setTimeout(() => {
        Utils.clearElement(wrapper);
      }, TIME_HIDING_MODAL);
    };


    const btnCloseDescriptionKeyPressHandler = (evt) => {
      if (evt.keyCode === KEY_CODE_ESC) {
        closeDescription();
      }
    };


    this.view.btnCloseDescriptionClickHandler = (evt) => {
      evt.preventDefault();
      closeDescription();
    };


    this.view.descriptionScroll = (evt) => {
      if (window.innerWidth < MIN_WIDTH_BROWSER) {
        return;
      }

      evt.preventDefault();

      const target = evt.currentTarget;

      if (target.classList.contains(`item-description`)) {
        const wrap = target.querySelector(`.item-description__wrap`);
        const top = +wrap.style.transform.replace(/[A-z]|\(|\)/g, ``);

        const descriptionParameters = this.getElementParameters({
          element: this.view.description,
          coordY: top,
          shift: evt.deltaY
        });

        const scrollBarHeight = this.view.scrollBar.clientHeight;
        const scrollHandl = this.view.scrollHandl;
        scrollHandl.style.height = `${scrollBarHeight * descriptionParameters.ratio}px`;

        if (descriptionParameters.height >= descriptionParameters.contentHeight) {
          wrap.style.transform = ``;
          scrollHandl.style.transform = ``;
          return;
        }

        const scrollRatio = scrollBarHeight / descriptionParameters.height;
        const shiftScrollHandl = -(scrollRatio * descriptionParameters.ratio * descriptionParameters.shiftContent);

        wrap.style.transform = `translateY(${descriptionParameters.shiftContent}px)`;
        scrollHandl.style.transform = `translateY(${shiftScrollHandl}px)`;
      }
    };


    window.addEventListener(`keydown`, btnCloseDescriptionKeyPressHandler);
    Utils.displayElement(this.view.element, wrapper);

    VisialEffects.showElement(this.view.description, TIME_SHOWING_MODAL);
    VisialEffects.showElement(this.view.overlay, TIME_SHOWING_MODAL);
  }

  getElementParameters(params) {
    const styleElement = getComputedStyle(params.element);
    const paddings = +styleElement.paddingTop.replace(/\D/g, ``) +
        +styleElement.paddingBottom.replace(/\D/g, ``);

    const height = params.element.clientHeight - paddings;
    const scrollHeight = params.element.scrollHeight;
    const contentHeight = scrollHeight - paddings;
    const scrollEnd = -(contentHeight - height);
    const ratio = height / contentHeight;

    let shiftContent = params.coordY + SCROLL_STEP;
    shiftContent = (shiftContent > START_SCROLL_ELEMENT) ? START_SCROLL_ELEMENT : shiftContent;
    shiftContent = (params.shift > 0) ? params.coordY - SCROLL_STEP : shiftContent;
    shiftContent = (shiftContent < scrollEnd) ? scrollEnd : shiftContent;

    return {
      height,
      contentHeight,
      shiftContent,
      ratio
    };
  }
}

export default new ItemDescriptionPresenter();

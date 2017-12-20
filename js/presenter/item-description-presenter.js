import ItemDescriptionView from '../views/item-description-view';

import Utils from '../lib/utils';
import {saveState} from '../lib/change-url';


const SCROLL_STEP = 26;
const START_SCROLL_ELEMENT = 0;
const MIN_WIDTH_BROWSER = 1000;

class ItemDescriptionPresenter {
  init(data, state, wrapper) {
    this.view = new ItemDescriptionView(data, state.currentTab);


    this.view.closeDescription = (evt) => {
      evt.preventDefault();

      state.currentWindow = ``;
      saveState(state);
      Utils.clearElement(wrapper);
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


    Utils.displayElement(this.view.element, wrapper);
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

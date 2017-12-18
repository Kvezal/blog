import App from '../application';
import MainNavView from '../views/main-nav-view';

import Utils from '../lib/utils';
import {saveState} from '../lib/change-url';

class MainNavPresenter {
  init(state) {
    this.view = new MainNavView(state);


    this.view.changeTab = (evt) => {
      evt.preventDefault();

      const tab = evt.target;

      if (tab.classList.contains(`main-nav__link--current`)) {
        return;
      }
      this.hideCurrentTab();

      tab.classList.add(`main-nav__link--current`);
      tab.removeAttribute(`href`);

      this.view.state.currentTab = tab.id;
      saveState(this.view.state);
      App.changeTab(this.view.state);
    };


    this.view.closeMenu = (evt) => {
      evt.preventDefault();

      const target = evt.target;

      if (target.classList.contains(`main-nav__btn--close`)) {
        target.classList.remove(`main-nav__btn--close`);
        this.view.mainNavItems.forEach((item) => {
          if (!item.firstElementChild.classList.contains(`main-nav__link--current`)) {
            item.classList.add(`main-nav__item--hidden`);
          } else {
            item.style.overflow = `hidden`;
          }
        });
        return;
      }
      target.classList.add(`main-nav__btn--close`);
      this.view.mainNavItems.forEach((item) => {
        if (!item.firstElementChild.classList.contains(`main-nav__link--current`)) {
          item.classList.remove(`main-nav__item--hidden`);
        } else {
          item.style.overflow = ``;
        }
      });
    };


    Utils.displayElement(this.view.element, `page-header`);
  }

  hideCurrentTab() {
    for (const tab of this.view.tabs) {
      if (tab.classList.contains(`main-nav__link--current`)) {
        tab.classList.remove(`main-nav__link--current`);
        tab.href = `#`;
        return;
      }
    }
  }
}

export default new MainNavPresenter();

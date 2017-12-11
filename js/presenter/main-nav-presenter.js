import MainNavView from '../views/main-nav-view';
import Utils from '../lib/utils';
import {saveState, loadState} from '../lib/change-url';

class MainNavPresenter {
  init() {
    const state = loadState();
    this.view = new MainNavView(state);

    this.view.changeTab = (evt) => {
      const currentState = loadState();

      evt.preventDefault();
      const tab = evt.target;

      if (tab.classList.contains(`main-nav__link--current`)) {
        return;
      }
      this.hideCurrentTab();

      tab.classList.add(`main-nav__link--current`);
      tab.removeAttribute(`href`);

      currentState.currentTab = tab.id;
      saveState(currentState);
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

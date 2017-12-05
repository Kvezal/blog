import App from '../application';
import MainNavView from '../views/main-nav-view';
import Utils from '../lib/utils';

class MainNavPresenter {
  init(state) {
    this.view = new MainNavView();

    this.view.changeTab = (evt) => {
      evt.preventDefault();
      const tab = evt.target;

      if (tab.classList.contains(`main-nav__link--current`)) {
        return;
      }
      this.hideCurrentTab();
      tab.classList.add(`main-nav__link--current`);
      tab.removeAttribute(`href`);
      state.currentTab = tab.id;
      App.changeTab(state);
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

import AbstractView from './abstract-view';
import {NAVIGATION_PARAMERETS} from '../data/parameters';

class MainNavView extends AbstractView {
  constructor(state) {
    super();

    this.state = state;
  }

  get template() {
    return (
      `<nav class="main-nav">
        <ul class="main-nav__list">
          ${this.templateNavigationItems}
        </ul>
        <button class="main-nav__close" type="button"></button>
      </nav>`
    );
  }

  get templateNavigationItems() {
    return NAVIGATION_PARAMERETS.map((item) => {
      const current = (this.state.currentTab === item.id) ? `main-nav__link--current` : ``;
      const href = (this.state.currentTab !== item.id) ? `href="#"` : ``;
      return (
        `<li class="main-nav__item">
          <a ${href} class="main-nav__link  ${current}" id="${item.id}">${item.name}</a>
        </li>`
      );
    }).join(``);
  }

  bind(element) {
    this.tabs = element.querySelectorAll(`.main-nav__link`);
    this.tabs.forEach((item) => {
      item.addEventListener(`click`, this.changeTab);
    });
  }
}

export default MainNavView;

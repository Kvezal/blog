import AbstractView from './abstract-view';

class MainNavView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return (
      `<nav class="main-nav">
        <ul class="main-nav__list">
          <li class="main-nav__item">
            <a href="" class="main-nav__link  main-nav__link--current" id="skills">Навыки</a>
          </li>
          <li class="main-nav__item">
            <a href="" class="main-nav__link" id="education">Образование</a>
          </li>
          <li class="main-nav__item">
            <a href="" class="main-nav__link" id="portfolio">Работы</a>
          </li>
          <li class="main-nav__item">
            <a href="" class="main-nav__link" id="blog">Блог</a>
          </li>
        </ul>
        <button class="main-nav__close" type="button"></button>
      </nav>`
    );
  }

  bind(element) {
    this.tabs = element.querySelectorAll(`.main-nav__link`);
    this.tabs.forEach((item) => {
      item.addEventListener(`click`, this.changeTab);
    });
  }
}

export default MainNavView;

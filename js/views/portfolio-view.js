import AbstractView from './abstract-view';
import PaginationPresenter from '../presenter/pagination-presenter';
import Utils from '../lib/utils';
import initialParameters from '../data/initial-parameters';

const ITEMS_ON_PAGE = 6;

class PortfolioView extends AbstractView {
  constructor(data, state) {
    super();

    this.data = data;
    this.state = state;
  }

  get template() {
    return (
      `<section class="portfolio">
        <section class="filter">
          <h2 class="filter__title">Фильтр:</h2>
          <fieldset class="filter__item">
            <legend class="filter__item-name">Сетка:</legend>
            <input type="radio" class="filter__radio" name="layout" id="fixed" checked>
            <label class="filter__label-radio" for="fixed">Фиксированная</label>
            <input type="radio" class="filter__radio" name="layout" id="adaptive">
            <label class="filter__label-radio" for="adaptive">Адаптивная</label>
          </fieldset>
          <fieldset class="filter__item">
            <legend class="filter__item-name">Технологии:</legend>
            <input type="checkbox" class="filter__check" name="preprocessor" id="preprocessor" checked>
            <label class="filter__label-check" for="preprocessor">Препроцессоры</label>
            <input type="checkbox" class="filter__check" name="js" id="js" checked>
            <label class="filter__label-check" for="js">JavaScript</label>
            <input type="checkbox" class="filter__check" name="svg" id="svg" checked>
            <label class="filter__label-check" for="svg">SVG</label>
            <input type="checkbox" class="filter__check" name="promise" id="promise" checked>
            <label class="filter__label-check" for="promise">Promise</label>
            <input type="checkbox" class="filter__check" name="spa" id="spa" checked>
            <label class="filter__label-check" for="spa">SPA</label>
          </fieldset>
        </section>
        <section class="works">
          <h1 class="works__title">Работы</h1>
          <ul class="works__list">
            ${this.templateList}
          </ul>
          <div class="pagination"></div>
        </section>
      </section>`
    );
  }

  getTemplateListItem(item) {
    return (
      `<li class="works__item">
        <p class="works__name">
          <span>${item.title}</span>
          &#8211; ${item.shortDescription}
        </p>
        <a class="btn" href="${item.link}">Перейти на сайт</a>
      </li>`
    );
  }

  get templateList() {
    const lastPage = this.state.currentPage + initialParameters.PAGE_BACK;
    const startItemPage = lastPage * ITEMS_ON_PAGE;
    const endItemPagethis = this.state.currentPage * ITEMS_ON_PAGE;

    return this.data.slice(startItemPage, endItemPagethis).map((item) => {
      return this.getTemplateListItem(item);
    }).join(``);
  }

  bind(element) {
    const pagination = element.querySelector(`.pagination`);
    const parameters = {
      amountDataItems: this.data.length,
      currentPage: this.state.currentPage,
      maxAmountItemsOnPage: ITEMS_ON_PAGE,
      oldElement: pagination
    };
    new PaginationPresenter().init(parameters);
  }
}

export default PortfolioView;

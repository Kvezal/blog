import AbstractView from './abstract-view';
import PaginationPresenter from '../presenter/pagination-presenter';
import {parametersOfApplication} from '../data/parameters';
import Utils from '../lib/utils';

class PortfolioView extends AbstractView {
  constructor(data, state) {
    super();

    this.data = data;
    this.state = state;
  }

  get template() {
    return (
      `<section class="portfolio">
        <section class="filter"></section>
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
    const currentPage = this.state.currentPage[`portfolio`];
    const lastPage = currentPage + parametersOfApplication.PAGE_BACK;
    const startItemPage = lastPage * parametersOfApplication.ITEMS_ON_PAGE_OF_PORTFOLIO;
    const endItemPagethis = currentPage * parametersOfApplication.ITEMS_ON_PAGE_OF_PORTFOLIO;

    return this.data.slice(startItemPage, endItemPagethis).map((item) => {
      return this.getTemplateListItem(item);
    }).join(``);
  }

  bind(element) {
    const filter = element.querySelector(`.filter`);
    Utils.replaceOldElement(this.filter, filter);

    const pagination = element.querySelector(`.pagination`);
    const parametersOfPagination = {
      amountDataItems: this.data.length,
      state: this.state,
      maxAmountItemsOnPage: parametersOfApplication.ITEMS_ON_PAGE_OF_PORTFOLIO
    };
    new PaginationPresenter().init(parametersOfPagination, pagination);
  }
}

export default PortfolioView;

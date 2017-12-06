import AbstractView from './abstract-view';
import FilterPresenter from '../presenter/filter-presenter';
import PaginationPresenter from '../presenter/pagination-presenter';
import {parametersOfApplication, PORTFOLIO_FILTER_PARAMETERS} from '../data/parameters';

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
    const lastPage = this.state.currentPagePortfolio + parametersOfApplication.PAGE_BACK;
    const startItemPage = lastPage * parametersOfApplication.ITEMS_ON_PAGE_OF_PORTFOLIO;
    const endItemPagethis = this.state.currentPagePortfolio * parametersOfApplication.ITEMS_ON_PAGE_OF_PORTFOLIO;

    return this.data.slice(startItemPage, endItemPagethis).map((item) => {
      return this.getTemplateListItem(item);
    }).join(``);
  }

  bind(element) {
    const data = Object.assign(this.data);

    const filter = element.querySelector(`.filter`);
    const parametersOfFilter = {
      filters: PORTFOLIO_FILTER_PARAMETERS,
      oldElement: filter,
      data,
      state: this.state
    };
    new FilterPresenter().init(parametersOfFilter);

    const pagination = element.querySelector(`.pagination`);
    const parametersOfPagination = {
      amountDataItems: data.length,
      state: this.state,
      maxAmountItemsOnPage: parametersOfApplication.ITEMS_ON_PAGE_OF_PORTFOLIO
    };
    new PaginationPresenter().init(parametersOfPagination, pagination);
  }
}

export default PortfolioView;

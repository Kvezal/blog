import AbstractView from './abstract-view';
import FilterPresenter from '../presenter/filter-presenter';
import PaginationPresenter from '../presenter/pagination-presenter';
import {parametersOfApplication} from '../data/parameters';

const PORTFOLIO_FILTER_PARAMETERS = [
  {
    title: `Сетка`,
    type: `radio`,
    options: [
      {
        label: `Фиксированная`,
        name: `layout`,
        id: `fixed`
      },
      {
        label: `Адаптивная`,
        name: `layout`,
        id: `adaptive`
      }
    ]
  },
  {
    title: `Тип работы`,
    type: `checkbox`,
    options: [
      {
        label: `Верстка`,
        name: `murkup`,
        id: `murkup`
      },
      {
        label: `SPA`,
        name: `spa`,
        id: `spa`
      }
    ]
  },
  {
    title: `Технологии`,
    type: `checkbox`,
    options: [
      {
        label: `Препроцессоры`,
        name: `preprocessor`,
        id: `preprocessor`
      },
      {
        label: `JavaScript`,
        name: `js`,
        id: `js`
      },
      {
        label: `SVG`,
        name: `svg`,
        id: `svg`
      },
      {
        label: `Promise`,
        name: `promise`,
        id: `promise`
      }
    ]
  }
];

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
    const filter = element.querySelector(`.filter`);
    new FilterPresenter().init(PORTFOLIO_FILTER_PARAMETERS, filter);

    const pagination = element.querySelector(`.pagination`);
    const parameters = {
      amountDataItems: this.data.length,
      state: this.state,
      maxAmountItemsOnPage: parametersOfApplication.ITEMS_ON_PAGE_OF_PORTFOLIO
    };
    new PaginationPresenter().init(parameters, pagination);
  }
}

export default PortfolioView;

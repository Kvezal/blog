import AbstractView from './abstract-view';
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
    const startItemPage = lastPage * this.state.amountItems[`portfolio`];
    const endItemPagethis = currentPage * this.state.amountItems[`portfolio`];

    return this.data.slice(startItemPage, endItemPagethis).map((item) => {
      return this.getTemplateListItem(item);
    }).join(``);
  }

  bind(element) {
    const filter = element.querySelector(`.filter`);
    Utils.replaceOldElement(this.filter, filter);

    const pagination = element.querySelector(`.pagination`);
    Utils.replaceOldElement(this.pagination, pagination);
  }
}

export default PortfolioView;

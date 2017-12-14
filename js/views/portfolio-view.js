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
        <div class="modal"></div>
      </section>`
    );
  }

  getTemplateListItem(item) {
    return (
      `<li class="works__item" data-item="${item.title}">
        <p class="works__name">
          <span>${item.title}</span>
          &#8211; ${item.shortDescription}
        </p>
        <div class="works__wrap">
          <a class="btn  works__btn  works__btn--description" href="#" target="_blank" data-item="${item.title}">Описание</a>
          <a class="btn  works__btn" href="${item.link}" target="_blank">Перейти на сайт</a>
        </div>
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

    this.modal = element.querySelector(`.modal`);

    const items = element.querySelectorAll(`.works__item`);
    items.forEach((item) => item.addEventListener(`mouseover`, this.itemMouseOverHandler));

    const descriptionBtns = element.querySelectorAll(`.works__btn--description`);
    descriptionBtns.forEach((btn) => {
      btn.addEventListener(`click`, this.btnDscriptionClickHandler);
    });
  }
}

export default PortfolioView;

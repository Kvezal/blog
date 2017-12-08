import AbstractView from './abstract-view';
import PaginationPresenter from '../presenter/pagination-presenter';
import {parametersOfApplication} from '../data/parameters';
import Utils from '../lib/utils';

class BlogView extends AbstractView {
  constructor(data, state) {
    super();

    this.data = data;
    this.state = state;
  }

  get template() {
    return (
      `<section class="blog">
        <section class="filter"></section>
        <section class="articles">
          <h1 class="articles__title">Статьи:</h1>
          <ul class="articles__list">
            ${this.templateList}
          </ul>
          <div class="pagination"></div>
        </section>
      </section>`
    );
  }

  getTemplateListItem(item) {
    return (
      `<li class="articles__item">
        <p class="articles__name">${item.title} - ${item.description}</p>
        <a class="btn" href="${item.link}">Прочитать</a>
      </li>`
    );
  }

  get templateList() {
    const lastPage = this.state.currentPage[`blog`] + parametersOfApplication.PAGE_BACK;
    const startItemPage = lastPage * parametersOfApplication.ITEMS_ON_PAGE_OF_BLOG;
    const endItemPagethis = this.state.currentPage[`blog`] * parametersOfApplication.ITEMS_ON_PAGE_OF_BLOG;

    return this.data.slice(startItemPage, endItemPagethis).map((item) => {
      return this.getTemplateListItem(item);
    }).join(``);
  }

  bind(element) {
    const filter = element.querySelector(`.filter`);
    Utils.replaceOldElement(this.filter, filter);

    const pagination = element.querySelector(`.pagination`);
    const parameters = {
      amountDataItems: this.data.length,
      state: this.state,
      maxAmountItemsOnPage: parametersOfApplication.ITEMS_ON_PAGE_OF_BLOG
    };
    new PaginationPresenter().init(parameters, pagination);
  }
}

export default BlogView;

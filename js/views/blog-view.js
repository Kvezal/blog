import AbstractView from './abstract-view';
import FilterPresenter from '../presenter/filter-presenter';
import PaginationPresenter from '../presenter/pagination-presenter';
import {parametersOfApplication, BLOG_FILTER_PARAMETERS} from '../data/parameters';

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
    const lastPage = this.state.currentPageBlog + parametersOfApplication.PAGE_BACK;
    const startItemPage = lastPage * parametersOfApplication.ITEMS_ON_PAGE_OF_BLOG;
    const endItemPagethis = this.state.currentPageBlog * parametersOfApplication.ITEMS_ON_PAGE_OF_BLOG;

    return this.data.slice(startItemPage, endItemPagethis).map((item) => {
      return this.getTemplateListItem(item);
    }).join(``);
  }

  bind(element) {
    const data = Object.assign(this.data);

    const filter = element.querySelector(`.filter`);
    const parametersOfFilter = {
      filters: BLOG_FILTER_PARAMETERS,
      oldElement: filter,
      data,
      state: this.state
    };
    new FilterPresenter().init(parametersOfFilter);

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

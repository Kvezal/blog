import AbstractView from './abstract-view';
import {parametersOfApplication} from '../data/parameters';
import Utils from '../lib/utils';

class ArticlesView extends AbstractView {
  constructor(parentView) {
    super();

    this.data = parentView.currentData;
    this.state = parentView.state;
  }

  get template() {
    return (
      `<section class="articles">
        <h1 class="articles__title">Статьи</h1>
        <ul class="articles__list">
          ${this.templateList}
        </ul>
        <div class="pagination"></div>
        <div class="modal"></div>
      </section>`
    );
  }

  getTemplateListItem(item) {
    return (
      `<li class="articles__item">
        <p class="articles__name">${item.title} - ${item.shortDescription}</p>
        <a class="btn" href="${item.link}" data-date="${item.date}" data-item="${item.id}">Прочитать</a>
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
    this.modal = element.querySelector(`.modal`);
    this.items = element.querySelectorAll(`.articles__item`);

    const btns = element.querySelectorAll(`.btn`);
    btns.forEach((btn) => {
      btn.addEventListener(`click`, this.clickBtnHandler);
    });

    const pagination = element.querySelector(`.pagination`);
    Utils.replaceOldElement(this.pagination, pagination);

    this.container = element.querySelector(`.articles`);
  }
}

export default ArticlesView;

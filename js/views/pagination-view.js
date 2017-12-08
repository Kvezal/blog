import AbstractView from './abstract-view';
import {parametersOfApplication} from '../data/parameters';

const PLACEHOLDER = `<span class="pagination__placeholder"> ... </span>`;

class PaginationView extends AbstractView {
  constructor(viewTab) {
    super();

    this.data = viewTab.data;
    this.state = viewTab.state;
  }

  get template() {
    return (
      `<div class="pagination">
        ${this.templateItems}
      </div>`
    );
  }

  get templateItems() {
    const tab = this.state.currentTab;
    const amountOfPage = Math.ceil(this.data.length / this.state.amountItems[tab]);

    if (!amountOfPage) {
      return ``;
    }

    let startItem = this.state.currentPage[tab] - parametersOfApplication.SPREADING;
    startItem = (startItem > parametersOfApplication.FIRST_PAGE) ? startItem : parametersOfApplication.FIRST_PAGE;

    let endItem = this.state.currentPage[tab] + parametersOfApplication.SPREADING;
    endItem = (endItem < amountOfPage) ? endItem : amountOfPage;

    const pageList = [];

    const previous = (this.state.currentPage[tab] === parametersOfApplication.FIRST_PAGE) ?
      `<a class="pagination__item  pagination__item--prev  pagination__item--disabled">Назад</a>` :
      `<a class="pagination__item  pagination__item--prev" href="#">Назад</a>`;
    pageList.push(previous);

    if (startItem > parametersOfApplication.FIRST_PAGE) {
      const nextElementOfPagination = parametersOfApplication.FIRST_PAGE + parametersOfApplication.STEP;
      const paginationPlaceholder = (nextElementOfPagination === startItem) ?
        `<a class="pagination__item" href="#">${parametersOfApplication.FIRST_PAGE}</a>` :
        `<a class="pagination__item" href="#">${parametersOfApplication.FIRST_PAGE}</a> ${PLACEHOLDER}`;
      pageList.push(paginationPlaceholder);
    }

    for (let i = startItem; i <= endItem; i++) {
      if (i === this.state.currentPage[tab]) {
        pageList.push(`<a class="pagination__item  pagination__item--current">${i}</a>`);
        continue;
      }
      pageList.push(`<a class="pagination__item" href="#">${i}</a>`);
    }

    if (endItem < amountOfPage) {
      const previousElementOfPagination = amountOfPage - parametersOfApplication.STEP;
      const paginationPlaceholder = (previousElementOfPagination === endItem) ?
        `<a class="pagination__item" href="#">${amountOfPage}</a>` :
        `${PLACEHOLDER} <a class="pagination__item" href="#">${amountOfPage}</a>`;
      pageList.push(paginationPlaceholder);
    }

    const next = (this.state.currentPage[tab] === amountOfPage) ?
      `<a class="pagination__item  pagination__item--next  pagination__item--disabled">Вперед</a>` :
      `<a class="pagination__item  pagination__item--next" href="#">Вперед</a>`;
    pageList.push(next);

    return pageList.join(``);
  }

  bind(element) {
    const pages = element.querySelectorAll(`.pagination__item:not(.pagination__item--prev):not(.pagination__item--next):not(.pagination__item--current)`);
    pages.forEach((page) => page.addEventListener(`click`, this.showPage));

    const previous = element.querySelector(`.pagination__item--prev:not(.pagination__item--disabled)`);
    if (previous) {
      previous.addEventListener(`click`, this.showPreviousPage);
    }

    const next = element.querySelector(`.pagination__item--next:not(.pagination__item--disabled)`);
    if (next) {
      next.addEventListener(`click`, this.showNextPage);
    }
  }
}

export default PaginationView;

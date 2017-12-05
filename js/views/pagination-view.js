import AbstractView from './abstract-view';

const FIRST_PAGE = 1;
const SPREADING = 2;
const STEP = 1;
const PLACEHOLDER = `<span class="pagination__placeholder"> ... </span>`;

class PaginationView extends AbstractView {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  get template() {
    return (
      `<div class="pagination">
        ${this.templateItems}
      </div>`
    );
  }

  get templateItems() {
    const amountOfPage = Math.ceil(this.parameters.amountDataItems / this.parameters.maxAmountItemsOnPage);

    if (!amountOfPage) {
      return ``;
    }

    let startItem = this.parameters.state.currentPage - SPREADING;
    startItem = (startItem > FIRST_PAGE) ? startItem : FIRST_PAGE;

    let endItem = this.parameters.state.currentPage + SPREADING;
    endItem = (endItem < amountOfPage) ? endItem : amountOfPage;

    const pageList = [];

    const previous = (this.parameters.state.currentPage === FIRST_PAGE) ?
      `<a class="pagination__item  pagination__item--prev  pagination__item--disabled">Назад</a>` :
      `<a class="pagination__item  pagination__item--prev" href="#">Назад</a>`;
    pageList.push(previous);

    if (startItem > FIRST_PAGE) {
      const nextElementOfPagination = FIRST_PAGE + STEP;
      const paginationPlaceholder = (nextElementOfPagination === startItem) ?
        `<a class="pagination__item" href="#">${FIRST_PAGE}</a>` :
        `<a class="pagination__item" href="#">${FIRST_PAGE}</a> ${PLACEHOLDER}`;
      pageList.push(paginationPlaceholder);
    }

    for (let i = startItem; i <= endItem; i++) {
      if (i === this.parameters.state.currentPage) {
        pageList.push(`<a class="pagination__item  pagination__item--current">${i}</a>`);
        continue;
      }
      pageList.push(`<a class="pagination__item" href="#">${i}</a>`);
    }

    if (endItem < amountOfPage) {
      const previousElementOfPagination = amountOfPage - STEP;
      const paginationPlaceholder = (previousElementOfPagination === endItem) ?
        `<a class="pagination__item" href="#">${amountOfPage}</a>` :
        `${PLACEHOLDER} <a class="pagination__item" href="#">${amountOfPage}</a>`;
      pageList.push(paginationPlaceholder);
    }

    const next = (this.parameters.state.currentPage === amountOfPage) ?
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

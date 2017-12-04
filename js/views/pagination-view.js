import AbstractView from './abstract-view';

class PaginationView extends AbstractView {
  constructor(parameters) {
    super();

    this.amountDataItems = parameters.amountDataItems;
    this.currentPage = parameters.currentPage;
    this.maxAmountItemsOnPage = parameters.maxAmountItemsOnPage;
  }

  get template() {
    const amountOfPage = Math.ceil(this.amountDataItems / this.maxAmountItemsOnPage);

    const pageList = [`<div class="pagination"><a class="pagination__item  pagination__item--prev  pagination__item--disabled">Назад</a>`];
    for (let i = 1; i <= amountOfPage; i++) {
      if (i === this.currentPage) {
        pageList.push(`<a class="pagination__item  pagination__item--current">${i}</a>`);
        continue;
      }
      pageList.push(`<a class="pagination__item" href="#">${i}</a>`);
    }
    pageList.push(`<a class="pagination__item  pagination__item--next" href="#">Вперед</a></div>`);
    return pageList.join(``);
  }
}

export default PaginationView;

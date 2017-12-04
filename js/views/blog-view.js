import AbstractView from './abstract-view';

class BlogView extends AbstractView {
  constructor(data) {
    super();

    this.data = data;
  }

  get template() {
    return (
      `<section class="blog">
        <section class="filter">
          <h2 class="filter__title">Фильтр:</h2>
          <fieldset class="filter__item">
            <legend class="filter__item-name">По дате:</legend>
            <input type="radio" class="filter__radio" name="layout" id="fixed" checked>
            <label class="filter__label-radio" for="fixed">Сначала старые</label>
            <input type="radio" class="filter__radio" name="layout" id="adaptive">
            <label class="filter__label-radio" for="adaptive">Сначала новые</label>
          </fieldset>
        </section>
        <section class="articles">
          <h1 class="articles__title">Статьи:</h1>
          <ul class="articles__list">
            ${this.templateList}
          </ul>
          <div class="pagination">
            <a class="pagination__item  pagination__item--prev  pagination__item--disabled">Назад</a>
            <a class="pagination__item  pagination__item--current">1</a>
            <a class="pagination__item" href="#">2</a>
            <a class="pagination__item" href="#">3</a>
            <a class="pagination__item  pagination__item--next" href="#">Вперед</a>
          </div>
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
    return this.data.map((item) => {
      return this.getTemplateListItem(item);
    }).join(``);
  }
}

export default BlogView;

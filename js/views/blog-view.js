import AbstractView from './abstract-view';

class BlogView extends AbstractView {
  constructor() {
    super();
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
            <li class="articles__item">
              <p class="articles__name">Название статьи</p>
              <button class="btn">Прочитать</button>
            </li>
            <li class="articles__item">
              <p class="articles__name">Название статьи</p>
              <button class="btn">Прочитать</button>
            </li>
            <li class="articles__item">
              <p class="articles__name">Название статьи</p>
              <button class="btn">Прочитать</button>
            </li>
            <li class="articles__item">
              <p class="articles__name">Название статьи</p>
              <button class="btn">Прочитать</button>
            </li>
            <li class="articles__item">
              <p class="articles__name">Название статьи</p>
              <button class="btn">Прочитать</button>
            </li>
            <li class="articles__item">
              <p class="articles__name">Название статьи</p>
              <button class="btn">Прочитать</button>
            </li>
            <li class="articles__item">
              <p class="articles__name">Название статьи</p>
              <button class="btn">Прочитать</button>
            </li>
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
}

export default BlogView;

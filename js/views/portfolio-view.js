import AbstractView from './abstract-view';

class PortfolioView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return (
      `<section class="portfolio">
        <section class="filter">
          <h2 class="filter__title">Фильтр:</h2>
          <fieldset class="filter__item">
            <legend class="filter__item-name">Сетка:</legend>
            <input type="radio" class="filter__radio" name="layout" id="fixed" checked>
            <label class="filter__label-radio" for="fixed">Фиксированная</label>
            <input type="radio" class="filter__radio" name="layout" id="adaptive">
            <label class="filter__label-radio" for="adaptive">Адаптивная</label>
          </fieldset>
          <fieldset class="filter__item">
            <legend class="filter__item-name">Технологии:</legend>
            <input type="checkbox" class="filter__check" name="preprocessor" id="preprocessor" checked>
            <label class="filter__label-check" for="preprocessor">Препроцессоры</label>
            <input type="checkbox" class="filter__check" name="js" id="js" checked>
            <label class="filter__label-check" for="js">JavaScript</label>
            <input type="checkbox" class="filter__check" name="svg" id="svg" checked>
            <label class="filter__label-check" for="svg">SVG</label>
            <input type="checkbox" class="filter__check" name="promise" id="promise" checked>
            <label class="filter__label-check" for="promise">Promise</label>
          </fieldset>
        </section>
        <section class="works">
          <h1 class="works__title">Работы</h1>
          <ul class="works__list">
            <li class="works__item">
              <p class="works__name">
                <span>Gllacy</span>
                &#8211; интернет-магазин мороженого
              </p>
              <button class="btn">Перейти на сайт</button>
            </li>
            <li class="works__item">
              <p class="works__name">
                <span>Nerds</span>
                &#8211; сайт web-студии
              </p>
              <button class="btn">Перейти на сайт</button>
            </li>
            <li class="works__item">
              <p class="works__name">
                <span>Technomart</span>
                &#8211; интернет-магазин строительных материалов и инструментов для ремонта
              </p>
              <button class="btn">Перейти на сайт</button>
            </li>
            <li class="works__item">
              <p class="works__name">
                <span>Sedona</span>
                &#8211; информационный сайт для туристов
              </p>
              <button class="btn">Перейти на сайт</button>
            </li>
            <li class="works__item">
              <p class="works__name">
                <span>Mishka</span>
                &#8211; интернет-магазин вязаных игрушек
              </p>
              <button class="btn">Перейти на сайт</button>
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

export default PortfolioView;

import AbstractView from './abstract-view';

class FilterView extends AbstractView {
  constructor(model) {
    super();

    this.model = model;
    this.filters = model.filters;
  }

  get template() {
    return (
      `<form href="#" method="get" class="filter">
        <h2 class="filter__title">Фильтр</h2>
        ${this.templateFIlterList}
        <button class="btn  filter__btn" type="submit">Применить</button>
        <button class="btn  filter__btn  filter__btn--reset" type="reset">Сбросить</button>
      </form>`
    );
  }

  get templateFIlterList() {
    return this.filters.map((item) => {
      return (
        `<fieldset class="filter__item">
          <legend class="filter__item-name">${item.title}:</legend>
          ${this.getTemplateFilterOptions(item.options, item.type)}
        </fieldset>`
      );
    }).join(``);
  }

  getTemplateFilterOptions(options, type) {
    return options.map((option) => {
      const checked = (option.checked === true) ? `checked` : ``;
      const value = (type === `radio`) ? `value="${option.id}"` : ``;

      return (
        `<input type="${type}" class="filter__${type}" name="${option.name}" id="${option.id}" ${value} ${checked}>
        <label class="filter__label-${type}" for="${option.id}">${option.label}</label>`
      );
    }).join(``);
  }

  bind(element) {
    const form = element.querySelector(`.filter`);
    form.addEventListener(`submit`, this.applyFilterSettings);
    form.addEventListener(`reset`, this.resetFilterSetting);

    const filterOptions = form.querySelectorAll(`input`);
    filterOptions.forEach((option) => {
      option.addEventListener(`change`, this.changeStateOption);
    });

    this.container = element.querySelector(`.filter`);
  }
}

export default FilterView;

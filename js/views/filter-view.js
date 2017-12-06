import AbstractView from './abstract-view';

class FilterView extends AbstractView {
  constructor(filters) {
    super();

    this.filters = filters;
  }

  get template() {
    return (
      `<form href="#" method="get" class="filter">
        <h2 class="filter__title">Фильтр:</h2>
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
          <legend class="filter__item-name">${item.title}</legend>
          ${this.getTemplateFilterOptions(item.options, item.type)}
        </fieldset>`
      );
    }).join(``);
  }

  getTemplateFilterOptions(options, type) {
    const checked = (type === `checkbox`) ? `checked` : ``;

    return options.map((option) => {
      const value = (type === `radio`) ? `value="${option.id}"` : ``;
      return (
        `<input type="${type}" class="filter__${type}" name="${option.name}" id="${option.id}" ${value} ${checked}>
        <label class="filter__label-${type}" for="${option.id}">${option.label}</label>`
      );
    }).join(``);
  }
}

export default FilterView;

import AbstractView from './abstract-view';
import {parametersOfApplication} from '../data/parameters';

import Utils from '../lib/utils';


class SkillsView extends AbstractView {
  constructor(data, state) {
    super();

    this.data = data;
    this.state = state;
  }

  get template() {
    return (
      `<section class="skills">
        <h1 class="skills__title">Навыки</h1>
        ${this.templateList}
        <div class="pagination"></div>
      </section>`
    );
  }

  getTemplateListItem(item) {
    return (
      `<li class="skills__item">${item};</li>`
    );
  }

  get templateList() {
    const currentPage = this.state.currentPage[`skills`];
    const lastPage = currentPage + parametersOfApplication.PAGE_BACK;
    const startItemPage = lastPage * this.state.amountItems[`skills`];
    const endItemPagethis = currentPage * this.state.amountItems[`skills`];

    const list = this.data.slice(startItemPage, endItemPagethis).map((item) => {
      return this.getTemplateListItem(item);
    });
    const indexLastItem = list.length - 1;
    list[indexLastItem] = list[indexLastItem].replace(/;/, ``);
    return (
      `<ol class="skills__list" start="${startItemPage + 1}">
        ${list.join(``)}
      </ol>`
    );
  }

  bind(element) {
    const pagination = element.querySelector(`.pagination`);
    Utils.replaceOldElement(this.pagination, pagination);
  }
}

export default SkillsView;

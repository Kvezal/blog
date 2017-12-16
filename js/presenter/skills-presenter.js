import SkillsView from '../views/skills-view';
import PaginationPresenter from '../presenter/pagination-presenter';

import Utils from '../lib/utils';

class SkillsPresenter {
  init(data, state) {
    this.view = new SkillsView(data, state);

    this.view.pagination = new PaginationPresenter().init(this.view).element;

    Utils.displayElement(this.view.element, `page-main`);
  }
}

export default new SkillsPresenter();

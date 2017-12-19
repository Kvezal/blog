import SkillsView from '../views/skills-view';
import PaginationPresenter from './pagination-presenter';

import Utils from '../lib/utils';

class SkillsPresenter {
  init(data, state) {
    this.view = new SkillsView(data, state);


    const paginationView = new PaginationPresenter().init(this.view);
    paginationView.updateComponent = () => {
      new SkillsPresenter().init(data, state);
    };
    this.view.pagination = paginationView.element;


    Utils.displayElement(this.view.element, `page-main`);
  }
}

export default new SkillsPresenter();

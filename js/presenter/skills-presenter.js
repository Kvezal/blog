import SkillsView from '../views/skills-view';
import PaginationPresenter from './pagination-presenter';

import Utils from '../lib/utils';
import VisialEffects from '../lib/visual-effects';


const SPEED_SHOWING = 50;


class SkillsPresenter {
  init(data, state) {
    this.view = new SkillsView(data, state);


    const paginationView = new PaginationPresenter().init(this.view);
    paginationView.updateComponent = () => {
      const delay = this.view.items.length * SPEED_SHOWING;
      VisialEffects.hideOpacity(this.view.items, SPEED_SHOWING);

      window.setTimeout(() => {
        new SkillsPresenter().init(this.view.data, this.view.state);
      }, delay);
    };
    this.view.pagination = paginationView.element;


    Utils.displayElement(this.view.element, `page-main`);
    VisialEffects.showOpacity(this.view.items, SPEED_SHOWING);

    return this.view.container;
  }
}


export default new SkillsPresenter();

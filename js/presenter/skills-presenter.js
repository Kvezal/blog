import SkillsView from '../views/skills-view';
import Utils from '../lib/utils';

class SkillsPresenter {
  init(data) {
    this.view = new SkillsView(data);

    Utils.displayElement(this.view.element, `page-main`);
  }
}

export default new SkillsPresenter();

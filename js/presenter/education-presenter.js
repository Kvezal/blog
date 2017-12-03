import EducationView from '../views/education-view';
import Utils from '../lib/utils';

class EducationPresenter {
  init() {
    this.view = new EducationView();

    Utils.displayElement(this.view.element, `page-main`);
  }
}

export default new EducationPresenter();

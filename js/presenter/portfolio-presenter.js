import PortfolioView from '../views/portfolio-view';
import FilterPresenter from './filter-presenter';
import WorksPresenter from './works-presenter';

import Utils from '../lib/utils';


class PortfolioPresenter {
  init(data, state) {
    this.view = new PortfolioView(data, state);


    this.view.updateFilter = () => {
      const filterView = new FilterPresenter().init(this.view);
      Utils.replaceOldElement(filterView.element, this.view.filter);
      this.view.filter = filterView.container;
    };


    this.view.updateList = () => {
      const worksView = new WorksPresenter().init(this.view);
      Utils.replaceOldElement(worksView.element, this.view.works);
      this.view.works = worksView.container;
    };


    Utils.displayElement(this.view.element, `page-main`);
  }
}

export default new PortfolioPresenter();

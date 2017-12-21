import PortfolioView from '../views/portfolio-view';
import FilterPresenter from './filter-presenter';
import WorksPresenter from './works-presenter';

import Utils from '../lib/utils';


class PortfolioPresenter {
  init(data, state) {
    this.view = new PortfolioView(data, state);


    this.view.updateFilter = () => {
      this.view.filter = new FilterPresenter().init(this.view, this.view.filter);
    };


    this.view.updateList = () => {
      this.view.works = new WorksPresenter().init(this.view, this.view.works);
    };


    Utils.displayElement(this.view.element, `page-main`);
    this.view.updateFilter();
    this.view.updateList();

    return this.view.container;
  }
}

export default new PortfolioPresenter();

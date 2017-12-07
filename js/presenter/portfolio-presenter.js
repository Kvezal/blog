import PortfolioView from '../views/portfolio-view';
import FilterPresenter from '../presenter/filter-presenter';
import Utils from '../lib/utils';


class PortfolioPresenter {
  init(data, state) {
    this.view = new PortfolioView(data, state);
    this.view.filter = new FilterPresenter().init(this.view);
    Utils.displayElement(this.view.element, `page-main`);
  }
}

export default new PortfolioPresenter();

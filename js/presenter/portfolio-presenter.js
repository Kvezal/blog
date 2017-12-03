import PortfolioView from '../views/portfolio-view';
import Utils from '../lib/utils';

class PortfolioPresenter {
  init() {
    this.view = new PortfolioView();

    Utils.displayElement(this.view.element, `page-main`);
  }
}

export default new PortfolioPresenter();

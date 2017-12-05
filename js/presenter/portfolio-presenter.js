import PortfolioView from '../views/portfolio-view';
import Utils from '../lib/utils';

class PortfolioPresenter {
  init(data, state) {
    this.view = new PortfolioView(data, state);

    Utils.displayElement(this.view.element, `page-main`);
  }
}

export default new PortfolioPresenter();

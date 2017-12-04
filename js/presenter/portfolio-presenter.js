import PortfolioView from '../views/portfolio-view';
import Utils from '../lib/utils';

class PortfolioPresenter {
  init(data) {
    const state = {
      currentPage: 1
    };

    this.view = new PortfolioView(data, state);

    Utils.displayElement(this.view.element, `page-main`);
  }
}

export default new PortfolioPresenter();

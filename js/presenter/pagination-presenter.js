import App from '../application';
import PaginationView from '../views/pagination-view';
import Utils from '../lib/utils';

class PaginationPresenter {
  init(parameters, oldElement) {
    this.view = new PaginationView(parameters);

    this.view.showPage = (evt) => {
      evt.preventDefault();

      const state = this.view.parameters.state;
      state.currentPage = +evt.target.textContent;

      App.changeTab(state);
    };

    this.view.showPreviousPage = (evt) => {
      evt.preventDefault();

      const state = this.view.parameters.state;
      --state.currentPage;

      App.changeTab(state);
    };

    this.view.showNextPage = (evt) => {
      evt.preventDefault();

      const state = this.view.parameters.state;
      ++state.currentPage;

      App.changeTab(state);
    };

    Utils.replaceOldElement(this.view.element, oldElement);
  }
}

export default PaginationPresenter;

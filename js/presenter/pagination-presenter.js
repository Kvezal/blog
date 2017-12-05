import App from '../application';
import PaginationView from '../views/pagination-view';
import Utils from '../lib/utils';

class PaginationPresenter {
  init(parameters, oldElement) {
    this.view = new PaginationView(parameters);

    const state = this.view.parameters.state;
    const tab = Utils.toUpperCaseFirstLetter(state.currentTab);

    this.view.showPage = (evt) => {
      evt.preventDefault();
      state[`currentPage${tab}`] = +evt.target.textContent;
      App.changeTab(state);
    };

    this.view.showPreviousPage = (evt) => {
      evt.preventDefault();
      --state[`currentPage${tab}`];
      App.changeTab(state);
    };

    this.view.showNextPage = (evt) => {
      evt.preventDefault();
      ++state[`currentPage${tab}`];
      App.changeTab(state);
    };

    Utils.replaceOldElement(this.view.element, oldElement);
  }
}

export default PaginationPresenter;

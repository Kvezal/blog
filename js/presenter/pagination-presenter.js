import App from '../application';
import PaginationView from '../views/pagination-view';

class PaginationPresenter {
  init(viewTab) {
    this.view = new PaginationView(viewTab);

    const state = this.view.state;
    const tab = state.currentTab;

    this.view.showPage = (evt) => {
      evt.preventDefault();
      state.currentPage[tab] = +evt.target.textContent;
      App.changeTab(state);
    };

    this.view.showPreviousPage = (evt) => {
      evt.preventDefault();
      --state.currentPage[tab];
      App.changeTab(state);
    };

    this.view.showNextPage = (evt) => {
      evt.preventDefault();
      ++state.currentPage[tab];
      App.changeTab(state);
    };

    return this.view;
  }
}

export default PaginationPresenter;

// import App from '../application';
import PaginationView from '../views/pagination-view';
import {saveState} from '../lib/change-url';

class PaginationPresenter {
  init(viewTab) {
    this.view = new PaginationView(viewTab);

    const state = this.view.state;
    const tab = state.currentTab;

    this.view.showPage = (evt) => {
      evt.preventDefault();
      state.currentPage[tab] = +evt.target.textContent;
      saveState(state);
    };

    this.view.showPreviousPage = (evt) => {
      evt.preventDefault();
      --state.currentPage[tab];
      saveState(state);
    };

    this.view.showNextPage = (evt) => {
      evt.preventDefault();
      ++state.currentPage[tab];
      saveState(state);
    };

    return this.view;
  }
}

export default PaginationPresenter;

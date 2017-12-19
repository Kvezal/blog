import PaginationView from '../views/pagination-view';
import {saveState} from '../lib/change-url';

class PaginationPresenter {
  init(viewTab) {
    this.view = new PaginationView(viewTab);

    const state = this.view.state;
    const tab = (state.currentTab !== ``) ? state.currentTab : `skills`;


    this.view.showPage = (evt) => {
      evt.preventDefault();
      state.currentPage[tab] = +evt.target.textContent;
      saveState(state);
      this.view.updateComponent();
    };


    this.view.showPreviousPage = (evt) => {
      evt.preventDefault();
      --state.currentPage[tab];
      saveState(state);
      this.view.updateComponent();
    };


    this.view.showNextPage = (evt) => {
      evt.preventDefault();
      ++state.currentPage[tab];
      saveState(state);
      this.view.updateComponent();
    };


    return this.view;
  }
}

export default PaginationPresenter;

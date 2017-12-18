import App from '../application';
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
      App.changeTab(state);
    };


    this.view.showPreviousPage = (evt) => {
      evt.preventDefault();
      --state.currentPage[tab];
      saveState(state);
      App.changeTab(state);
    };


    this.view.showNextPage = (evt) => {
      evt.preventDefault();
      ++state.currentPage[tab];
      saveState(state);
      App.changeTab(state);
    };


    return this.view;
  }
}

export default PaginationPresenter;

import ArticlesView from '../views/articles-view';
import PaginationPresenter from './pagination-presenter';
import itemDescription from './item-description-presenter';

import Utils from '../lib/utils';
import {saveState} from '../lib/change-url';

class ArticlesPresenter {
  init(parentView, container) {
    this.view = new ArticlesView(parentView);


    const paginationView = new PaginationPresenter().init(this.view);
    paginationView.updateComponent = () => {
      parentView.updateList();
    };
    this.view.pagination = paginationView.element;


    const openDescription = () => {
      if (!this.view.state.currentWindow) {
        return;
      }

      const dataItem = this.view.data.find((item) => item.id === this.view.state.currentWindow);
      this.view.description = itemDescription.init(dataItem, this.view.state, this.view.modal);
    };


    this.view.clickBtnHandler = (evt) => {
      evt.preventDefault();

      this.view.state.currentWindow = evt.currentTarget.dataset.item;
      saveState(this.view.state);
      openDescription();
    };


    Utils.replaceOldElement(this.view.element, container);
    openDescription();
    return this.view.container;
  }
}

export default ArticlesPresenter;

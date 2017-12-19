import ArticlesView from '../views/articles-view';
import PaginationPresenter from './pagination-presenter';
import itemDescription from './item-description-presenter';

import Utils from '../lib/utils';

class ArticlesPresenter {
  init(parentView) {
    this.view = new ArticlesView(parentView);


    const paginationView = new PaginationPresenter().init(this.view);
    paginationView.updateComponent = () => {
      parentView.updateList();
    };
    this.view.pagination = paginationView.element;


    const openDescription = () => {
      this.view.description = itemDescription.init(this.dataItem, this.view.state.currentTab, this.view.modal);
      Utils.displayElement(this.view.description.element, this.view.modal);
    };


    this.view.clickBtnHandler = (evt) => {
      evt.preventDefault();

      this.dataItem = this.view.data.find((item) => item.date === evt.currentTarget.dataset.item);
      openDescription();
    };


    return this.view;
  }
}

export default ArticlesPresenter;

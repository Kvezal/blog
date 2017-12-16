import BlogView from '../views/blog-view';
import FilterPresenter from '../presenter/filter-presenter';
import PaginationPresenter from '../presenter/pagination-presenter';
import itemDescription from '../presenter/item-description-presenter';
import Utils from '../lib/utils';

class BlogPresenter {
  init(data, state) {
    this.view = new BlogView(data, state);

    const filterView = new FilterPresenter().init(this.view);
    this.view.filter = filterView.element;
    this.view.data = filterView.model.data;

    this.view.pagination = new PaginationPresenter().init(this.view).element;


    const openDescription = () => {
      this.view.description = itemDescription.init(this.dataItem, this.view.state.currentTab, this.view.modal);
      Utils.displayElement(this.view.description.element, this.view.modal);
    };


    this.view.clickBtnHandler = (evt) => {
      evt.preventDefault();

      this.dataItem = this.view.data.find((item) => item.date === evt.currentTarget.dataset.item);
      openDescription();
    };


    Utils.displayElement(this.view.element, `page-main`);
  }
}

export default new BlogPresenter();

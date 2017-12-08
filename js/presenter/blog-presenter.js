import BlogView from '../views/blog-view';
import FilterPresenter from '../presenter/filter-presenter';
import PaginationPresenter from '../presenter/pagination-presenter';
import Utils from '../lib/utils';

class BlogPresenter {
  init(data, state) {
    this.view = new BlogView(data, state);

    const filterView = new FilterPresenter().init(this.view);
    this.view.filter = filterView.element;
    this.view.data = filterView.model.data;

    this.view.pagination = new PaginationPresenter().init(this.view).element;

    Utils.displayElement(this.view.element, `page-main`);
  }
}

export default new BlogPresenter();

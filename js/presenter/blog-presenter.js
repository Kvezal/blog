import BlogView from '../views/blog-view';
import FilterPresenter from '../presenter/filter-presenter';
import Utils from '../lib/utils';

class BlogPresenter {
  init(data, state) {
    this.view = new BlogView(data, state);
    this.view.filter = new FilterPresenter().init(this.view);
    Utils.displayElement(this.view.element, `page-main`);
  }
}

export default new BlogPresenter();

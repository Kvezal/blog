import BlogView from '../views/blog-view';
import Utils from '../lib/utils';

class BlogPresenter {
  init() {
    this.view = new BlogView();

    Utils.displayElement(this.view.element, `page-main`);
  }
}

export default new BlogPresenter();

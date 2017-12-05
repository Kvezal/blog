import BlogView from '../views/blog-view';
import Utils from '../lib/utils';

class BlogPresenter {
  init(data, state) {
    this.view = new BlogView(data, state);

    Utils.displayElement(this.view.element, `page-main`);
  }
}

export default new BlogPresenter();

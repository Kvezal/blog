import BlogView from '../views/blog-view';
import Utils from '../lib/utils';

class BlogPresenter {
  init(data) {
    this.view = new BlogView(data);

    Utils.displayElement(this.view.element, `page-main`);
  }
}

export default new BlogPresenter();

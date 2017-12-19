import BlogView from '../views/blog-view';
import FilterPresenter from './filter-presenter';
import ArticlesPresenter from './articles-presenter';

import Utils from '../lib/utils';


class BlogPresenter {
  init(data, state) {
    this.view = new BlogView(data, state);

    const filterView = new FilterPresenter().init(this.view);
    this.view.filter = filterView.element;

    this.view.updateList = () => {
      const articlesView = new ArticlesPresenter().init(this.view);
      Utils.replaceOldElement(articlesView.element, this.view.articles);
      this.view.articles = articlesView.container;
    };


    Utils.displayElement(this.view.element, `page-main`);
  }
}

export default new BlogPresenter();

import BlogView from '../views/blog-view';
import FilterPresenter from './filter-presenter';
import ArticlesPresenter from './articles-presenter';

import Utils from '../lib/utils';


class BlogPresenter {
  init(data, state) {
    this.view = new BlogView(data, state);


    this.view.updateFilter = () => {
      this.view.filter = new FilterPresenter().init(this.view, this.view.filter);
    };


    this.view.updateList = () => {
      this.view.articles = new ArticlesPresenter().init(this.view, this.view.articles);
    };


    Utils.displayElement(this.view.element, `page-main`);
    this.view.updateFilter();
    this.view.updateList();

    return this.view.container;
  }
}

export default new BlogPresenter();

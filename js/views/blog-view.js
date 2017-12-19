import AbstractView from './abstract-view';

import Utils from '../lib/utils';

class BlogView extends AbstractView {
  constructor(data, state) {
    super();

    this.data = data;
    this.state = state;
  }


  get template() {
    return (
      `<section class="blog">
        <section class="filter"></section>
        <section class="articles"></section>
      </section>`
    );
  }


  bind(element) {
    const filter = element.querySelector(`.filter`);
    Utils.replaceOldElement(this.filter, filter);

    this.articles = element.querySelector(`.articles`);
    this.updateList();
  }
}

export default BlogView;

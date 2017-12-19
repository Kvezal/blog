import AbstractView from './abstract-view';

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
    this.filter = element.querySelector(`.filter`);
    this.updateFilter();

    this.articles = element.querySelector(`.articles`);
    this.updateList();
  }
}

export default BlogView;

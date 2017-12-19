import AbstractView from './abstract-view';

class PortfolioView extends AbstractView {
  constructor(data, state) {
    super();

    this.data = data;
    this.state = state;
  }

  get template() {
    return (
      `<section class="portfolio">
        <section class="filter"></section>
        <section class="works"></section>
      </section>`
    );
  }

  bind(element) {
    this.filter = element.querySelector(`.filter`);
    this.updateFilter();

    this.works = element.querySelector(`.works`);
    this.updateList();
  }
}

export default PortfolioView;

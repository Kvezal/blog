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
    this.container = element.querySelector(`.portfolio`);
    this.filter = element.querySelector(`.filter`);
    this.works = element.querySelector(`.works`);
  }
}

export default PortfolioView;

import AbstractView from './abstract-view';
import Utils from '../lib/utils';

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
    const filter = element.querySelector(`.filter`);
    Utils.replaceOldElement(this.filter, filter);

    this.works = element.querySelector(`.works`);
    this.updateList();
  }
}

export default PortfolioView;

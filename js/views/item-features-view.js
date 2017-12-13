import AbstractView from './abstract-view';

const MAX_AMOUNT_ELEMENT_IN_THE_LIST = 5;

class ItemFeaturesView extends AbstractView {
  constructor(data, coords) {
    super();

    this.data = data;
    this.coords = coords;
  }

  get template() {
    return (
      `<section class="item-features" style="top: ${this.coords.top}px; left: ${this.coords.left}px">
        <h3 class="item-features__title">Особенности</h3>
          <ul class="item-features__list">
            ${this.templateElementsFeatureList}
          </ul>
        <p class="item-features__helper">
          Подробнее
          <svg class="item-features__svg" width="20" height="32" viewBox="0 0 60 100">
            <ellipse stroke-width="4" stroke="#000" fill="none" rx="28" ry="48" cx="30" cy="50" />
            <line stroke-width="4" stroke="#000" x1="4" y1="50" x2="56" y2="50" />
            <polygon stroke-width="4" points="32,4 32,50 3,50 5,30 8,20 16,8 20,5 25,3"/>
            <polyline stroke-width="4" stroke="#000" points="14,1 11,3 7,7 6,8 5,10 3,13 1,20 "/>
          </svg>
        </p>
      </section>`
    );
  }

  get templateElementsFeatureList() {
    const features = this.data.features;

    return features.map((feature) => {
      return `<li class="item-features__element">${feature}</li>`;
    }).join(`, `);
  }
}

export default ItemFeaturesView;

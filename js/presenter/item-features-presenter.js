import ItemFeaturesView from '../views/item-features-view';

class ItemFeaturesPresenter {
  init(data, coords) {
    this.view = new ItemFeaturesView(data, coords);
    return this.view;
  }
}

export default new ItemFeaturesPresenter();

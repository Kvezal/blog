import FilterView from '../views/filter-view';
import Utils from '../lib/utils';

class FilterPresenter {
  init(filters, oldElement) {
    this.view = new FilterView(filters);

    Utils.replaceOldElement(this.view.element, oldElement);
  }
}

export default FilterPresenter;

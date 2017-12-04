import PaginationView from '../views/pagination-view';
import Utils from '../lib/utils';

class PaginationPresenter {
  init(parameters) {
    this.view = new PaginationView(parameters);

    Utils.replaceOldElement(this.view.element, parameters.oldElement);
  }
}

export default PaginationPresenter;

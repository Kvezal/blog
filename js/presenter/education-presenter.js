import EducationView from '../views/education-view';
import itemDescription from './item-description-presenter';

import Utils from '../lib/utils';
import {saveState} from '../lib/change-url';

class EducationPresenter {
  init(data, state) {
    this.view = new EducationView(data);


    const openCertificate = () => {
      const dataItem = this.view.data.find((item) => item.id === state.currentWindow);

      if (!dataItem) {
        return;
      }

      itemDescription.init(dataItem, state, this.view.modal);
    };


    this.view.certificateItemHandler = (evt) => {
      evt.preventDefault();

      state.currentWindow = evt.currentTarget.dataset.item;
      saveState(state);
      openCertificate();
    };


    Utils.displayElement(this.view.element, `page-main`);
    openCertificate();
  }
}

export default new EducationPresenter();

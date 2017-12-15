import EducationView from '../views/education-view';
import itemDescription from './item-description-presenter';
import Utils from '../lib/utils';

class EducationPresenter {
  init(data, state) {
    this.view = new EducationView(data);


    const openCertificate = () => {
      this.view.description = itemDescription.init(this.dataItem, state.currentTab, this.view.modal);
      Utils.displayElement(this.view.description.element, this.view.modal);
    };


    this.view.certificateItemHandler = (evt) => {
      evt.preventDefault();
      this.dataItem = this.view.data.find((item) => item.name === evt.target.dataset.item);
      openCertificate(evt.target);
    };

    Utils.displayElement(this.view.element, `page-main`);
  }
}

export default new EducationPresenter();

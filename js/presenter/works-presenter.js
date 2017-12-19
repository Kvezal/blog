import WorksView from '../views/works-view';
import PaginationPresenter from '../presenter/pagination-presenter';
import itemFeatures from '../presenter/item-features-presenter';
import itemDescription from '../presenter/item-description-presenter';

import Utils from '../lib/utils';

class WorksPresenter {
  init(parentView) {
    this.view = new WorksView(parentView);

    const paginationView = new PaginationPresenter().init(this.view);

    paginationView.updateComponent = () => {
      parentView.updateList();
    };

    this.view.pagination = paginationView.element;


    const addMouseHandlers = (target) => {
      target.addEventListener(`mousemove`, itemMouseMoveHandler);
      target.addEventListener(`mouseout`, itemMouseOutHandler);
      target.addEventListener(`click`, openDescription);
    };


    const removeMouseHandlers = (target) => {
      target.removeEventListener(`mouseout`, itemMouseOutHandler);
      target.removeEventListener(`mousemove`, itemMouseMoveHandler);
      target.removeEventListener(`click`, openDescription);
    };


    const itemMouseMoveHandler = (evt) => {
      if (evt.target.classList.contains(`works__btn`)) {
        Utils.clearElement(this.view.modal);
        return;
      }
      const coords = {
        top: evt.clientY + 10,
        left: evt.clientX + 10
      };
      this.view.features = itemFeatures.init(this.dataItem, coords);
      Utils.displayElement(this.view.features.element, this.view.modal);
    };


    const itemMouseOutHandler = (evt) => {
      evt.preventDefault();
      if (evt.target.classList.contains(`works__item`)) {
        removeMouseHandlers(evt.target);

        Utils.clearElement(this.view.modal);
      }
    };


    const checkBtn = (classList) => {
      return classList.contains(`works__btn`) && !classList.contains(`works__btn--description`);
    };


    const openDescription = (evt) => {
      if (checkBtn(evt.target.classList)) {
        return;
      }
      removeMouseHandlers(evt.target);

      this.view.description = itemDescription.init(this.dataItem, this.view.state.currentTab, this.view.modal);
      Utils.displayElement(this.view.description.element, this.view.modal);
    };


    this.view.itemMouseOverHandler = (evt) => {
      evt.preventDefault();

      if (!evt.target.classList.contains(`works__btn`)) {
        addMouseHandlers(evt.target);
      }
      this.dataItem = this.view.data.find((item) => item.title === evt.currentTarget.dataset.item);
    };


    this.view.btnDscriptionClickHandler = (evt) => {
      evt.preventDefault();
      openDescription(evt);
    };

    return this.view;
  }
}

export default WorksPresenter;
import WorksView from '../views/works-view';
import PaginationPresenter from './pagination-presenter';
import itemFeatures from './item-features-presenter';
import itemDescription from './item-description-presenter';

import Utils from '../lib/utils';
import {saveState} from '../lib/change-url';
import VisialEffects from '../lib/visual-effects';


const OFFSET_FROM_CURSOR = {
  y: 15,
  x: 15
};

const SPEED_SHOWING = 60;


class WorksPresenter {
  init(parentView, container) {
    this.view = new WorksView(parentView);


    const paginationView = new PaginationPresenter().init(this.view);
    paginationView.updateComponent = () => {
      const delay = this.view.items.length * SPEED_SHOWING;
      VisialEffects.hideScaleOpacity(this.view.items, SPEED_SHOWING);

      window.setTimeout(() => {
        parentView.updateList();
      }, delay);
    };
    this.view.pagination = paginationView.element;


    const addMouseHandlers = (target) => {
      target.addEventListener(`mousemove`, itemMouseMoveHandler);
      target.addEventListener(`mouseout`, itemMouseOutHandler);
      target.addEventListener(`click`, this.view.btnDscriptionClickHandler);
    };


    const removeMouseHandlers = (target) => {
      target.removeEventListener(`mouseout`, itemMouseOutHandler);
      target.removeEventListener(`mousemove`, itemMouseMoveHandler);
      target.removeEventListener(`click`, this.view.btnDscriptionClickHandler);
    };


    const itemMouseMoveHandler = (evt) => {
      if (evt.target.classList.contains(`works__btn`)) {
        Utils.clearElement(this.view.modal);
        return;
      }
      const coords = {
        top: evt.clientY + OFFSET_FROM_CURSOR.y,
        left: evt.clientX + OFFSET_FROM_CURSOR.x
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


    const openDescription = () => {
      if (!this.view.state.currentWindow) {
        return;
      }

      this.dataItem = this.view.data.find((item) => item.id === this.view.state.currentWindow);

      itemDescription.init(this.dataItem, this.view.state, this.view.modal);
    };


    this.view.itemMouseOverHandler = (evt) => {
      evt.preventDefault();

      if (!evt.target.classList.contains(`works__btn`)) {
        addMouseHandlers(evt.target);
      }
      this.dataItem = this.view.data.find((item) => item.id === evt.currentTarget.dataset.item);
    };


    this.view.btnDscriptionClickHandler = (evt) => {
      evt.preventDefault();
      if (checkBtn(evt.target.classList)) {
        return;
      }
      removeMouseHandlers(evt.target);

      if (!this.view.state.currentWindow) {
        this.view.state.currentWindow = this.dataItem.id;
      }
      saveState(this.view.state);

      openDescription();
    };

    Utils.replaceOldElement(this.view.element, container);
    openDescription();
    VisialEffects.showScaleOpacity(this.view.items, SPEED_SHOWING);
    return this.view.container;
  }
}

export default WorksPresenter;

import PortfolioView from '../views/portfolio-view';
import FilterPresenter from '../presenter/filter-presenter';
import PaginationPresenter from '../presenter/pagination-presenter';
import itemFeatures from '../presenter/item-features-presenter';
import itemDescription from '../presenter/item-description-presenter';

import Utils from '../lib/utils';

class PortfolioPresenter {
  init(data, state) {
    this.view = new PortfolioView(data, state);

    const filterView = new FilterPresenter().init(this.view);
    this.view.filter = filterView.element;
    this.view.data = filterView.model.data;

    this.view.pagination = new PaginationPresenter().init(this.view).element;


    const addMouseHandlers = (target) => {
      target.addEventListener(`mousemove`, itemMouseMoveHandler);
      target.addEventListener(`mouseout`, itemMouseOutHandler);
      target.addEventListener(`click`, this.view.openDescription);
    };


    const removeMouseHandlers = (target) => {
      target.removeEventListener(`mouseout`, itemMouseOutHandler);
      target.removeEventListener(`mousemove`, itemMouseMoveHandler);
      target.removeEventListener(`click`, this.view.openDescription);
    };


    this.view.itemMouseOverHandler = (evt) => {
      evt.preventDefault();

      if (!evt.target.classList.contains(`works__btn`)) {
        addMouseHandlers(evt.target);
      }
      this.dataItem = this.view.data.find((item) => item.title === evt.currentTarget.dataset.item);
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


    this.view.openDescription = (evt) => {
      if (evt.target.classList.contains(`works__btn`)) {
        return;
      }
      removeMouseHandlers(evt.target);

      this.view.description = itemDescription.init(this.dataItem, this.view.state.currentTab, this.view.modal);
      Utils.displayElement(this.view.description.element, this.view.modal);
    };

    this.view.btnDscriptionClickHandler = (evt) => {
      evt.preventDefault();

      this.view.description = itemDescription.init(this.dataItem, this.view.state.currentTab, this.view.modal);
      Utils.displayElement(this.view.description.element, this.view.modal);
    };

    Utils.displayElement(this.view.element, `page-main`);
  }
}

export default new PortfolioPresenter();

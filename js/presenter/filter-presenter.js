import App from '../application';
import FilterModel from '../models/filter-model';
import FilterView from '../views/filter-view';
import Utils from '../lib/utils';
import {parametersOfApplication, FILTERS} from '../data/parameters';

class FilterPresenter {
  init(viewTab) {
    this.model = new FilterModel(viewTab);

    this.view = new FilterView(this.model);
    this.model.filterData();

    this.view.changeStateOption = (evt) => {
      evt.preventDefault();
      this.model.filters.forEach((item) => {
        if (item.type === `checkbox`) {
          this.changeStateCheckbox(item.options, evt.target);
          return;
        }
        this.changeStateRadio(item.options, evt.target);
      });
    };

    this.view.applyFilterSettings = (evt) => {
      evt.preventDefault();
      viewTab.state.currentPage[this.model.tab] = parametersOfApplication.FIRST_PAGE;
      App.changeTab(viewTab.state);
    };

    this.view.resetFilterSetting = () => {
      viewTab.state.currentFilter[this.model.tab] = Utils.deepClone(FILTERS[this.model.tab]);
      viewTab.state.currentPage[this.model.tab] = parametersOfApplication.FIRST_PAGE;
      App.changeTab(viewTab.state);
    };

    return this.view;
  }

  isCurrentSetting(options, id) {
    return options.some((option) => {
      return option.id === id;
    });
  }

  changeStateRadio(options, currentElement) {
    if (!this.isCurrentSetting(options, currentElement.id)) {
      return;
    }
    options.forEach((option) => {
      option.checked = (option.id === currentElement.id);
    });
  }

  changeStateCheckbox(options, currentElement) {
    options.forEach((option) => {
      if (option.id === currentElement.id) {
        option.checked = currentElement.checked;
      }
    });
  }
}

export default FilterPresenter;

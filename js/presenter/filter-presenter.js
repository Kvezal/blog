import FilterModel from '../models/filter-model';
import FilterView from '../views/filter-view';

import Utils from '../lib/utils';
import deepClone from '../lib/deep-clone';
import {saveState} from '../lib/change-url';
import {parametersOfApplication, FILTERS} from '../data/parameters';

class FilterPresenter {
  init(viewTab, container) {
    const filterElement = () => {
      this.model = new FilterModel(viewTab);
      this.view = new FilterView(this.model);
      this.model.filterData();
      viewTab.currentData = deepClone(this.model.data);
    };
    filterElement();


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
      saveState(viewTab.state);
      filterElement();
      viewTab.updateList();
    };


    this.view.resetFilterSetting = () => {
      viewTab.state.currentFilter[this.model.tab] = deepClone(FILTERS[this.model.tab]);
      viewTab.state.currentPage[this.model.tab] = parametersOfApplication.FIRST_PAGE;
      saveState(viewTab.state);
      filterElement();
      viewTab.updateList();
      viewTab.updateFilter();
    };

    Utils.replaceOldElement(this.view.element, container);
    return this.view.container;
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

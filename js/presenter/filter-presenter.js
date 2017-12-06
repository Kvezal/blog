import App from '../application';
import FilterView from '../views/filter-view';
import Utils from '../lib/utils';
import {parametersOfApplication} from '../data/parameters';

class FilterPresenter {
  init(parameters) {
    this.view = new FilterView(parameters.filters);

    this.view.changeStateOption = (evt) => {
      evt.preventDefault();
      parameters.filters.forEach((item) => {
        if (item.type === `radio`) {
          this.changeStateRadio(item.options, evt.target);
          return;
        }
        this.changeStateCheckbox(item.options, evt.target);
      });
    };

    this.view.applyFilterSettings = (evt) => {
      evt.preventDefault();
      const data = this.filterData(parameters.data, parameters.filters);
      const tab = Utils.toUpperCaseFirstLetter(parameters.state.currentTab);
      parameters.state[`currentPage${tab}`] = parametersOfApplication.FIRST_PAGE;
      App.changeTab(parameters.state, data);
    };

    this.view.resetFilterSetting = () => {
      App.changeTab(parameters.state);
    };

    Utils.replaceOldElement(this.view.element, parameters.oldElement);
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

  getCurrentSetting(filterSettings) {
    const currentSettings = {
      radios: [],
      checkboxes: []
    };

    filterSettings.forEach((setting) => {
      const type = setting.type;
      return setting.options.forEach((option) => {
        if (!option.checked) {
          return;
        }
        if (type === `radio`) {
          currentSettings.radios.push(option.id);
          return;
        }
        currentSettings.checkboxes.push(option.id);
      });
    });
    return currentSettings;
  }

  filterCheckboxes(data, checkboxes) {
    if (!checkboxes.length) {
      return [];
    }

    return data.filter((item) => {
      return item.features.some((feature) => {
        feature = feature.toLowerCase();
        return checkboxes.some((checkbox) => {
          return checkbox === feature;
        });
      });
    });
  }

  filterRadios(data, radios) {
    if (!radios.length) {
      return data;
    }

    return data.filter((item) => {
      return radios.every((radio) => {
        return item.features.some((feature) => {
          feature = feature.toLowerCase();
          return feature === radio;
        });
      });
    });
  }

  filterData(data, filters) {
    const currentSettings = this.getCurrentSetting(filters);
    const dataFirstFiltered = this.filterRadios(data, currentSettings.radios);
    const dataSecondFiltered = this.filterCheckboxes(dataFirstFiltered, currentSettings.checkboxes);
    return dataSecondFiltered;
  }
}

export default FilterPresenter;

class FilterModel {
  constructor(viewTab) {
    this.data = viewTab.data;
    this.state = viewTab.state;
    this.tab = this.state.currentTab;
    this.filters = this.state.currentFilter[this.tab];
  }

  filterData() {
    const currentSettings = this.getCurrentSetting(this.filters);
    this.filterRadios(currentSettings.radios);
    this.filterCheckboxes(currentSettings.checkboxes);
    return this.data;
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

  filterRadios(radios) {
    if (!radios.length) {
      return this;
    }

    this.data = this.data.filter((item) => {
      return radios.every((radio) => {
        if (radio === `new` || radio === `old`) {
          return true;
        }
        return item.features.some((feature) => {
          feature = feature.toLowerCase();
          return feature === radio;
        });
      });
    });

    radios.forEach((radio) => {
      if (radio === `new`) {
        this.data.sort((left, right) => left.date - right.date);
      } else if (radio === `old`) {
        this.data.sort((left, right) => right.date - left.date);
      }
    });

    return this;
  }

  filterCheckboxes(checkboxes) {
    if (!checkboxes.length) {
      this.data = [];
      return this;
    }

    this.data = this.data.filter((item) => {
      return item.features.some((feature) => {
        feature = feature.toLowerCase();
        return checkboxes.some((checkbox) => {
          return checkbox === feature;
        });
      });
    });
    return this;
  }
}

export default FilterModel;

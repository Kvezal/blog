import deepClone from './deep-clone';
import {initialState} from '../data/parameters';


const getArrayFromObject = (obj) => {
  const arrayElementsOfObject = [];

  if (typeof (obj) !== `object`) {
    return obj;
  }

  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    arrayElementsOfObject.push(obj[key]);
  }
  return arrayElementsOfObject;
};


const compressState = (state) => {
  const cloneState = deepClone(state);
  const parameters = getArrayFromObject(cloneState);
  let [tab, page, amountItems, filters, currentWindow] = parameters.map((item) => getArrayFromObject(item));
  filters = filters.map((filter) => {
    const settings = [];
    filter.forEach((item) => {
      item.options.forEach((option) => settings.push(Number(option.checked)));
    });
    return settings;
  });
  const stringfilters = filters.map((filter) => {
    return filter.join(``);
  }).join(`&`);
  const stringParameters = [tab, page, amountItems, stringfilters, currentWindow].join(`?`);
  return stringParameters;
};


const decompressState = (dataString) => {
  const cloneInitialState = deepClone(initialState);

  let [currentTab, currentPage, amountItems, currentFilter, currentWindow] = dataString.split(`?`);
  [currentPage, amountItems] = [currentPage, amountItems].map((parameter) => parameter.split(`,`).map((item) => +item));

  currentFilter = currentFilter.split(`&`).map((filter) => filter.split(``).map((item) => +item));

  const parameters = {
    currentTab,
    currentPage,
    amountItems,
    currentWindow
  };

  for (const key in parameters) {
    if (!parameters.hasOwnProperty(key)) {
      continue;
    }
    if (typeof (parameters[key]) !== `object`) {
      cloneInitialState[key] = parameters[key];
      continue;
    }
    const tab = cloneInitialState[key];
    const currentItem = parameters[key];

    for (const item in tab) {
      if (!tab.hasOwnProperty(item)) {
        continue;
      }

      tab[item] = currentItem.shift();
    }
  }

  const filters = cloneInitialState.currentFilter;
  for (const key in filters) {
    if (!filters.hasOwnProperty(key)) {
      continue;
    }
    const currentStateFilter = currentFilter.shift();
    filters[key].forEach((item) => {
      item.options.forEach((option) => {
        const curentOptionState = currentStateFilter.shift();
        option.checked = !!curentOptionState;
      });
    });
  }
  return cloneInitialState;
};


const saveState = (state) => {
  const encodeState = compressState(state);
  location.hash = encodeState;
};


const loadState = () => {
  try {
    const hashValue = location.hash.replace(`#`, ``);
    const state = decompressState(hashValue);
    return state;
  } catch (err) {
    return deepClone(initialState);
  }
};


export {saveState, loadState};

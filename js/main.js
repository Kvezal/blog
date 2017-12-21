(function () {
'use strict';

class Utils {
  static getElementFromTemplate(murkup) {
    const template = document.createElement(`template`);
    template.innerHTML = murkup;
    return template.content;
  }

  static clearElement(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  static displayElement(element, parent) {
    let parentElement = parent;
    if (typeof (parent) === `string`) {
      parentElement = document.querySelector(`.${parent}`);
    }
    Utils.clearElement(parentElement);
    parentElement.appendChild(element);
  }

  static replaceOldElement(newElement, oldElement) {
    oldElement.parentElement.replaceChild(newElement, oldElement);
  }

  static getTemplatePageList(amountDataItems, currentPage, maxAmountItemsOnPage) {
    const amountOfPage = Math.ceil(amountDataItems / maxAmountItemsOnPage);

    const pageList = [`<a class="pagination__item  pagination__item--prev  pagination__item--disabled">Назад</a>`];
    for (let i = 1; i <= amountOfPage; i++) {
      if (i === currentPage) {
        pageList.push(`<a class="pagination__item  pagination__item--current">${i}</a>`);
        continue;
      }
      pageList.push(`<a class="pagination__item" href="#">${i}</a>`);
    }
    pageList.push(`<a class="pagination__item  pagination__item--next" href="#">Вперед</a>`);
    return pageList.join(``);
  }

  static toUpperCaseFirstLetter(string) {
    return `${string.slice(0, 1).toUpperCase()}${string.slice(1)}`;
  }
}

class AbstractView {
  get template() {
    throw new Error(`You have to define template for view!`);
  }

  get element() {
    if (!this._element) {
      this._element = this.render();
    }
    const element = this._element.cloneNode(true);
    this.bind(element);
    return element;
  }

  bind() {

  }

  render() {
    return Utils.getElementFromTemplate(this.template);
  }
}

const deepClone = (obj) => {
  const string = JSON.stringify(obj);
  return JSON.parse(string);
};

const parametersOfApplication = {
  PAGE_BACK: -1,
  ITEMS_ON_PAGE_OF_SKILLS: 15,
  ITEMS_ON_PAGE_OF_PORTFOLIO: 6,
  ITEMS_ON_PAGE_OF_BLOG: 7,
  FIRST_PAGE: 1,
  SPREADING: 2,
  STEP: 1
};

const NAVIGATION_PARAMERETS = [
  {
    name: `Навыки`,
    id: ``
  },
  {
    name: `Образование`,
    id: `education`
  },
  {
    name: `Работы`,
    id: `portfolio`
  },
  {
    name: `Блог`,
    id: `blog`
  }
];

const FILTERS = {
  portfolio: [
    {
      title: `Сетка`,
      type: `radio`,
      options: [
        {
          label: `Фиксированная`,
          name: `layout`,
          id: `fixed`,
          checked: false
        },
        {
          label: `Адаптивная`,
          name: `layout`,
          id: `adaptive`,
          checked: false
        }
      ]
    },
    {
      title: `Тип работы`,
      type: `radio`,
      options: [
        {
          label: `Верстка(markup)`,
          name: `type`,
          id: `markup`,
          checked: false
        },
        {
          label: `SPA`,
          name: `type`,
          id: `spa`,
          checked: false
        }
      ]
    },
    {
      title: `Технологии`,
      type: `checkbox`,
      options: [
        {
          label: `SASS`,
          name: `sass`,
          id: `sass`,
          checked: true
        },
        {
          label: `LESS`,
          name: `less`,
          id: `less`,
          checked: true
        },
        {
          label: `ES5`,
          name: `es5`,
          id: `es5`,
          checked: true
        },
        {
          label: `ES6+`,
          name: `es6+`,
          id: `es6+`,
          checked: true
        },
        {
          label: `SVG`,
          name: `svg`,
          id: `svg`,
          checked: true
        },
        {
          label: `Promise`,
          name: `promise`,
          id: `promise`,
          checked: true
        }
      ]
    }
  ],

  blog: [
    {
      title: `По дате`,
      type: `radio`,
      options: [
        {
          label: `Сначала старые`,
          name: `date`,
          id: `old`,
          checked: false
        },
        {
          label: `Сначала новые`,
          name: `date`,
          id: `new`,
          checked: false
        }
      ]
    },
    {
      title: `Технологии`,
      type: `checkbox`,
      options: [
        {
          label: `JavaScript`,
          name: `js`,
          id: `js`,
          checked: true
        },
        {
          label: `CSS`,
          name: `css`,
          id: `css`,
          checked: true
        },
        {
          label: `HTML`,
          name: `html`,
          id: `html`,
          checked: true
        }
      ]
    }
  ]
};

const initialState = {
  currentTab: ``,
  currentPage: {
    skills: parametersOfApplication.FIRST_PAGE,
    portfolio: parametersOfApplication.FIRST_PAGE,
    blog: parametersOfApplication.FIRST_PAGE
  },
  amountItems: {
    skills: parametersOfApplication.ITEMS_ON_PAGE_OF_SKILLS,
    portfolio: parametersOfApplication.ITEMS_ON_PAGE_OF_PORTFOLIO,
    blog: parametersOfApplication.ITEMS_ON_PAGE_OF_BLOG
  },
  currentFilter: {
    portfolio: deepClone(FILTERS.portfolio),
    blog: deepClone(FILTERS.blog)
  },
  currentWindow: ``
};

class MainNavView extends AbstractView {
  constructor(state) {
    super();

    this.state = state;
  }

  get template() {
    return (
      `<nav class="main-nav">
        <ul class="main-nav__list">
          ${this.templateNavigationItems}
        </ul>
        <button class="main-nav__btn  main-nav__btn--close" type="button"></button>
      </nav>`
    );
  }

  get templateNavigationItems() {
    return NAVIGATION_PARAMERETS.map((item) => {
      const current = (this.state.currentTab === item.id) ? `main-nav__link--current` : ``;
      const href = (this.state.currentTab !== item.id) ? `href="#"` : ``;
      return (
        `<li class="main-nav__item">
          <a ${href} class="main-nav__link  ${current}" id="${item.id}">${item.name}</a>
        </li>`
      );
    }).join(``);
  }

  bind(element) {
    this.mainNavItems = element.querySelectorAll(`.main-nav__item`);

    this.tabs = element.querySelectorAll(`.main-nav__link`);
    this.tabs.forEach((item) => item.addEventListener(`click`, this.changeTab));

    const btn = element.querySelector(`.main-nav__btn`);
    btn.addEventListener(`click`, this.closeMenu);
  }
}

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

class MainNavPresenter {
  init(state) {
    this.view = new MainNavView(state);


    this.view.changeTab = (evt) => {
      evt.preventDefault();

      const tab = evt.target;

      if (tab.classList.contains(`main-nav__link--current`)) {
        return;
      }
      this.hideCurrentTab();

      tab.classList.add(`main-nav__link--current`);
      tab.removeAttribute(`href`);

      this.view.state.currentTab = tab.id;
      saveState(this.view.state);
      App.changeTab(this.view.state);
    };


    this.view.closeMenu = (evt) => {
      evt.preventDefault();

      const target = evt.target;

      if (target.classList.contains(`main-nav__btn--close`)) {
        target.classList.remove(`main-nav__btn--close`);
        this.view.mainNavItems.forEach((item) => {
          if (!item.firstElementChild.classList.contains(`main-nav__link--current`)) {
            item.classList.add(`main-nav__item--hidden`);
          } else {
            item.style.overflow = `hidden`;
          }
        });
        return;
      }
      target.classList.add(`main-nav__btn--close`);
      this.view.mainNavItems.forEach((item) => {
        if (!item.firstElementChild.classList.contains(`main-nav__link--current`)) {
          item.classList.remove(`main-nav__item--hidden`);
        } else {
          item.style.overflow = ``;
        }
      });
    };


    Utils.displayElement(this.view.element, `page-header`);
  }

  hideCurrentTab() {
    for (const tab of this.view.tabs) {
      if (tab.classList.contains(`main-nav__link--current`)) {
        tab.classList.remove(`main-nav__link--current`);
        tab.href = `#`;
        return;
      }
    }
  }
}

var mainNavPresenter = new MainNavPresenter();

class BlogView extends AbstractView {
  constructor(data, state) {
    super();

    this.data = data;
    this.state = state;
  }


  get template() {
    return (
      `<section class="blog">
        <section class="filter"></section>
        <section class="articles"></section>
      </section>`
    );
  }


  bind(element) {
    this.container = element.querySelector(`.blog`);
    this.filter = element.querySelector(`.filter`);
    this.articles = element.querySelector(`.articles`);
  }
}

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

class FilterView extends AbstractView {
  constructor(model) {
    super();

    this.model = model;
    this.filters = model.filters;
  }

  get template() {
    return (
      `<form href="#" method="get" class="filter">
        <h2 class="filter__title">Фильтр</h2>
        ${this.templateFIlterList}
        <button class="btn  filter__btn" type="submit">Применить</button>
        <button class="btn  filter__btn  filter__btn--reset" type="reset">Сбросить</button>
      </form>`
    );
  }

  get templateFIlterList() {
    return this.filters.map((item) => {
      return (
        `<fieldset class="filter__item">
          <legend class="filter__item-name">${item.title}:</legend>
          ${this.getTemplateFilterOptions(item.options, item.type)}
        </fieldset>`
      );
    }).join(``);
  }

  getTemplateFilterOptions(options, type) {
    return options.map((option) => {
      const checked = (option.checked === true) ? `checked` : ``;
      const value = (type === `radio`) ? `value="${option.id}"` : ``;

      return (
        `<input type="${type}" class="filter__${type}" name="${option.name}" id="${option.id}" ${value} ${checked}>
        <label class="filter__label-${type}" for="${option.id}">${option.label}</label>`
      );
    }).join(``);
  }

  bind(element) {
    const form = element.querySelector(`.filter`);
    form.addEventListener(`submit`, this.applyFilterSettings);
    form.addEventListener(`reset`, this.resetFilterSetting);

    const filterOptions = form.querySelectorAll(`input`);
    filterOptions.forEach((option) => {
      option.addEventListener(`change`, this.changeStateOption);
    });

    this.container = element.querySelector(`.filter`);
  }
}

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

class ArticlesView extends AbstractView {
  constructor(parentView) {
    super();

    this.data = parentView.currentData;
    this.state = parentView.state;
  }

  get template() {
    return (
      `<section class="articles">
        <h1 class="articles__title">Статьи</h1>
        <ul class="articles__list">
          ${this.templateList}
        </ul>
        <div class="pagination"></div>
        <div class="modal"></div>
      </section>`
    );
  }

  getTemplateListItem(item) {
    return (
      `<li class="articles__item">
        <p class="articles__name">${item.title} - ${item.shortDescription}</p>
        <a class="btn" href="${item.link}" data-date="${item.date}" data-item="${item.id}">Прочитать</a>
      </li>`
    );
  }

  get templateList() {
    const lastPage = this.state.currentPage[`blog`] + parametersOfApplication.PAGE_BACK;
    const startItemPage = lastPage * parametersOfApplication.ITEMS_ON_PAGE_OF_BLOG;
    const endItemPagethis = this.state.currentPage[`blog`] * parametersOfApplication.ITEMS_ON_PAGE_OF_BLOG;

    return this.data.slice(startItemPage, endItemPagethis).map((item) => {
      return this.getTemplateListItem(item);
    }).join(``);
  }

  bind(element) {
    this.modal = element.querySelector(`.modal`);
    this.items = element.querySelectorAll(`.articles__item`);

    const btns = element.querySelectorAll(`.btn`);
    btns.forEach((btn) => {
      btn.addEventListener(`click`, this.clickBtnHandler);
    });

    const pagination = element.querySelector(`.pagination`);
    Utils.replaceOldElement(this.pagination, pagination);

    this.container = element.querySelector(`.articles`);
  }
}

const PLACEHOLDER = `<span class="pagination__placeholder"> ... </span>`;

class PaginationView extends AbstractView {
  constructor(viewTab) {
    super();

    this.data = viewTab.data;
    this.state = viewTab.state;
  }

  get template() {
    return (
      `<div class="pagination">
        ${this.templateItems}
      </div>`
    );
  }

  get templateItems() {
    const tab = (this.state.currentTab !== ``) ? this.state.currentTab : `skills`;

    const amountOfPage = Math.ceil(this.data.length / this.state.amountItems[tab]);

    if (!amountOfPage) {
      return ``;
    }

    let startItem = this.state.currentPage[tab] - parametersOfApplication.SPREADING;
    startItem = (startItem > parametersOfApplication.FIRST_PAGE) ? startItem : parametersOfApplication.FIRST_PAGE;

    let endItem = this.state.currentPage[tab] + parametersOfApplication.SPREADING;
    endItem = (endItem < amountOfPage) ? endItem : amountOfPage;

    const pageList = [];

    const previous = (this.state.currentPage[tab] === parametersOfApplication.FIRST_PAGE) ?
      `<a class="pagination__item  pagination__item--prev  pagination__item--disabled">Назад</a>` :
      `<a class="pagination__item  pagination__item--prev" href="#">Назад</a>`;
    pageList.push(previous);

    if (startItem > parametersOfApplication.FIRST_PAGE) {
      const nextElementOfPagination = parametersOfApplication.FIRST_PAGE + parametersOfApplication.STEP;
      const paginationPlaceholder = (nextElementOfPagination === startItem) ?
        `<a class="pagination__item" href="#">${parametersOfApplication.FIRST_PAGE}</a>` :
        `<a class="pagination__item" href="#">${parametersOfApplication.FIRST_PAGE}</a> ${PLACEHOLDER}`;
      pageList.push(paginationPlaceholder);
    }

    for (let i = startItem; i <= endItem; i++) {
      if (i === this.state.currentPage[tab]) {
        pageList.push(`<a class="pagination__item  pagination__item--current">${i}</a>`);
        continue;
      }
      pageList.push(`<a class="pagination__item" href="#">${i}</a>`);
    }

    if (endItem < amountOfPage) {
      const previousElementOfPagination = amountOfPage - parametersOfApplication.STEP;
      const paginationPlaceholder = (previousElementOfPagination === endItem) ?
        `<a class="pagination__item" href="#">${amountOfPage}</a>` :
        `${PLACEHOLDER} <a class="pagination__item" href="#">${amountOfPage}</a>`;
      pageList.push(paginationPlaceholder);
    }

    const next = (this.state.currentPage[tab] === amountOfPage) ?
      `<a class="pagination__item  pagination__item--next  pagination__item--disabled">Вперед</a>` :
      `<a class="pagination__item  pagination__item--next" href="#">Вперед</a>`;
    pageList.push(next);

    return pageList.join(``);
  }

  bind(element) {
    const pages = element.querySelectorAll(`.pagination__item:not(.pagination__item--prev):not(.pagination__item--next):not(.pagination__item--current)`);
    pages.forEach((page) => page.addEventListener(`click`, this.showPage));

    const previous = element.querySelector(`.pagination__item--prev:not(.pagination__item--disabled)`);
    if (previous) {
      previous.addEventListener(`click`, this.showPreviousPage);
    }

    const next = element.querySelector(`.pagination__item--next:not(.pagination__item--disabled)`);
    if (next) {
      next.addEventListener(`click`, this.showNextPage);
    }

    this.container = element.querySelector(`.pagination`);
  }
}

class PaginationPresenter {
  init(viewTab) {
    this.view = new PaginationView(viewTab);

    const state = this.view.state;
    const tab = (state.currentTab !== ``) ? state.currentTab : `skills`;


    this.view.showPage = (evt) => {
      evt.preventDefault();
      state.currentPage[tab] = +evt.target.textContent;
      saveState(state);
      this.view.updateComponent();
    };


    this.view.showPreviousPage = (evt) => {
      evt.preventDefault();
      --state.currentPage[tab];
      saveState(state);
      this.view.updateComponent();
    };


    this.view.showNextPage = (evt) => {
      evt.preventDefault();
      ++state.currentPage[tab];
      saveState(state);
      this.view.updateComponent();
    };


    return this.view;
  }
}

class ItemDescriptionView extends AbstractView {
  constructor(data, tab) {
    super();

    this.data = data;
    this.tab = Utils.toUpperCaseFirstLetter(tab);
  }


  get template() {
    return this[`template${this.tab}Description`];
  }


  get templateEducationDescription() {
    return (
      `<section class="item-description">
        <div class="scroll-bar">
          <span class="scroll-bar__handl"></span>
        </div>
        <button class="item-description__close" type="button"></button>
        <div class="item-description__wrap">
          <img src="img/${this.data.name}.png">
          <a class="btn  item-description__btn" href="documents/${this.data.name}.pdf" target="_blank">Открыть в PDF</a>
        </div>
      </section>
      <div class="overlay"></div>`
    );
  }


  get templatePortfolioDescription() {
    return (
      `<section class="item-description">
        <div class="scroll-bar">
          <span class="scroll-bar__handl"></span>
        </div>
        <button class="item-description__close" type="button"></button>
        <div class="item-description__wrap">
          <h2 class="item-description__title">${this.data.title}</h2>
          <h3 class="item-description__subtitle">Особенности</h3>
          <ul class="item-description__list">
            ${this.templateDescriptionListOfElements}
          </ul>
          <h3 class="item-description__subtitle">Описание</h3>
          ${this.templateContent}
        </div>
      </section>
      <div class="overlay"></div>`
    );
  }


  get templateBlogDescription() {
    return (
      `<section class="item-description">
        <div class="scroll-bar">
          <span class="scroll-bar__handl"></span>
        </div>
        <button class="item-description__close" type="button"></button>
        <div class="item-description__wrap">
          <h2 class="item-description__title">${this.data.title}</h2>
          ${this.templateContent}
        </div>
      </section>
      <div class="overlay"></div>`
    );
  }


  get templateDescriptionListOfElements() {
    return this.data.features.map((feature) => {
      return `<li class="item-description__element">${feature}</li>`;
    }).join(``);
  }


  get templateContent() {
    const paragraphs = this.data.fullDescription.split(`\n\n`);

    return paragraphs.map((item) => {
      if (!item) {
        return `</br></br>`;
      }
      return (
        `<p class="item-description__text">${item.replace(`\n`, `</br>`)}</p>`
      );
    }).join(``);
  }


  bind(element) {
    const btnCloseDescription = element.querySelector(`.item-description__close`);
    btnCloseDescription.onclick = this.btnCloseDescriptionClickHandler;

    this.description = element.querySelector(`.item-description`);
    this.scrollBar = this.description.querySelector(`.scroll-bar`);
    this.scrollHandl = this.scrollBar.querySelector(`.scroll-bar__handl`);
    this.overlay = element.querySelector(`.overlay`);

    this.description.addEventListener(`wheel`, this.descriptionScroll);
  }
}

const OPACITY_HIDDEN = 0;
const OPACITY_SHOWING = 1;


const INITIAL_DELAY = 20;


class VisialEffects {
  static showElement(tab, delay) {
    tab.style.opacity = OPACITY_HIDDEN;
    tab.style.transitionDuration = `${delay}ms`;

    window.setTimeout(() => {
      tab.style.opacity = OPACITY_SHOWING;
    }, INITIAL_DELAY);
  }


  static hideElement(modal, delay) {
    modal.style.transitionDuration = `${delay}ms`;
    modal.style.opacity = OPACITY_HIDDEN;
  }


  static showOpacity(items, speedShowing) {
    items.forEach((item, index) => {
      item.style.opacity = OPACITY_HIDDEN;
      item.style.transitionDuration = `750ms`;

      window.setTimeout(() => {
        item.style.opacity = OPACITY_SHOWING;
      }, INITIAL_DELAY + speedShowing * index);
    });
  }


  static showScaleOpacity(items, speedShowing) {
    items.forEach((item, index) => {
      item.style.opacity = OPACITY_HIDDEN;
      item.style.transform = `scale(0.3)`;
      item.style.transitionDuration = `750ms`;

      window.setTimeout(() => {
        item.style.opacity = OPACITY_SHOWING;
        item.style.transform = `scale(1)`;
      }, INITIAL_DELAY + speedShowing * index);
    });
  }


  static showTranslateOpacity(items, speedShowing) {
    items.forEach((item, index) => {
      item.style.opacity = OPACITY_HIDDEN;
      item.style.transitionDuration = `1000ms`;

      item.style.transform = (index % 2) ? `translate(-150px)` :
        `translate(150px)`;

      window.setTimeout(() => {
        item.style.opacity = OPACITY_SHOWING;
        item.style.transform = `translate(0)`;
      }, INITIAL_DELAY + speedShowing * index);
    });
  }


  static hideOpacity(items, speedShowing) {
    items.forEach((item, index) => {
      item.style.transitionDuration = `250ms`;

      window.setTimeout(() => {
        item.style.opacity = OPACITY_HIDDEN;
      }, INITIAL_DELAY + speedShowing * index);
    });
  }


  static hideScaleOpacity(items, speedShowing) {
    items.forEach((item, index) => {
      item.style.transitionDuration = `250ms`;

      window.setTimeout(() => {
        item.style.opacity = OPACITY_HIDDEN;
        item.style.transform = `scale(0.3)`;
      }, INITIAL_DELAY + speedShowing * index);
    });
  }


  static hideTranslateOpacity(items, speedShowing) {
    items.forEach((item, index) => {
      item.style.transitionDuration = `250ms`;

      window.setTimeout(() => {
        item.style.opacity = OPACITY_HIDDEN;

        item.style.transform = (index % 2) ? `translate(-100px)` :
          `translate(100px)`;
      }, INITIAL_DELAY + speedShowing * index);
    });
  }
}

const SCROLL_STEP = 26;
const START_SCROLL_ELEMENT = 0;
const MIN_WIDTH_BROWSER = 1000;
const KEY_CODE_ESC = 27;
const TIME_SHOWING_MODAL = 500;
const TIME_HIDING_MODAL = 250;

class ItemDescriptionPresenter {
  init(data, state, wrapper) {
    this.view = new ItemDescriptionView(data, state.currentTab);

    const closeDescription = () => {
      window.removeEventListener(`keydown`, btnCloseDescriptionKeyPressHandler);
      state.currentWindow = ``;
      saveState(state);

      VisialEffects.hideElement(this.view.description, TIME_HIDING_MODAL);
      VisialEffects.hideElement(this.view.overlay, TIME_HIDING_MODAL);

      window.setTimeout(() => {
        Utils.clearElement(wrapper);
      }, TIME_HIDING_MODAL);
    };


    const btnCloseDescriptionKeyPressHandler = (evt) => {
      if (evt.keyCode === KEY_CODE_ESC) {
        closeDescription();
      }
    };


    this.view.btnCloseDescriptionClickHandler = (evt) => {
      evt.preventDefault();
      closeDescription();
    };


    this.view.descriptionScroll = (evt) => {
      if (window.innerWidth < MIN_WIDTH_BROWSER) {
        return;
      }

      evt.preventDefault();

      const target = evt.currentTarget;

      if (target.classList.contains(`item-description`)) {
        const wrap = target.querySelector(`.item-description__wrap`);
        const top = +wrap.style.transform.replace(/[A-z]|\(|\)/g, ``);

        const descriptionParameters = this.getElementParameters({
          element: this.view.description,
          coordY: top,
          shift: evt.deltaY
        });

        const scrollBarHeight = this.view.scrollBar.clientHeight;
        const scrollHandl = this.view.scrollHandl;
        scrollHandl.style.height = `${scrollBarHeight * descriptionParameters.ratio}px`;

        if (descriptionParameters.height >= descriptionParameters.contentHeight) {
          wrap.style.transform = ``;
          scrollHandl.style.transform = ``;
          return;
        }

        const scrollRatio = scrollBarHeight / descriptionParameters.height;
        const shiftScrollHandl = -(scrollRatio * descriptionParameters.ratio * descriptionParameters.shiftContent);

        wrap.style.transform = `translateY(${descriptionParameters.shiftContent}px)`;
        scrollHandl.style.transform = `translateY(${shiftScrollHandl}px)`;
      }
    };


    window.addEventListener(`keydown`, btnCloseDescriptionKeyPressHandler);
    Utils.displayElement(this.view.element, wrapper);

    VisialEffects.showElement(this.view.description, TIME_SHOWING_MODAL);
    VisialEffects.showElement(this.view.overlay, TIME_SHOWING_MODAL);
  }

  getElementParameters(params) {
    const styleElement = getComputedStyle(params.element);
    const paddings = +styleElement.paddingTop.replace(/\D/g, ``) +
        +styleElement.paddingBottom.replace(/\D/g, ``);

    const height = params.element.clientHeight - paddings;
    const scrollHeight = params.element.scrollHeight;
    const contentHeight = scrollHeight - paddings;
    const scrollEnd = -(contentHeight - height);
    const ratio = height / contentHeight;

    let shiftContent = params.coordY + SCROLL_STEP;
    shiftContent = (shiftContent > START_SCROLL_ELEMENT) ? START_SCROLL_ELEMENT : shiftContent;
    shiftContent = (params.shift > 0) ? params.coordY - SCROLL_STEP : shiftContent;
    shiftContent = (shiftContent < scrollEnd) ? scrollEnd : shiftContent;

    return {
      height,
      contentHeight,
      shiftContent,
      ratio
    };
  }
}

var itemDescription = new ItemDescriptionPresenter();

const SPEED_SHOWING = 60;


class ArticlesPresenter {
  init(parentView, container) {
    this.view = new ArticlesView(parentView);


    const paginationView = new PaginationPresenter().init(this.view);
    paginationView.updateComponent = () => {
      const delay = this.view.items.length * SPEED_SHOWING;
      VisialEffects.hideTranslateOpacity(this.view.items, SPEED_SHOWING);

      window.setTimeout(() => {
        parentView.updateList();
      }, delay);
    };
    this.view.pagination = paginationView.element;


    const openDescription = () => {
      if (!this.view.state.currentWindow) {
        return;
      }

      const dataItem = this.view.data.find((item) => item.id === this.view.state.currentWindow);
      this.view.description = itemDescription.init(dataItem, this.view.state, this.view.modal);
    };


    this.view.clickBtnHandler = (evt) => {
      evt.preventDefault();

      this.view.state.currentWindow = evt.currentTarget.dataset.item;
      saveState(this.view.state);
      openDescription();
    };


    Utils.replaceOldElement(this.view.element, container);
    openDescription();
    VisialEffects.showTranslateOpacity(this.view.items, SPEED_SHOWING);
    return this.view.container;
  }
}

class BlogPresenter {
  init(data, state) {
    this.view = new BlogView(data, state);


    this.view.updateFilter = () => {
      this.view.filter = new FilterPresenter().init(this.view, this.view.filter);
    };


    this.view.updateList = () => {
      this.view.articles = new ArticlesPresenter().init(this.view, this.view.articles);
    };


    Utils.displayElement(this.view.element, `page-main`);
    this.view.updateFilter();
    this.view.updateList();

    return this.view.container;
  }
}

var blogPresenter = new BlogPresenter();

class SkillsView extends AbstractView {
  constructor(data, state) {
    super();

    this.data = data;
    this.state = state;
  }

  get template() {
    return (
      `<section class="skills">
        <h1 class="skills__title">Навыки</h1>
        ${this.templateList}
        <div class="pagination"></div>
      </section>`
    );
  }

  getTemplateListItem(item) {
    return (
      `<li class="skills__item">${item};</li>`
    );
  }

  get templateList() {
    const currentPage = this.state.currentPage[`skills`];
    const lastPage = currentPage + parametersOfApplication.PAGE_BACK;
    const startItemPage = lastPage * this.state.amountItems[`skills`];
    const endItemPagethis = currentPage * this.state.amountItems[`skills`];

    const list = this.data.slice(startItemPage, endItemPagethis).map((item) => {
      return this.getTemplateListItem(item);
    });
    const indexLastItem = list.length - 1;
    list[indexLastItem] = list[indexLastItem].replace(/;/, ``);
    return (
      `<ol class="skills__list" start="${startItemPage + 1}">
        ${list.join(``)}
      </ol>`
    );
  }

  bind(element) {
    this.container = element.querySelector(`.skills`);

    const pagination = element.querySelector(`.pagination`);
    Utils.replaceOldElement(this.pagination, pagination);

    this.items = element.querySelectorAll(`.skills__item`);
  }
}

const SPEED_SHOWING$1 = 50;


class SkillsPresenter {
  init(data, state) {
    this.view = new SkillsView(data, state);


    const paginationView = new PaginationPresenter().init(this.view);
    paginationView.updateComponent = () => {
      const delay = this.view.items.length * SPEED_SHOWING$1;
      VisialEffects.hideOpacity(this.view.items, SPEED_SHOWING$1);

      window.setTimeout(() => {
        new SkillsPresenter().init(this.view.data, this.view.state);
      }, delay);
    };
    this.view.pagination = paginationView.element;


    Utils.displayElement(this.view.element, `page-main`);
    VisialEffects.showOpacity(this.view.items, SPEED_SHOWING$1);

    return this.view.container;
  }
}


var skillsPresenter = new SkillsPresenter();

class EducationView extends AbstractView {
  constructor(data) {
    super();

    this.data = data;
  }

  get template() {
    return (
      `<section class="education">
        <h1 class="education__title">Образование</h1>
        <div class="education__wrap">
          ${this.templatesLists}
        </div>
        <div class="modal"></div>
      </section>`
    );
  }

  get templatesLists() {
    const descriptionItems = [];
    const certificates = [];

    this.data.forEach((item) => {
      descriptionItems.push(this.getTemplateDescriptionItem(item));
      certificates.push(this.getTemplateCertificate(item));
    });

    return (
      `<ul class="descriptions">
        <li class="descriptions__item">
          <p class="descriptions__text">
            <span class="descriptions__name">Высшее техническое:</span>
            “Ангарская Государственная Техническая Академия”
          </p>
          <p class="descriptions__text">
            <span class="descriptions__name">Факультет:</span>
            "Техническая Кибернетика”
          </p>
          <p class="descriptions__text">
            <span class="descriptions__name">Кафедра:</span>
            Промышленная электроника и информационно-измерительная техника”<br>
            (специалитет 2010 - 2015г., очная форма обучения)
          </p>
        </li>
        ${descriptionItems.join(``)}
      </ul>
      <ul class="certificates">
        ${certificates.join(``)}
      </ul>`
    );
  }

  getTemplateDescriptionItem(item) {
    return (
      `<li class="descriptions__item">
        <p class="descriptions__text">
          <span class="descriptions__name">${item.type}:</span>
          “${item.title}”
        </p>
        <p class="descriptions__text">
          <span class="descriptions__name">Дата прохождения:</span>
          ${item.data}
        </p>
        <p class="descriptions__text">
          <span class="descriptions__name">Соответствия критериям:</span>
          ${item.state}
        </p>
      </li>`
    );
  }

  getTemplateCertificate(item) {
    return (
      `<li class="certificates__item">
        <a class="certificates__link" href="/documents/${item.name}.pdf" data-item="${item.id}">
          <img class="certificates__image" src="img/${item.name}@1x.jpg" srcset="img/${item.name}@2x.jpg 2x">
        </a>
      </li>`
    );
  }

  bind(element) {
    this.container = element.querySelector(`.education`);

    const items = element.querySelectorAll(`.certificates__link`);
    items.forEach((item) => item.addEventListener(`click`, this.certificateItemHandler));

    this.modal = element.querySelector(`.modal`);
  }
}

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

    return this.view.container;
  }
}

var educationPresenter = new EducationPresenter();

class PortfolioView extends AbstractView {
  constructor(data, state) {
    super();

    this.data = data;
    this.state = state;
  }

  get template() {
    return (
      `<section class="portfolio">
        <section class="filter"></section>
        <section class="works"></section>
      </section>`
    );
  }

  bind(element) {
    this.container = element.querySelector(`.portfolio`);
    this.filter = element.querySelector(`.filter`);
    this.works = element.querySelector(`.works`);
  }
}

class WorksView extends AbstractView {
  constructor(parentView) {
    super();

    this.data = parentView.currentData;
    this.state = parentView.state;
  }

  get template() {
    return (
      `<section class="works">
        <h1 class="works__title">Работы</h1>
        <ul class="works__list">
          ${this.templateList}
        </ul>
        <div class="pagination"></div>
        <div class="modal"></div>
      </section>`
    );
  }

  getTemplateListItem(item) {
    return (
      `<li class="works__item" data-item="${item.id}">
        <p class="works__name">
          <span>${item.title}</span>
          &#8211; ${item.shortDescription}
        </p>
        <div class="works__wrap">
          <a class="btn  works__btn  works__btn--description" href="#" target="_blank" data-item="${item.id}">Описание</a>
          <a class="btn  works__btn" href="${item.link}" target="_blank">Перейти на сайт</a>
        </div>
      </li>`
    );
  }

  get templateList() {
    const currentPage = this.state.currentPage[`portfolio`];
    const lastPage = currentPage + parametersOfApplication.PAGE_BACK;
    const startItemPage = lastPage * this.state.amountItems[`portfolio`];
    const endItemPagethis = currentPage * this.state.amountItems[`portfolio`];

    return this.data.slice(startItemPage, endItemPagethis).map((item) => {
      return this.getTemplateListItem(item);
    }).join(``);
  }

  bind(element) {
    this.modal = element.querySelector(`.modal`);

    const pagination = element.querySelector(`.pagination`);
    Utils.replaceOldElement(this.pagination, pagination);

    this.items = element.querySelectorAll(`.works__item`);
    this.items.forEach((item) => item.addEventListener(`mouseover`, this.itemMouseOverHandler));

    const descriptionBtns = element.querySelectorAll(`.works__btn--description`);
    descriptionBtns.forEach((btn) => {
      btn.addEventListener(`click`, this.btnDscriptionClickHandler);
    });

    this.container = element.querySelector(`.works`);
  }
}

class ItemFeaturesView extends AbstractView {
  constructor(data, coords) {
    super();

    this.data = data;
    this.coords = coords;
  }

  get template() {
    return (
      `<section class="item-features" style="top: ${this.coords.top}px; left: ${this.coords.left}px">
        <h3 class="item-features__title">Особенности</h3>
          <ul class="item-features__list">
            ${this.templateElementsFeatureList}
          </ul>
        <p class="item-features__helper">
          Подробнее
          <svg class="item-features__svg" width="20" height="32" viewBox="0 0 60 100">
            <ellipse stroke-width="4" stroke="#000" fill="none" rx="28" ry="48" cx="30" cy="50" />
            <line stroke-width="4" stroke="#000" x1="4" y1="50" x2="56" y2="50" />
            <polygon stroke-width="4" points="32,4 32,50 3,50 5,30 8,20 16,8 20,5 25,3"/>
            <polyline stroke-width="4" stroke="#000" points="14,1 11,3 7,7 6,8 5,10 3,13 1,20 "/>
          </svg>
        </p>
      </section>`
    );
  }

  get templateElementsFeatureList() {
    const features = this.data.features;

    return features.map((feature) => {
      return `<li class="item-features__element">${feature}</li>`;
    }).join(`, `);
  }
}

class ItemFeaturesPresenter {
  init(data, coords) {
    this.view = new ItemFeaturesView(data, coords);
    return this.view;
  }
}

var itemFeatures = new ItemFeaturesPresenter();

const OFFSET_FROM_CURSOR = {
  y: 15,
  x: 15
};

const SPEED_SHOWING$2 = 60;


class WorksPresenter {
  init(parentView, container) {
    this.view = new WorksView(parentView);


    const paginationView = new PaginationPresenter().init(this.view);
    paginationView.updateComponent = () => {
      const delay = this.view.items.length * SPEED_SHOWING$2;
      VisialEffects.hideScaleOpacity(this.view.items, SPEED_SHOWING$2);

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
    VisialEffects.showScaleOpacity(this.view.items, SPEED_SHOWING$2);
    return this.view.container;
  }
}

class PortfolioPresenter {
  init(data, state) {
    this.view = new PortfolioView(data, state);


    this.view.updateFilter = () => {
      this.view.filter = new FilterPresenter().init(this.view, this.view.filter);
    };


    this.view.updateList = () => {
      this.view.works = new WorksPresenter().init(this.view, this.view.works);
    };


    Utils.displayElement(this.view.element, `page-main`);
    this.view.updateFilter();
    this.view.updateList();

    return this.view.container;
  }
}

var portfolioPresenter = new PortfolioPresenter();

const PLACE_HOLDER = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis ut diam quam nulla porttitor massa id. Neque convallis a cras semper auctor neque vitae. Bibendum at varius vel pharetra vel turpis nunc eget lorem. Sagittis eu volutpat odio facilisis mauris sit. Risus nec feugiat in fermentum posuere urna. Eleifend mi in nulla posuere. Habitant morbi tristique senectus et netus et malesuada fames ac. Vel eros donec ac odio tempor orci dapibus ultrices in. Duis ultricies lacus sed turpis tincidunt id aliquet. Eu scelerisque felis imperdiet proin. Nibh ipsum consequat nisl vel pretium. In nisl nisi scelerisque eu.

Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Nunc non blandit massa enim. Urna et pharetra pharetra massa massa ultricies mi quis hendrerit. Duis ultricies lacus sed turpis tincidunt id aliquet. Pellentesque adipiscing commodo elit at imperdiet dui. Non arcu risus quis varius quam quisque. Vel pharetra vel turpis nunc eget lorem dolor sed viverra. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Elementum tempus egestas sed sed risus pretium quam. Gravida neque convallis a cras semper. Id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. Elit ullamcorper dignissim cras tincidunt. Fermentum et sollicitudin ac orci phasellus egestas. Ac felis donec et odio pellentesque diam.

Bibendum ut tristique et egestas quis ipsum suspendisse ultrices gravida. Nullam vehicula ipsum a arcu cursus. Tincidunt vitae semper quis lectus nulla at volutpat diam ut. Tellus cras adipiscing enim eu turpis egestas. Tincidunt dui ut ornare lectus sit amet est. Tellus mauris a diam maecenas sed enim ut. Mattis nunc sed blandit libero volutpat sed. Orci dapibus ultrices in iaculis nunc sed augue lacus viverra. Dignissim cras tincidunt lobortis feugiat vivamus at. Porta lorem mollis aliquam ut porttitor leo a.

Consectetur adipiscing elit duis tristique sollicitudin. Sed turpis tincidunt id aliquet. Erat pellentesque adipiscing commodo elit at imperdiet dui. Volutpat sed cras ornare arcu dui vivamus. Turpis massa sed elementum tempus egestas sed. Vel facilisis volutpat est velit egestas dui. Ornare massa eget egestas purus viverra accumsan. Ut placerat orci nulla pellentesque dignissim. Fermentum odio eu feugiat pretium nibh. Mi ipsum faucibus vitae aliquet. Dignissim sodales ut eu sem integer vitae justo eget. Pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada. Tincidunt nunc pulvinar sapien et ligula. Dui faucibus in ornare quam viverra orci sagittis. Maecenas sed enim ut sem viverra aliquet. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor. In nibh mauris cursus mattis molestie a.`;


var data = {
  skills: [
    `HTML5`,
    `Семантичная и валидная верстка`,
    `Адаптивная графика(ретинизация и кадрирование изображений)`,
    `CSS`,
    `Кроссбраузерная и pixel-perfect верстка`,
    `Построение адаптивных сеток`,
    `Анимация`,
    `JS`,
    `Проектирование приложений`,
    `MVP`,
    `ES6+`,
    `Gulp`,
    `Git`,
    `AJAX`,
    `Promise`,
    `LESS`,
    `SASS`,
    `БЭМ методология`,
    `Mobile first`,
    `Progressive enhancement`,
    `Соблюдение принципа DRY`,
    `Написание оптимизированного кода`
  ],

  education: [
    {
      name: `basicHTML&CSS`,
      type: `Интенсив`,
      title: `Базовый HTML и CSS`,
      data: `16 января - 22 февраля 2017г.`,
      state: `100%`,
      id: `e1`
    },
    {
      name: `advancedHTML&CSS`,
      type: `Интенсив`,
      title: `“Продвинутый HTML и CSS”`,
      data: `22 мая - 28 июня 2017г.`,
      state: `100%`,
      id: `e2`
    },
    {
      name: `basicJS`,
      type: `Интенсив`,
      title: `Базовый JavaScript`,
      data: `8 августа - 20 сентября 2017г.`,
      state: `100%`,
      id: `e3`
    },
    {
      name: `advancedJS`,
      type: `Интенсив`,
      title: `Продвинутый JavaScript`,
      data: `26 сентября - 8 ноября 2017г.`,
      state: `100%`,
      id: `e4`
    }
  ],

  portfolio: [
    {
      title: `Gllacy`,
      link: `https://kvezal.github.io/gllacy/`,
      features: [
        `Markup`,
        `Fixed`,
        `Progressive`,
        `Pixel-Perfect`,
        `ES5`,
        `Базовая оптимизация`,
        `Валидный код`
      ],
      id: `p1`,
      shortDescription: `интернет-магазин мороженого.`,
      fullDescription: `Верстка проекта реализована в соответствии с PSD-макетом, соблюден "Pixel-Perfect". В процессе разработки использовался подход "Progressive Enhancement". Использовано немного нативного JS для реализации всплывающего окна и подключения Яндекс карты с помощью API (при выключеном JS, кнопка вызывающая появление модального окна, будет осуществлять переход на отдельную страницу, а роль карты исполняет фоновое изображение блока с картой). Произведена базовая оптимизация проекта(использованы спрайты для растровых иконок и минифицирован CSS и JS). Выполнена резиновая верстка в диападоне от 900 до 1200px.`
    },
    {
      title: `Nerds`,
      link: `https://kvezal.github.io/nerds/`,
      features: [
        `Markup`,
        `Fixed`,
        `Progressive`,
        `Pixel-Perfect`,
        `ES5`,
        `Базовая оптимизация`,
        `Валидный код`
      ],
      id: `p2`,
      shortDescription: `сайт web-студии.`,
      fullDescription: `Верстка проекта реализована в соответствии с PSD-макетом, соблюден "Pixel-Perfect". В процессе разработки использовался подход "Progressive Enhancement". Использовано немного нативного JS для реализации всплывающего окна и подключения Яндекс карты с помощью API. Произведена базовая оптимизация проекта(использованы спрайты для растровых иконок и минифицирован CSS и JS).`
    },
    {
      title: `Technomart`,
      link: `https://kvezal.github.io/technomart/`,
      features: [
        `Markup`,
        `Fixed`,
        `Progressive`,
        `Pixel-Perfect`,
        `ES5`,
        `Базовая оптимизация`,
        `Валидный код`
      ],
      id: `p3`,
      shortDescription: `интернет-магазин строительных материалов и инструментов для ремонта.`,
      fullDescription: `Верстка проекта реализована в соответствии с PSD-макетом, соблюден "Pixel-Perfect". В процессе разработки использовался подход "Progressive Enhancement". Использовано немного нативного JS для реализации всплывающего окна и подключения Яндекс карты с помощью API. Произведена базовая оптимизация проекта(использованы спрайты для растровых иконок и минифицирован CSS и JS).`
    },
    {
      title: `Sedona`,
      link: `https://kvezal.github.io/sedona/`,
      features: [
        `Markup`,
        `Fixed`,
        `Progressive`,
        `Pixel-Perfect`,
        `ES5`,
        `Базовая оптимизация`,
        `Валидный код`
      ],
      id: `p4`,
      shortDescription: `информационный сайт для туристов.`,
      fullDescription: `Верстка проекта реализована в соответствии с PSD-макетом, соблюден "Pixel-Perfect". В процессе разработки использовался подход "Progressive Enhancement". Использовано немного нативного JS для реализации всплывающего окна и подключения Google карты с помощью API. Произведена базовая оптимизация проекта(использованы спрайты для растровых иконок и минифицирован CSS и JS). Выполнена резиновая верстка в диападоне от 768 до 1200px.`
    },
    {
      title: `Device`,
      link: `https://kvezal.github.io/device/`,
      features: [
        `Markup`,
        `Fixed`,
        `LESS`,
        `Gulp`,
        `Progressive`,
        `Pixel-Perfect`,
        `ES5`,
        `Базовая оптимизация`,
        `Валидный код`
      ],
      id: `p5`,
      shortDescription: `интернет-магазин гаджетов.`,
      fullDescription: `Верстка проекта реализована в соответствии с PSD-макетом, соблюден "Pixel-Perfect". В процессе разработки использовался подход "Progressive Enhancement". Использовано немного нативного JS для реализации всплывающего окна и подключения Яндекс карты с помощью API (при выключеном JS, кнопка вызывающая появление модального окна, будет осуществлять переход на отдельную страницу, а роль карты исполняет фоновое изображение блока с картой). Произведена базовая оптимизация проекта(использованы спрайты для растровых иконок и минифицирован CSS и JS). Первая попытка работы с CSS-препроцессором и сборщиком проектов(в данном случае использовались препроцессор LESS и сборщик Gulp).`
    },
    {
      title: `Mishka`,
      link: `https://kvezal.github.io/mishka/`,
      features: [
        `Markup`,
        `Adaptive`,
        `Retina`,
        `Кадрирование изображений`,
        `SASS`,
        `SVG`,
        `Gulp`,
        `БЭМ`,
        `Mobile First`,
        `Graceful Degradation`,
        `Pixel-Perfect`,
        `ES5`,
        `Оптимизация`,
        `Валидный код`
      ],
      id: `p6`,
      shortDescription: `интернет-магазин вязаных игрушек.`,
      fullDescription: `Верстка проекта реализована в соответствии с PSD-макетом, соблюден "Pixel-Perfect". В процессе разработки использовались подход "Graceful Degradation" и "Mobile First", также использовалась БЭМ-методология. Использовано немного нативного JS для реализации всплывающего окна, меню (в мобильной версии сайта) и подключения Яндекс карты с помощью API (при выключеном JS в качестве карты выступает фоновое изображение блока к которому подключается карта). Сделана раскадровка и ретинизация изображений с целью ускорения загрузки страницы, чтобы качество изображений было одинакого высоким как на ретиновых, так и на обычных экранах. Произведена сборка и базовая оптимизация проекта с помощью Gulp (оптимизация графики, SVG-спрайты, сборка CSS из SASS, минификация JS и собранного CSS, автоприфексование свойств и группировка media-выражений).`
    },
    {
      title: `Pink`,
      link: `https://kvezal.github.io/pink/`,
      features: [
        `Markup`,
        `Adaptive`,
        `Retina`,
        `Кадрирование изображений`,
        `SASS`,
        `SVG`,
        `Gulp`,
        `БЭМ`,
        `Mobile First`,
        `Progressive Enhancement`,
        `Pixel-Perfect`,
        `ES5`,
        `Оптимизация`,
        `Валидный код`
      ],
      id: `p7`,
      shortDescription: `промо-сайт приложения.`,
      fullDescription: `Верстка проекта реализована в соответствии с PSD-макетом, соблюден "Pixel-Perfect". В процессе разработки использовались подход "Progressive Enhancement" и "Mobile First", также использовалась БЭМ-методология. Использовано немного нативного JS для реализации всплывающего окна, меню (в мобильной версии сайта) и подключения Яндекс карты с помощью API (при выключеном JS в качестве карты выступает фоновое изображение блока к которому подключается карта). Сделана раскадровка и ретинизация изображений с целью ускорения загрузки страницы, чтобы качество изображений было одинакого высоким как на ретиновых, так и на обычных экранах. Произведена базовая сборка и оптимизация проекта с помощью Gulp (оптимизация графики, SVG-спрайты, сборка CSS из SASS, минификация JS и собранного CSS, автоприфексование свойств и группировка media-выражений).`
    },
    {
      title: `Portfolio`,
      link: `https://kvezal.github.io/portfolio/`,
      features: [
        `Дизайн`,
        `Markup`,
        `Adaptive`,
        `Retina`,
        `Кадрирование изображений`,
        `SASS`,
        `SVG`,
        `Gulp`,
        `БЭМ`,
        `Mobile First`,
        `Progressive Enhancement`,
        `Оптимизация`,
        `Валидный код`
      ],
      id: `p8`,
      shortDescription: `сайт-портфолио.`,
      fullDescription: `В процессе разработки использовались подход "Progressive Enhancement" и "Mobile First", также использовалась БЭМ-методология. Сделана раскадровка и ретинизация изображений с целью ускорения загрузки страницы, чтобы качество изображений было одинакого высоким как на ретиновых, так и на обычных экранах. Произведена базовая сборка и оптимизация проекта с помощью Gulp (оптимизация графики, SVG-спрайты, сборка CSS из SASS, минификация JS и собранного CSS, автоприфексование свойств и группировка media-выражений). Проект разрабатывался с учетом неработоспособного JS.`
    },
    {
      title: `Keksobooking`,
      link: `https://kvezal.github.io/keksobooking/`,
      tasks: `documents/specification-keksobooking.md`,
      features: [
        `Fixed`,
        `SPA`,
        `ES5`,
        `Функциональный стиль`,
        `Модульность`,
        `AJAX`
      ],
      id: `p9`,
      shortDescription: `сервис размещения объявлений о сдаче в аренду недвижимости в центре Токио.`,
      fullDescription: `Выполнена загрузка данных с сервера с последующим их отображением на карте в виде меток, при нажатии на которые осуществляется появление карточки для текущей метки. Так же реализовано перетаскивание метки с последующей синхронизацией ее с полем "Адрес" (так же можно задавать координаты внутри этого поля). Написана логика для интерактивной фильтрации полученных элементов по категориям: тип жилья, цена, количество комнат, количество гостей и особенности. Выполнена валидация и синхронизация полей ввода, добавлена возможность загрузки фотографий. При нажатии на кнопку "Опубликовать", данные проверяются на валидность и в случае успеха отправляются на сервер, при этом происходит сброс введенных данных. Обмен данными с сервером осуществляется посредством AJAX (получение и публикация данных). Код написан модульно, использован функциональный стиль. Произведена оптимизация логики исполнения кода.`
    },
    {
      title: `Kekstagram`,
      link: `https://kvezal.github.io/kekstagram/`,
      tasks: `documents/specification-kekstagram.md`,
      features: [
        `Fixed`,
        `SPA`,
        `ES5`,
        `Функциональный стиль`,
        `Модульность`,
        `AJAX`
      ],
      id: `p10`,
      shortDescription: `сервис просмотра изображений.`,
      fullDescription: `Выполнена загрузка данных с сервера с последующим их отображением в галерее в виде фотографий загруженных пользователями, при нажатии на которые появляется модальное окно с исходным размером фотографии. Реализована загрузка фотографии при нажатии на иконку фотоаппарата с последующим наложением на загруженное фото одного из эффектов (хром, сепия, марвин, фобос или зной) и регулировка выбранного эффекта с помощью ползунка. Выполнена валидация полей ввода (хэш-теги, комментарии). При нажатии на кнопку публикации, данные отправляются на сервер, при этом окно с загруженной фотографией закрывается и происходит сброс введенных данных. Написана логика для интерактивной фильтрации полученных элементов по категориям: рекомендуемые, популярные, обсуждаемые и случайные. Обмен данными с сервером осуществляется посредством AJAX (получение и публикация данных). Код написан модульно, использован функциональный стиль. Произведена оптимизация логики исполнения кода.`
    },
    {
      title: `Pixel Hunter`,
      link: `https://kvezal.github.io/pixel-hunter/`,
      tasks: `documents/specification-pixel-hunter.md`,
      features: [
        `Fixed`,
        `SPA`,
        `Проектирование приложения`,
        `ES6+`,
        `Gulp`,
        `MVP`,
        `Модульность`,
        `Promise`
      ],
      id: `p11`,
      shortDescription: `онлайн-игра в которой игроку предлагается отличать фотографии от фотореалистичных изображений.`,
      fullDescription: `Приложение спроектировано в соответствии с паттерном MVP, также произведено проектирование структуры данных, с последующей адаптацией приходящих с сервера данных, под ранее созданную структуру (ранее была неизвестна организация данных на серверной стороне, для чего и потребовалось их адаптировать под используемую в проекте структуру). Функционал проекта реализован в соответствии с техническим заданием. Весь код организован в соответствии с принципом dry. Осуществлена оптимизация кода.`
    }
  ],

  blog: [
    {
      title: `Название статьи 1`,
      link: `#`,
      date: `${new Date() - 1}`,
      article: `Текст статьи`,
      features: [
        `html`
      ],
      id: `b1`,
      shortDescription: `Описание 1`,
      fullDescription: PLACE_HOLDER
    },
    {
      title: `Название статьи 2`,
      link: `#`,
      date: `${new Date() - 2}`,
      article: `Текст статьи`,
      features: [
        `css`
      ],
      id: `b2`,
      shortDescription: `Описание 2`,
      fullDescription: PLACE_HOLDER
    },
    {
      title: `Название статьи 3`,
      link: `#`,
      date: `${new Date() - 3}`,
      article: `Текст статьи`,
      features: [
        `js`
      ],
      id: `b3`,
      shortDescription: `Описание 3`,
      fullDescription: PLACE_HOLDER
    },
    {
      title: `Название статьи 4`,
      link: `#`,
      date: `${new Date() - 4}`,
      article: `Текст статьи`,
      features: [
        `css`
      ],
      id: `b4`,
      shortDescription: `Описание 4`,
      fullDescription: PLACE_HOLDER
    },
    {
      title: `Название статьи 5`,
      link: `#`,
      date: `${new Date() - 5}`,
      article: `Текст статьи`,
      features: [
        `js`
      ],
      id: `b5`,
      shortDescription: `Описание 5`,
      fullDescription: PLACE_HOLDER
    },
    {
      title: `Название статьи 6`,
      link: `#`,
      date: `${new Date() - 6}`,
      article: `Текст статьи`,
      features: [
        `css`
      ],
      id: `b6`,
      shortDescription: `Описание 6`,
      fullDescription: PLACE_HOLDER
    },
    {
      title: `Название статьи 7`,
      link: `#`,
      date: `${new Date() - 7}`,
      article: `Текст статьи`,
      features: [
        `js`
      ],
      id: `b7`,
      shortDescription: `Описание 7`,
      fullDescription: PLACE_HOLDER
    },
    {
      title: `Название статьи 8`,
      link: `#`,
      date: `${new Date() - 8}`,
      article: `Текст статьи`,
      features: [
        `css`
      ],
      id: `b8`,
      shortDescription: `Описание 8`,
      fullDescription: PLACE_HOLDER
    },
    {
      title: `Название статьи 9`,
      link: `#`,
      date: `${new Date() - 9}`,
      article: `Текст статьи`,
      features: [
        `js`
      ],
      id: `b9`,
      shortDescription: `Описание 9`,
      fullDescription: PLACE_HOLDER
    },
    {
      title: `Название статьи 10`,
      link: `#`,
      date: `${new Date() - 10}`,
      article: `Текст статьи`,
      features: [
        `css`
      ],
      id: `b10`,
      shortDescription: `Описание 10`,
      fullDescription: PLACE_HOLDER
    },
    {
      title: `Название статьи 11`,
      link: `#`,
      date: `${new Date() - 11}`,
      article: `Текст статьи`,
      features: [
        `js`
      ],
      id: `b11`,
      shortDescription: `Описание 11`,
      fullDescription: PLACE_HOLDER
    },
    {
      title: `Название статьи 12`,
      link: `#`,
      date: `${new Date() - 12}`,
      article: `Текст статьи`,
      features: [
        `css`
      ],
      id: `b12`,
      shortDescription: `Описание 12`,
      fullDescription: PLACE_HOLDER
    },
    {
      title: `Название статьи 13`,
      link: `#`,
      date: `${new Date() - 13}`,
      article: `Текст статьи`,
      features: [
        `js`
      ],
      id: `b13`,
      shortDescription: `Описание 13`,
      fullDescription: PLACE_HOLDER
    }
  ]
};

const ControllerId = {
  SKILLS: ``,
  EDUCATION: `education`,
  PORTFOLIO: `portfolio`,
  BLOG: `blog`
};

const routerId = {
  [ControllerId.SKILLS]: skillsPresenter.init,
  [ControllerId.EDUCATION]: educationPresenter.init,
  [ControllerId.PORTFOLIO]: portfolioPresenter.init,
  [ControllerId.BLOG]: blogPresenter.init
};

let tab;
const DELAY_TAB_SHOW = 250;


class App {
  init() {
    const state = loadState();
    App.changeTab(state);
    mainNavPresenter.init(state);
  }


  static changeTab(state) {
    let currentData = [...data[`skills`]];
    if (state.currentTab !== ``) {
      currentData = [...data[state.currentTab]];
    }

    if (tab) {
      VisialEffects.hideElement(tab, DELAY_TAB_SHOW);
    }

    window.setTimeout(() => {
      tab = routerId[state.currentTab](currentData, state);
      VisialEffects.showElement(tab, DELAY_TAB_SHOW);
    }, DELAY_TAB_SHOW);
  }
}

new App().init();

}());

//# sourceMappingURL=main.js.map

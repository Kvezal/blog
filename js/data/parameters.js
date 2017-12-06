const parametersOfApplication = {
  PAGE_BACK: -1,
  ITEMS_ON_PAGE_OF_PORTFOLIO: 6,
  ITEMS_ON_PAGE_OF_BLOG: 7,
  FIRST_PAGE: 1,
  FIRST_PAGE: 1,
  SPREADING: 2,
  STEP: 1
};

const initialState = {
  currentPagePortfolio: parametersOfApplication.FIRST_PAGE,
  currentPageBlog: parametersOfApplication.FIRST_PAGE,
  currentTab: `skills`
};

const PORTFOLIO_FILTER_PARAMETERS = [
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
];

const BLOG_FILTER_PARAMETERS = [
  {
    title: `По дате:`,
    type: `radio`,
    options: [
      {
        label: `Сначала старые`,
        name: `date`,
        id: `old`
      },
      {
        label: `Сначала новые`,
        name: `date`,
        id: `new`
      }
    ]
  }
];

export {
  initialState,
  parametersOfApplication,
  PORTFOLIO_FILTER_PARAMETERS,
  BLOG_FILTER_PARAMETERS
};

const initialState = {
  currentPagePortfolio: 1,
  currentPageBlog: 1,
  currentTab: `skills`
};

const parametersOfApplication = {
  PAGE_BACK: -1,
  ITEMS_ON_PAGE_OF_PORTFOLIO: 6,
  ITEMS_ON_PAGE_OF_BLOG: 7
};

const PORTFOLIO_FILTER_PARAMETERS = [
  {
    title: `Сетка`,
    type: `radio`,
    options: [
      {
        label: `Фиксированная`,
        name: `layout`,
        id: `fixed`
      },
      {
        label: `Адаптивная`,
        name: `layout`,
        id: `adaptive`
      }
    ]
  },
  {
    title: `Тип работы`,
    type: `checkbox`,
    options: [
      {
        label: `Верстка`,
        name: `murkup`,
        id: `murkup`
      },
      {
        label: `SPA`,
        name: `spa`,
        id: `spa`
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
        id: `sass`
      },
      {
        label: `LESS`,
        name: `less`,
        id: `less`
      },
      {
        label: `JavaScript`,
        name: `js`,
        id: `js`
      },
      {
        label: `SVG`,
        name: `svg`,
        id: `svg`
      },
      {
        label: `Promise`,
        name: `promise`,
        id: `promise`
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

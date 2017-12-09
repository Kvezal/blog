import Utils from '../lib/utils';

const parametersOfApplication = {
  PAGE_BACK: -1,
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
    },
    {
      title: `Технологии:`,
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
    portfolio: parametersOfApplication.FIRST_PAGE,
    blog: parametersOfApplication.FIRST_PAGE
  },
  currentFilter: {
    portfolio: Utils.deepClone(FILTERS.portfolio),
    blog: Utils.deepClone(FILTERS.blog)
  },
  amountItems: {
    portfolio: parametersOfApplication.ITEMS_ON_PAGE_OF_PORTFOLIO,
    blog: parametersOfApplication.ITEMS_ON_PAGE_OF_BLOG
  }
};

export {
  parametersOfApplication,
  NAVIGATION_PARAMERETS,
  FILTERS,
  initialState
};

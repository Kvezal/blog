import mainNavPresenter from './presenter/main-nav-presenter';

import blogPresenter from './presenter/blog-presenter';
import skillsPresenter from './presenter/skills-presenter';
import educationPresenter from './presenter/education-presenter';
import portfolioPresenter from './presenter/portfolio-presenter';

import data from './data/data';
import {initialState} from './data/parameters';
import Utils from './lib/utils';

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

const loadState = (dataString) => {
  try {
    dataString = decodeURIComponent(dataString);
    return JSON.parse(dataString);
  } catch (err) {
    return initialState;
  }
};


class App {
  init() {
    let currentState = initialState;

    const changeHashHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      currentState = loadState(hashValue);
      App.changeTab(currentState);
    };

    window.onhashchange = changeHashHandler;
    changeHashHandler();

    mainNavPresenter.init(currentState);
  }

  static changeTab(state) {
    Utils.saveURL(state);
    if (state.currentTab === ``) {
      const currentData = [...data[`skills`]];
      return routerId[state.currentTab](currentData, state);
    }

    if (!data[state.currentTab]) {
      return routerId[state.currentTab]();
    }

    const currentData = [...data[state.currentTab]];
    return routerId[state.currentTab](currentData, state);
  }
}

new App().init();

export default App;

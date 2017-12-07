import mainNavPresenter from './presenter/main-nav-presenter';

import blogPresenter from './presenter/blog-presenter';
import skillsPresenter from './presenter/skills-presenter';
import educationPresenter from './presenter/education-presenter';
import portfolioPresenter from './presenter/portfolio-presenter';

import data from './data/data';
import {initialState} from './data/parameters';

const ControllerId = {
  SKILLS: `skills`,
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

class App {
  init(state) {
    const cloneState = Object.assign({}, state);
    App.showMainNav(cloneState);
    App.changeTab(cloneState);
  }

  static changeTab(state = initialState) {
    if (!data[state.currentTab]) {
      return routerId[state.currentTab]();
    }

    const currentData = [...data[state.currentTab]];
    return routerId[state.currentTab](currentData, state);
  }

  static showMainNav(state) {
    mainNavPresenter.init(state);
  }
}
new App().init(initialState);

export default App;

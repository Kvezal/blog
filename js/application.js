import mainNavPresenter from './presenter/main-nav-presenter';

import blogPresenter from './presenter/blog-presenter';
import skillsPresenter from './presenter/skills-presenter';
import educationPresenter from './presenter/education-presenter';
import portfolioPresenter from './presenter/portfolio-presenter';

import data from './data/data';
import initialParameters from './data/initial-parameters';

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
  /*init(tab) {
    App.showMainNav();
    App.changeTab(tab);
  }

  static changeTab(tab, state = initialParameters.state) {
    const cloneState = Object.assign({}, state);
    cloneState.currentTab = tab;
    if (!data[tab]) {
      return routerId[tab]();
    }
    const currentData = [...data[tab]];
    return routerId[tab](currentData, cloneState);
  }*/

  init(state) {
    const cloneState = Object.assign({}, state);
    App.showMainNav(cloneState);
    App.changeTab(cloneState);
  }

  static changeTab(state = initialParameters.state) {
    if (!data[state.currentTab]) {
      return routerId[state.currentTab]();
    }
    const currentData = [...data[state.currentTab]];
    return routerId[state.currentTab](currentData, state);
  }

  static showMainNav(state) {
    mainNavPresenter.init(state);
  }

  /*static showSkills() {
    routerId[`skills`]();
  }

  static showEducation() {
    routerId[`education`]();
  }

  static showPortfolio() {
    routerId[`portfolio`]();
  }

  static showBlog() {
    routerId[`blog`]();
  }*/
}
new App().init(initialParameters.state);

export default App;

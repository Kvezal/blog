import mainNavPresenter from './presenter/main-nav-presenter';

import blogPresenter from './presenter/blog-presenter';
import skillsPresenter from './presenter/skills-presenter';
import educationPresenter from './presenter/education-presenter';
import portfolioPresenter from './presenter/portfolio-presenter';

import {loadState} from './lib/change-url';
import data from './data/data';


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


class App {
  init() {
    const loadPage = () => {
      const state = loadState();
      App.changeTab(state);
      mainNavPresenter.init(state);
    };


    let currentHistoryLength;
    const reloadPage = () => {
      if (history.length === currentHistoryLength) {
        loadPage();
        return;
      }
      currentHistoryLength = history.length;
    };


    window.onpopstate = reloadPage;
    loadPage();
  }


  static changeTab(state) {
    let currentData = [...data[`skills`]];
    if (state.currentTab !== ``) {
      currentData = [...data[state.currentTab]];
    }

    routerId[state.currentTab](currentData, state);
  }
}

new App().init();

export default App;

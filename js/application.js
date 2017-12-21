import mainNavPresenter from './presenter/main-nav-presenter';

import blogPresenter from './presenter/blog-presenter';
import skillsPresenter from './presenter/skills-presenter';
import educationPresenter from './presenter/education-presenter';
import portfolioPresenter from './presenter/portfolio-presenter';

import {loadState} from './lib/change-url';
import VisialEffects from './lib/visual-effects';
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
      VisialEffects.hideTab(tab, DELAY_TAB_SHOW);
    }

    window.setTimeout(() => {
      tab = routerId[state.currentTab](currentData, state);
      VisialEffects.showTab(tab, DELAY_TAB_SHOW);
    }, DELAY_TAB_SHOW);
  }
}

new App().init();

export default App;

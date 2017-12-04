import mainNavPresenter from './presenter/main-nav-presenter';

import blogPresenter from './presenter/blog-presenter';
import skillsPresenter from './presenter/skills-presenter';
import educationPresenter from './presenter/education-presenter';
import portfolioPresenter from './presenter/portfolio-presenter';

import data from './data/data';

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
  init(tab = `skills`) {
    App.showMainNav();
    App.changeTab(tab);
  }

  static changeTab(tab) {
    if (!data[tab]) {
      return routerId[tab]();
    }
    const currentData = [...data[tab]];
    return routerId[tab](currentData);
  }

  static showMainNav() {
    mainNavPresenter.init();
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
new App().init();

export default App;

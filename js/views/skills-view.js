import AbstractView from './abstract-view';

class SkillsView extends AbstractView {
  constructor(data) {
    super();

    this.data = data;
  }

  get template() {
    return (
      `<section class="skills">
        <h1 class="skills__title">Навыки</h1>
        <ol class="skills__list">
          ${this.templateList}
        </ol>
      </section>`
    );
  }

  templateListItem(item) {
    return (
      `<li class="skills__item">${item};</li>`
    );
  }

  get templateList() {
    const list = this.data.map((item) => {
      return this.templateListItem(item);
    });
    const indexLastItem = list.length - 1;
    list[indexLastItem] = list[indexLastItem].replace(/;/, ``);
    return list.join(``);
  }
}

export default SkillsView;

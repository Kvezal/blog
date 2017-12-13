import AbstractView from './abstract-view';

class ItemDescriptionView extends AbstractView {
  constructor(data) {
    super();

    this.data = data;
  }

  get template() {
    return (
      `<section class="item-description">
        <div class="scroll-bar">
          <span class="scroll-bar__handl"></span>
        </div>
        <button class="item-description__close" type="button"></button>
        <div class="item-description__wrap">
          <h2 class="item-description__title">${this.data.title}</h2>
          <h3 class="item-description__subtitle">Особенности</h3>
          <ul class="item-description__list">
            ${this.templateDescriptionListOfElements}
          </ul>
          <h3 class="item-description__subtitle">Описание</h3>
          <p class="item-description__text">${this.data.fullDescription}</p>
        </div>
      </section>
      <div class="overlay"></div>`
    );
  }

  get templateDescriptionListOfElements() {
    return this.data.features.map((feature) => {
      return `<li class="item-description__element">${feature}</li>`;
    }).join(``);
  }

  bind(element) {
    const btnCloseDescription = element.querySelector(`.item-description__close`);
    btnCloseDescription.onclick = this.closeDescription;

    this.description = element.querySelector(`.item-description`);
    this.scrollBar = this.description.querySelector(`.scroll-bar`);
    this.scrollHandl = this.scrollBar.querySelector(`.scroll-bar__handl`);

    this.description.addEventListener(`wheel`, this.descriptionScroll);
  }
}

export default ItemDescriptionView;

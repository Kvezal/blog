import AbstractView from './abstract-view';
import Utils from '../lib/utils';

class ItemDescriptionView extends AbstractView {
  constructor(data, tab) {
    super();

    this.data = data;
    this.tab = Utils.toUpperCaseFirstLetter(tab);
  }


  get template() {
    return this[`template${this.tab}Description`];
  }


  get templateEducationDescription() {
    return (
      `<section class="item-description">
        <div class="scroll-bar">
          <span class="scroll-bar__handl"></span>
        </div>
        <button class="item-description__close" type="button"></button>
        <div class="item-description__wrap">
          <img src="img/${this.data.name}.png">
          <a class="btn  item-description__btn" href="documents/${this.data.name}.pdf" target="_blank">Открыть в PDF</a>
        </div>
      </section>
      <div class="overlay"></div>`
    );
  }


  get templatePortfolioDescription() {
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
          ${this.templateContent}
        </div>
      </section>
      <div class="overlay"></div>`
    );
  }


  get templateBlogDescription() {
    return (
      `<section class="item-description">
        <div class="scroll-bar">
          <span class="scroll-bar__handl"></span>
        </div>
        <button class="item-description__close" type="button"></button>
        <div class="item-description__wrap">
          <h2 class="item-description__title">${this.data.title}</h2>
          ${this.templateContent}
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


  get templateContent() {
    const paragraphs = this.data.fullDescription.split(`\n\n`);

    return paragraphs.map((item) => {
      if (!item) {
        return `</br></br>`;
      }
      return (
        `<p class="item-description__text">${item.replace(`\n`, `</br>`)}</p>`
      );
    }).join(``);
  }


  bind(element) {
    const btnCloseDescription = element.querySelector(`.item-description__close`);
    btnCloseDescription.onclick = this.btnCloseDescriptionClickHandler;

    this.description = element.querySelector(`.item-description`);
    this.scrollBar = this.description.querySelector(`.scroll-bar`);
    this.scrollHandl = this.scrollBar.querySelector(`.scroll-bar__handl`);
    this.overlay = element.querySelector(`.overlay`);

    this.description.addEventListener(`wheel`, this.descriptionScroll);
  }
}

export default ItemDescriptionView;

import AbstractView from './abstract-view';

class EducationView extends AbstractView {
  constructor(data) {
    super();

    this.data = data;
  }

  get template() {
    return (
      `<section class="education">
        <h1 class="education__title">Образование</h1>
        <div class="education__wrap">
          ${this.templatesLists}
        </div>
        <div class="modal"></div>
      </section>`
    );
  }

  get templatesLists() {
    const descriptionItems = [];
    const certificates = [];

    this.data.forEach((item) => {
      descriptionItems.push(this.getTemplateDescriptionItem(item));
      certificates.push(this.getTemplateCertificate(item));
    });

    return (
      `<ul class="descriptions">
        <li class="descriptions__item">
          <p class="descriptions__text">
            <span class="descriptions__name">Высшее техническое:</span>
            “Ангарская Государственная Техническая Академия”
          </p>
          <p class="descriptions__text">
            <span class="descriptions__name">Факультет:</span>
            "Техническая Кибернетика”
          </p>
          <p class="descriptions__text">
            <span class="descriptions__name">Кафедра:</span>
            Промышленная электроника и информационно-измерительная техника”<br>
            (специалитет 2010 - 2015г., очная форма обучения)
          </p>
        </li>
        ${descriptionItems.join(``)}
      </ul>
      <ul class="certificates">
        ${certificates.join(``)}
      </ul>`
    );
  }

  getTemplateDescriptionItem(item) {
    return (
      `<li class="descriptions__item">
        <p class="descriptions__text">
          <span class="descriptions__name">${item.type}:</span>
          “${item.title}”
        </p>
        <p class="descriptions__text">
          <span class="descriptions__name">Дата прохождения:</span>
          ${item.data}
        </p>
        <p class="descriptions__text">
          <span class="descriptions__name">Соответствия критериям:</span>
          ${item.state}
        </p>
      </li>`
    );
  }

  getTemplateCertificate(item) {
    return (
      `<li class="certificates__item">
        <a class="certificates__link" href="/documents/${item.name}.pdf" data-item="${item.id}">
          <img class="certificates__image" src="img/${item.name}@1x.jpg" srcset="img/${item.name}@2x.jpg 2x">
        </a>
      </li>`
    );
  }

  bind(element) {
    const items = element.querySelectorAll(`.certificates__link`);
    items.forEach((item) => item.addEventListener(`click`, this.certificateItemHandler));

    this.modal = element.querySelector(`.modal`);
  }
}

export default EducationView;

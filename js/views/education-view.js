import AbstractView from './abstract-view';

class EducationView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return (
      `<section class="education">
        <h1 class="education__title">Образование</h1>
        <div class="education__wrap">
          <ul class="descriptions">
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
            <li class="descriptions__item">
              <p class="descriptions__text">
                <span class="descriptions__name">Интенсив:</span>
                “Базовый HTML и CSS”
              </p>
              <p class="descriptions__text">
                <span class="descriptions__name">Дата прохождения:</span>
                16 января - 22 февраля 2017г.
              </p>
              <p class="descriptions__text">
                <span class="descriptions__name">Соответствия критериям:</span>
                100%
              </p>
            </li>
            <li class="descriptions__item">
              <p class="descriptions__text">
                <span class="descriptions__name">Интенсив:</span>
                “Продвинутый HTML и CSS”
              </p>
              <p class="descriptions__text">
                <span class="descriptions__name">Дата прохождения:</span>
                22 мая - 28 июня 2017г.
              </p>
              <p class="descriptions__text">
                <span class="descriptions__name">Соответствия критериям:</span>
                100%
              </p>
            </li>
            <li class="descriptions__item">
              <p class="descriptions__text">
                <span class="descriptions__name">Интенсив:</span>
                “Базовый JavaScript”
              </p>
              <p class="descriptions__text">
                <span class="descriptions__name">Дата прохождения:</span>
                8 августа - 20 сентября 2017г.
              </p>
              <p class="descriptions__text">
                <span class="descriptions__name">Соответствия критериям:</span>
                100%
              </p>
            </li>
            <li class="descriptions__item">
              <p class="descriptions__text">
                <span class="descriptions__name">Интенсив:</span>
                “Продвинутый JavaScript”
              </p>
              <p class="descriptions__text">
                <span class="descriptions__name">Дата прохождения:</span>
                26 сентября - 8 ноября 2017г.
              </p>
              <p class="descriptions__text">
                <span class="descriptions__name">Соответствия критериям:</span>
                100%
              </p>
            </li>
          </ul>
          <ul class="certificates">
            <li class="certificates__item">
              <img class="certificates__image" src="img/basicHTML&CSS@1x.jpg">
            </li>
            <li class="certificates__item">
              <img class="certificates__image" src="img/advancedHTML&CSS@1x.jpg">
            </li>
            <li class="certificates__item">
              <img class="certificates__image" src="img/basicJS@1x.jpg">
            </li>
            <li class="certificates__item">
              <img class="certificates__image" src="img/advancedJS@1x.jpg">
            </li>
          </ul>
        </div>
      </section>`
    );
  }
}

export default EducationView;

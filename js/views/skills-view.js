import AbstractView from './abstract-view';

class SkillsView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return (
      `<section class="skills">
        <h1 class="skills__title">Навыки</h1>
        <ol class="skills__list">
          <li class="skills__item">HTML5</li>
          <li class="skills__item">Семантичная и валидная верстка;</li>
          <li class="skills__item">Адаптивная графика(ретинизация и кадрирование изображений);</li>
          <li class="skills__item">CSS3</li>
          <li class="skills__item">Кроссбраузерная и pixel-perfect верстка;</li>
          <li class="skills__item">Построение адаптивных сеток;</li>
          <li class="skills__item">Анимация;</li>
          <li class="skills__item">JS</li>
          <li class="skills__item">Проектирование приложений;</li>
          <li class="skills__item">MVP;</li>
          <li class="skills__item">ES6+;</li>
          <li class="skills__item">Promise;</li>
          <li class="skills__item">Gulp;</li>
          <li class="skills__item">Git;</li>
          <li class="skills__item">AJAX;</li>
          <li class="skills__item">LESS;</li>
          <li class="skills__item">SASS;</li>
          <li class="skills__item">БЭМ методология;</li>
          <li class="skills__item">Mobile first;</li>
          <li class="skills__item">Progressive enhancement;</li>
          <li class="skills__item">Соблюдение принципа DRY;</li>
          <li class="skills__item">Написание оптимизированного кода</li>
        </ol>
      </section>`
    );
  }
}

export default SkillsView;

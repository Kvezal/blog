// import initialParameters from '../data/initial-parameters';

class Utils {
  static getElementFromTemplate(murkup) {
    const template = document.createElement(`template`);
    template.innerHTML = murkup;
    return template.content;
  }

  static clearElement(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  static displayElement(element, parent) {
    let parentElement = parent;
    if (typeof (parent) === `string`) {
      parentElement = document.querySelector(`.${parent}`);
    }
    Utils.clearElement(parentElement);
    parentElement.appendChild(element);
  }

  static replaceOldElement(newElement, oldElement) {
    oldElement.parentElement.replaceChild(newElement, oldElement);
  }

  static getTemplatePageList(amountDataItems, currentPage, maxAmountItemsOnPage) {
    const amountOfPage = Math.ceil(amountDataItems / maxAmountItemsOnPage);

    const pageList = [`<a class="pagination__item  pagination__item--prev  pagination__item--disabled">Назад</a>`];
    for (let i = 1; i <= amountOfPage; i++) {
      if (i === currentPage) {
        pageList.push(`<a class="pagination__item  pagination__item--current">${i}</a>`);
        continue;
      }
      pageList.push(`<a class="pagination__item" href="#">${i}</a>`);
    }
    pageList.push(`<a class="pagination__item  pagination__item--next" href="#">Вперед</a>`);
    return pageList.join(``);
  }

  static toUpperCaseFirstLetter(string) {
    return `${string.slice(0, 1).toUpperCase()}${string.slice(1)}`;
  }

  static deepClone(obj) {
    const string = JSON.stringify(obj);
    return JSON.parse(string);
  }
}

export default Utils;

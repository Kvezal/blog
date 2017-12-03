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
    const parentElement = document.querySelector(`.${parent}`);
    Utils.clearElement(parentElement);
    parentElement.appendChild(element);
  }
}

export default Utils;

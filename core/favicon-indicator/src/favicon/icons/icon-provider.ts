export class IconProvider {
  options = {};

  constructor(optionsPartial = {}) {
    this.setOptions(optionsPartial);
  }

  setOptions(optionsPartial: object) {
    this.options = Object.assign({}, this.options, optionsPartial);
  }
}

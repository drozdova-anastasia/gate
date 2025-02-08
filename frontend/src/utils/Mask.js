export default class Mask {

  constructor(regExp, mask) {
    this.mask = mask;
    this.regExp = RegExp(regExp, 'g');
  }

  apply(value, func) {
    let cleanValue = value.replace(this.regExp, '');
    if (cleanValue === this.prevValue) {
      return;
    }
    const splitted = cleanValue.split('');
    const result = [];
    for (let item of this.mask.split('')) {
      if (splitted.length === 0) {
        break;
      }
      if (item === 'X') {
        result.push(splitted.splice(0, 1)[0]);
      } else {
        result.push(item);
      }
    }
    cleanValue = result.join('');
    this.prevValue = cleanValue;
    func(cleanValue);
  }
}
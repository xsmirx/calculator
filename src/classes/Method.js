export class Method {
  constructor() {
    this.plus = (a, b) => a + b;
    this.minus = (a, b) => a - b;
    this.multiply = (a, b) => a * b;
    this.devide = (a, b) => a / b;
  }
  addMethod(key, func) {
    this[key] = func;
  }
  delMethod(key) {
    delete this[key];
  }
}

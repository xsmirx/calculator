import { Method } from "./Method.js";

export class Calc extends Method {
  constructor() {
    super();
    this.currentOperator = null;
    this.currentResult = null;
    this.endOperation = true;
  }

  init() {
    this.input = document.querySelector("#input");
    this.numberButtons = Array.from(document.querySelectorAll(".number"));
    this.operatorButtonns = Array.from(document.querySelectorAll(".operator"));
    this.equalsButton = document.querySelector("#equals");
    this.delButton = document.querySelector("#del");
    this.resetButton = document.querySelector("#reset");
    this.pointButton = document.querySelector("#point");
    this.changeButton = document.querySelector("#change");

    this.numberButtons.forEach((btn) => {
      btn.addEventListener("click", (event) => this.onClickToNumber(event));
    });

    this.operatorButtonns.forEach((btn) => {
      btn.addEventListener("click", (event) => this.onClickToOperator(event));
    });

    this.equalsButton.addEventListener("click", (event) =>
      this.onClickToEquals(event)
    );
    this.delButton.addEventListener(
      "click",
      () => (this.input.value = this.input.value.slice(0, -1))
    );
    this.resetButton.addEventListener("click", () => {
      this.currentOperator = null;
      this.currentResult = null;
      this.endOperation = true;
      this.input.value = "";
    });
    this.pointButton.addEventListener(
      "click",
      () => (this.input.value = `${this.input.value}.`)
    );
    this.changeButton.addEventListener(
      "click",
      () => (this.input.value = -Number(this.input.value))
    );
  }

  onClickToEquals(event) {
    if (this.currentOperator && this.currentResult) {
      this.currentResult = this[this.currentOperator](
        this.currentResult,
        +this.input.value
      );
      this.input.value = this.currentResult;
      this.currentOperator = null;
      this.endOperation = true;
    }
  }

  onClickToNumber(event) {
    if (this.endOperation) {
      this.input.value = "";
      this.endOperation = false;
    }
    this.input.value += event.srcElement.innerText;
  }

  onClickToOperator(event) {
    if (!this.currentOperator && !this.currentResult) {
      this.currentOperator = event.srcElement.getAttribute("data-operator");
      this.currentResult = +this.input.value;
      this.endOperation = true;
    } else if (!this.currentOperator) {
      this.currentOperator = event.srcElement.getAttribute("data-operator");
      this.input.value = this.currentResult;
      this.endOperation = true;
    } else {
      this.currentResult = this[this.currentOperator](
        this.currentResult,
        +this.input.value
      );
      this.input.value = this.currentResult;
      this.endOperation = true;
    }
  }
}

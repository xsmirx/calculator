"use strict";

const calc = {
  operation: {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
  },
  currentOperator: "",
  currentResult: "",
  endOperation: true,
};

const input = document.querySelector("#input");
const numberButtons = Array.from(document.querySelectorAll(".number"));
const operatorButtonns = Array.from(document.querySelectorAll(".operator"));
const equalsButton = document.querySelector("#equals");
const delButton = document.querySelector("#del");
const resetButton = document.querySelector("#reset");
const pointButton = document.querySelector("#point");
const changeButton = document.querySelector("#change");

numberButtons.forEach((btn) => {
  btn.onclick = onClickToNumber;
});

operatorButtonns.forEach((btn) => {
  btn.onclick = (event) => onClickToOperator(event);
});

equalsButton.onclick = () => {
  calc.currentResult = calc.operation[calc.currentOperator](
    calc.currentResult,
    +input.value
  );
  input.value = calc.currentResult;
  calc.currentOperator = calc.currentResult = "";
};

delButton.onclick = () => {
  input.value = input.value.slice(0, -1);
};

reset.onclick = () => {
  input.value = "";
  calc.currentOperator = calc.currentResult = "";
};

pointButton.onclick = () => {
  if (!input.value.includes(".")) {
    input.value += ".";
  }
};

changeButton.onclick = () => {
  input.value = -input.value;
};

function onClickToNumber(event) {
  if (calc.endOperation) {
    input.value = "";
    calc.endOperation = false;
  }
  input.value += event.srcElement.innerText;
}

function onClickToOperator(event) {
  if (!calc.currentOperator && !calc.currentResult) {
    calc.currentOperator = event.srcElement.getAttribute("data-operator");
    calc.currentResult = +input.value;
    calc.endOperation = true;
  } else {
    calc.currentResult = calc.operation[calc.currentOperator](
      calc.currentResult,
      +input.value
    );
    calc.currentOperator = event.srcElement.getAttribute("data-operator");
    input.value = calc.currentResult;
    calc.endOperation = true;
  }
}

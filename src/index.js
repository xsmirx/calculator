"use strict";

// input element
const input = document.querySelector("#input");

// numbers buttons ans event click on this buttons
const numberButtons = Array.from(document.querySelectorAll(".number"));
numberButtons.forEach((btn) => {
  btn.onclick = (event) => {
    if (operations.endOperation) {
      input.value = "";
      operations.endOperation = false;
    }
    input.value += event.srcElement.innerText;
  };
});

// del button and event click on for her
const delButton = document.querySelector("#del");
delButton.onclick = () => {
  input.value = input.value.slice(0, -1);
};

// reset button and event click for her
const resetButton = document.querySelector("#reset");
reset.onclick = () => {
  input.value = "";
  operations.currentOperator = operations.currentResult = "";
};

// point button and event click for her
const pointButton = document.querySelector("#point");
pointButton.onclick = () => {
  if (!input.value.includes(".")) {
    input.value += ".";
  }
};

// operators buttons and event click for them
const operatorButtonns = Array.from(document.querySelectorAll(".operator"));
operatorButtonns.forEach((btn) => {
  btn.onclick = (event) => onClickToOperator(event);
});

// operations object
const operations = {
  operators: {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
  },
  currentOperator: "",
  currentResult: "",
  endOperation: true,
};

function onClickToOperator(event) {
  if (
    event.srcElement.hasAttribute("data-operator") &&
    !operations.currentOperator &&
    !operations.currentResult
  ) {
    operations.currentOperator = event.srcElement.getAttribute("data-operator");
    operations.currentResult = +input.value;
    operations.endOperation = true;
  } else {
    operations.currentResult = operations.operators[operations.currentOperator](
      operations.currentResult,
      +input.value
    );
    input.value = operations.currentResult;
    operations.endOperation = true;
  }
}

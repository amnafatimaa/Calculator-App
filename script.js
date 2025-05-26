const display = document.querySelector(".result");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let operator = "";
let firstOperand = "";
let secondOperand = "";

function updateDisplay(value) {
  const displayValue = value || "0";
  // If the number is longer than 10 digits, only show the last 10
  if (displayValue.length > 10) {
    display.textContent = displayValue.slice(-10);
  } else {
    display.textContent = displayValue;
  }
}

updateDisplay(currentInput);

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const btnClass = button.className;
    const btnContent = button.textContent;

    // Handle number buttons
    if (!isNaN(btnContent) && btnClass !== "delete") {
      currentInput += btnContent;
      updateDisplay(currentInput);
    }

    // Handle operator buttons
    else if (
      btnClass === "plus" ||
      btnClass === "minus" ||
      btnClass === "multiply" ||
      btnClass === "divide"
    ) {
      firstOperand = currentInput;
      currentInput = "";
      if (btnClass === "plus") operator = "+";
      if (btnClass === "minus") operator = "-";
      if (btnClass === "multiply") operator = "*";
      if (btnClass === "divide") operator = "/";
    }

    // Handle equal
    else if (btnClass === "equal") {
      secondOperand = currentInput;
      if (firstOperand && operator && secondOperand) {
        let result = 0;
        const num1 = parseFloat(firstOperand);
        const num2 = parseFloat(secondOperand);

        switch (operator) {
          case "+":
            result = num1 + num2;
            break;
          case "-":
            result = num1 - num2;
            break;
          case "*":
            result = num1 * num2;
            break;
          case "/":
            result = num2 !== 0 ? num1 / num2 : "Error";
            break;
        }

        currentInput = result.toString();
        updateDisplay(currentInput);
        firstOperand = "";
        secondOperand = "";
        operator = "";
      }
    }

    // Clear button
    else if (btnClass === "AC") {
      currentInput = "";
      firstOperand = "";
      secondOperand = "";
      operator = "";
      updateDisplay(currentInput);
    }

    // Decimal point
    else if (btnClass === "point" && !currentInput.includes(".")) {
      currentInput += ".";
      updateDisplay(currentInput);
    }

    // Delete last character
    else if (btnClass === "delete") {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput);
    }
  });
});

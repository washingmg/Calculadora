// HTML data
const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

// Function
class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  // add digit to calculator screen
  addDigit(digit) {
    console.log(digit);
    // Check if number already has a dot
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  // process all calculator operations
  processOperation(operation) {
    // Check if current value is empty
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      // Change operation
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    // Get current and previous values
    let operationValue;
    let previous = +this.previousOperationText.innerText.split(" ")[0];
    let current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "%":
        operationValue = (previous * current) / 100;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        if (current === 0) {
          alert("Não pode dividir por zero");
          return;
        }
        operationValue = previous / current;
        this.updateScreen(operationValue.toFixed(3), operation, current, previous);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "C":
        this.processClearOperator();
        break;
      case "=":
        this.processEqualOperator();
        break;
      case "+/-":
        this.processChangeSignOperator();
        break;
      default:
        return;
    }
  }

  // Change values of calculator screen
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      // Append number to current value
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // Check if value is zero, if is just add current value
      if (previous === 0) {
        operationValue = current;
      }
      // Add current value to previous
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  // Change math operation
  changeOperation(operation) {
    const mathOperations = ["*", "-", "+", "/", "%"];

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  // Delete a digit
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }

  // Clear all operations
  processClearOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  // Process an operation
  processEqualOperator() {
    let operation = this.previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
  }

  // Change the sign of the current value
  processChangeSignOperator() {
    if (this.currentOperationText.innerText) {
      this.currentOperationText.innerText =
        this.currentOperationText.innerText.charAt(0) === "-"
          ? this.currentOperationText.innerText.slice(1)
          : "-" + this.currentOperationText.innerText;
    }
  }

}

// Instance
const calc = new Calculator(previousOperationText, currentOperationText);

// Event
buttons.forEach((btn) => {
  btn.addEventListener("click", (evento) => {
    const value = evento.target.innerText;

    if (+value >= 0 || value === ".") {
      console.log(value);
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});

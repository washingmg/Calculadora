// Seleção dos elementos
const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

// Aplicação da calculadora
class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }
    // add digit to calculator screen
    addDigit(digit) {
        console.log(digit);

        this.currentOperation = digit;
        this.updateScreen();
    }
    // change values of the calculator scren
    updateScreen() {
        this.currentOperationText.innerText += this.currentOperation;
    }
}
const calc = new Calculator(previousOperationText, currentOperationText)

// Eventos

buttons.forEach((btn) => {
    btn.addEventListener("click", (evento) => {
        const value = evento.target.innerText;
        if (+value >= 0 || value === ".") {
            calc.addDigit(value)}
        else {
            console.log("Op: " + value)
        }
    });
});

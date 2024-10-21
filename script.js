// Operator functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// Calculator logic
let firstNumber = "";
let secondNumber = "";
let savedOperator = undefined;

const divideButton = document.querySelector("#divide");
divideButton.addEventListener("click", () => {
    if (firstNumber !== "" && displayValue !== "") {
        secondNumber = displayValue;
        operate(savedOperator);
    }

    savedOperator = divide;
    firstNumber = display.innerHTML;
    displayValue = "";
    operatorUsed = true;
});

const multiplyButton = document.querySelector("#multiply");
multiplyButton.addEventListener("click", () => {
    if (firstNumber !== "" && displayValue !== "") {
        secondNumber = displayValue;
        operate(savedOperator);
    }

    savedOperator = multiply;
    firstNumber = display.innerHTML;
    displayValue = "";
    operatorUsed = true;
});
const subtractButton = document.querySelector("#subtract");
subtractButton.addEventListener("click", () => {
    if (firstNumber !== "" && displayValue !== "") {
        secondNumber = displayValue;
        operate(savedOperator);
    }

    savedOperator = subtract;
    firstNumber = display.innerHTML;
    displayValue = "";
    operatorUsed = true;
});

const addButton = document.querySelector("#add");
addButton.addEventListener("click", () => {
    if (firstNumber !== "" && displayValue !== "") {
        secondNumber = displayValue;
        operate(savedOperator);
    }

    savedOperator = add;
    firstNumber = display.innerHTML;
    displayValue = "";
    operatorUsed = true;
});

const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", () => {
    if (firstNumber === "" && displayValue === "") return;

    if (savedOperator) {
    secondNumber = displayValue;
    operate(savedOperator);
    savedOperator = undefined;
    displayValue = "";
    operatorUsed = false;
    }
});

function operate(operator) {
    let a = Number(firstNumber);
    let b = Number(secondNumber);

    let result;
    if (operator === add) {
        result = add(a, b);
    } else if (operator === subtract) {
        result = subtract(a, b);
    } else if (operator === multiply) {
        result = multiply(a, b);
    } else if (operator === divide) {
        result = divide(a, b);
    }

    if (result === Infinity || result === NaN) {
        display.innerHTML = "OH HELL NO";
        displayValue = "";
        savedOperator = undefined;
        operatorUsed = false;
        firstNumber = "";
        secondNumber = "";
    } else {
        result = Math.round(result * 1000) / 1000;
        display.innerHTML = result;
        firstNumber = result;
        secondNumber = "";
    }
}



// Writing and populating display
let numberButton = document.querySelectorAll(".number");
let zeroButton = document.querySelector("#num0");
let commaButton = document.querySelector("#comma");
let display = document.querySelector(".workingField");
let operatorUsed = false;
let displayValue = "";
display.innerHTML = "0";

numberButton.forEach(button => {
    button.addEventListener("click", () => {
        if (display.innerHTML === "0" || display.innerHTML === "OH HELL NO") {
            display.innerHTML = "";
        } else if (operatorUsed === true) {
            operatorUsed = false;
            display.innerHTML = "";
        }

        const buttonText = button.textContent;
        displayValue += buttonText;
        display.innerHTML += buttonText;
    });
});

commaButton.addEventListener("click", () => {
    if (display.innerHTML === "0" || display.innerHTML === "OH HELL NO") {
        displayValue = "0.";
        display.innerHTML = "0.";
    } else if (!display.innerHTML.includes(".")) {
        displayValue += ".";
        display.innerHTML += ".";
    }
});

let clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => {
    displayValue = "";
    display.innerHTML = "0";
    savedOperator = undefined;
    operatorUsed = false;
    firstNumber = "";
    secondNumber = "";
});

let backspaceButton = document.querySelector("#backspace");
backspaceButton.addEventListener("click", () => {
    if (displayValue === "") {
        return;
    } else {
        displayValue = displayValue.slice(0, -1);
        display.innerHTML = displayValue;

        if (display.innerHTML === "") {
            display.innerHTML = "0";
        }
    }
});
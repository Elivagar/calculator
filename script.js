// *********************
// Declaring all buttons
// *********************
const display = document.querySelector(".workingField");
const storage = document.querySelector(".storage");
let numberButton = document.querySelectorAll(".number");
const clearButton = document.querySelector("#clear");
let operatorButtons = document.querySelectorAll(".operator");
const percentButton = document.querySelector("#percent");
const posMinButton = document.querySelector("#posMin");
const backspaceButton = document.querySelector("#backspace");
const equalsButton = document.querySelector("#equals");
const commaButton = document.querySelector("#comma");
const allButtons = document.querySelectorAll("button");

// ****************
// Calculator logic
// ****************
let num1 = 0;
let num2 = 0;
let operator = undefined;
let displayValue = 0;
let decimal = false;
let operatorUsed = false;
let noWrite = false;
let emptyStorage = false;
display.innerHTML = displayValue;
storage.innerHTML = "";

function operate(num1, num2, operator) {
    num1 = Number(num1);
    num2 = Number(num2);

    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "×":
            return num1 * num2;
        case "÷":
            return num1 / num2;
        default:
            break;
    }
}

function handleOperatorInput(button) {
    if (displayValue === 0) {
        operator = button;
        num1 = "0";
        populateStorage(num1, operator);
        operatorUsed = true;
    }

    if (!displayValue) return;

    if (!operatorUsed) {
        operator = button;
        num1 = displayValue;
        populateStorage(num1, operator);
        displayValue = 0;
        decimal = false;
        operatorUsed = true;
    } else if (operatorUsed) {
        num2 = displayValue;
        if (num2 === "0" && operator === "÷") return divideError();
        displayValue = operate(num1, num2, operator);
        displayValue = Math.round(displayValue * 100000) / 100000;
        operator = button;
        populateStorage(num2, operator);
        num2 = 0;
        display.innerHTML = displayValue;
        num1 = displayValue;
        displayValue = 0;
    }
}

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => handleOperatorInput(button.textContent));
});

function divideError() {
    display.innerHTML = "OH HELL NO";
    storage.innerHTML += num2;
    return setTimeout(() => {
        clear();
    }, 2500);
}

equalsButton.addEventListener("click", () => {
    if (!num1) return;
    num2 = displayValue;
    if (!num2 || !operator) return;
    if (num2 === "0" && operator === "÷") return divideError();

    displayValue = operate(num1, num2, operator);
    displayValue = Math.round(displayValue * 100000) / 100000;
    populateStorage(num2);
    num1 = 0;
    num2 = 0;
    display.innerHTML = displayValue;
    operatorUsed = false;
    noWrite = true;
    emptyStorage = true;
});

// *****************************
// Writing & populating displays
// *****************************
function populateStorage(num, operatorSign) {
    let number = num.toString();
    if (number.includes("-")) num = "(" + num + ")";
    if (emptyStorage) {
        emptyStorage = false;
        return storage.innerHTML = num + operatorSign;
    }

    if (!operatorSign) return storage.innerHTML += num;
    return storage.innerHTML += num + operatorSign;
}

function handleNumberInput(number) {
    if (displayValue === 0 || noWrite || displayValue === "0") {
        displayValue = "";
        displayValue += number;
        display.innerHTML = displayValue;
        noWrite = false;
    } else {
        displayValue += number;
        display.innerHTML = displayValue;
    }
}

numberButton.forEach((button) => {
    button.addEventListener("click", () => handleNumberInput(button.textContent));
});

commaButton.addEventListener("click", () => {
    if (decimal === true) return;

    displayValue += ".";
    display.innerHTML = displayValue;
    decimal = true;
});

percentButton.addEventListener("click", () => {
    if (!displayValue) return;

    if (num1 && operator && displayValue && !noWrite) {
        displayValue = (Number(num1) / 100) * displayValue;
        display.innerHTML = displayValue;
    } else {
    displayValue = Number(displayValue) / 100;
    display.innerHTML = displayValue;
    }
});

posMinButton.addEventListener("click", () => {
    if (!displayValue) return;

    displayValue = -displayValue;
    display.innerHTML = displayValue;
});

// ***********************
// Editing input & display
// ***********************
backspaceButton.addEventListener("click", () => {
    if (displayValue === 0) return;
    displayValue = displayValue.slice(0, -1);
    if (displayValue === "") displayValue = 0;
    display.innerHTML = displayValue;
});

function clear() {
    num1 = 0;
    num2 = 0;
    displayValue = 0;
    display.innerHTML = 0;
    storage.innerHTML = "";
    decimal = false;
    operatorUsed = false;
    noWrite = false;
    emptyStorage = false;
}

clearButton.addEventListener("click", () => {
    clear();
});

// ****************
// Keyboard support
// ****************
window.addEventListener("keydown", (e) => {
    let button;

    if (e.key >= "0" && e.key <= "9") {
        handleNumberInput(e.key);
        button = Array.from(numberButton).find(b => b.textContent === e.key);
        if (button) applyPressedButton(button);
    }

    if (e.key === "," || e.key === ".") {
        commaButton.click();
        applyPressedButton(commaButton);
    }

    if (e.key === "c" || e.key === "C") {
        clear();
        applyPressedButton(clearButton);
    }

    if (e.key === "%") {
        percentButton.click();
        applyPressedButton(percentButton);
    }

    if (e.key === "n" || e.key === "N") {
        posMinButton.click();
        applyPressedButton(posMinButton);
    }

    if (e.key === "Backspace") {
        backspaceButton.click();
        applyPressedButton(backspaceButton);
    }

    const operators = {
        "/": operatorButtons[0],
        "*": operatorButtons[1],
        "-": operatorButtons[2],
        "+": operatorButtons[3]
    }

    if (operators[e.key]) {
        button = operators[e.key];
        handleOperatorInput(button.textContent);
        applyPressedButton(button);
    }

    if (e.key === "Enter" || e.key === "=") {
        equalsButton.click();
        applyPressedButton(equalsButton);
    }

    setTimeout(() => {
        if (button) revertButton(button);
    }, 100);
});

// *********************
// Buttonpress animation
// *********************
function applyPressedButton(button) {
    button.style.transform = "scale(0.95)";
    button.style.boxShadow = "inset 0 2px 4px rgba(0, 0, 0, 0.6)";

    setTimeout(() => {
        if (button) revertButton(button);
    }, 100);
}

function revertButton(button) {
    button.style.transform = "scale(1)";
    button.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.3)";
}

allButtons.forEach((button) => {
    button.addEventListener("mousedown", () => applyPressedButton(button));
});

// **************
// Copyright date
// **************
document.getElementById("year").textContent = "© " + new Date().getFullYear();
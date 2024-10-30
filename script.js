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

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (!displayValue) return;

        if (!operatorUsed) {
            operator = button.textContent;
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
            operator = button.textContent;
            populateStorage(num2, operator);
            num2 = 0;
            display.innerHTML = displayValue;
            num1 = displayValue;
            displayValue = 0;
        }
    });
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

numberButton.forEach((button) => {
    button.addEventListener("click", () => {
        if (displayValue === 0 || noWrite || displayValue === "0") {
            displayValue = "";
            displayValue += button.textContent;
            display.innerHTML = displayValue;
            noWrite = false;
        } else {
            displayValue += button.textContent;
            display.innerHTML = displayValue;
        }
    });
});

commaButton.addEventListener("click", () => {
    if (decimal === true) return;

    displayValue += ".";
    display.innerHTML = displayValue;
    decimal = true;
});

backspaceButton.addEventListener("click", () => {
    if (displayValue === 0) return;
    displayValue = displayValue.slice(0, -1);
    if (displayValue === "") displayValue = 0;
    display.innerHTML = displayValue;
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

document.getElementById("year").textContent = "© " + new Date().getFullYear();
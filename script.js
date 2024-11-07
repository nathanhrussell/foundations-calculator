function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

let numOne = "";
let numTwo = "";
let operator = "";
let isOperatorClicked = false;

function operate(operator, a, b,) {
    return operator(a, b)
}

const display = document.getElementById("display");

function initialiseDisplay() {
    display.textContent = "0";
    numOne = "";
    numTwo = "";
    operator = "";
    isOperatorClicked = false;
}

initialiseDisplay();

const gridItems = document.querySelectorAll(".grid-item");

gridItems.forEach(item => {
    item.addEventListener("click", () => {
        const value = item.getAttribute("data-value");

        if (value === "CLEAR") {
            initialiseDisplay();
            return;
        }

        if (["+", "-", "X", "÷"].includes(value)) {
            if (numOne && operator && !isOperatorClicked) {
                calculateResult();
            }
            operator = value;
            numOne = display.textContent;
            display.textContent += value;
            isOperatorClicked = true;
            return;
        }

        if (value === "=") {
            if (numOne && operator && display.textContent) {
                numTwo = display.textContent;
                calculateResult();
            }
            return;
        }

        if (display.textContent === "0" || isOperatorClicked) {
            display.textContent = value;
            isOperatorClicked = false;
        } else {
            display.textContent += value;
        }
    });
});


function calculateResult() {
    const num1 = parseFloat(numOne);
    const num2 = parseFloat(numTwo);

    let result;
    switch (operator) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "X":
            result = multiply(num1, num2);
            break;
        case "÷":
            result = num2 !== 0 ? divide(num1, num2) : "Error";
            break;
        default:
            result = "Error";
    }

    display.textContent = result.toString();
    numOne = result.toString();
    operator = "";
    numTwo = "";
    isOperatorClicked = false;
}
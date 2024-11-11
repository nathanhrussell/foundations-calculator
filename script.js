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

let numOne = "";
let numTwo = "";
let operator = "";
let isOperatorClicked = false;

function operate(operator, a, b) {
    return operator(a, b);
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

        if (value === "DEL") {
            // Handle deleting the last character
            if (isOperatorClicked && numTwo) {
                numTwo = numTwo.slice(0, -1);
                display.textContent = numOne + operator + numTwo;
            } else if (!isOperatorClicked && numOne) {
                numOne = numOne.slice(0, -1);
                display.textContent = numOne || "0"; // Display "0" if numOne is empty
            }
            return;
        }

        if (value === ".") {
            if (isOperatorClicked) {
                if (!numTwo.includes(".")) {
                    numTwo += numTwo ? "." : "0.";
                    display.textContent += ".";
                }
            } else {
                if (!numOne.includes(".")) {
                    numOne += numOne ? "." : "0.";
                    display.textContent = numOne;
                }
            }
            return;
        }

        if (["+", "-", "X", "÷"].includes(value)) {
            if (numOne && operator && !isOperatorClicked) {
                calculateResult();
            }
            operator = value;
            numOne = display.textContent;
            isOperatorClicked = true;
            display.textContent += value;
            return;
        }

        if (value === "=") {
            if (numOne && operator && numTwo) {
                calculateResult();
            }
            return;
        }

        if (isOperatorClicked) {
            numTwo += value;
            display.textContent = numOne + operator + numTwo;
        } else {
            numOne = numOne === "0" ? value : numOne + value;
            display.textContent = numOne;
        }
    });
});

document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key)) {
        // If a number key is pressed
        handleButtonClick(key);
    } else if (key === ".") {
        handleButtonClick(".");
    } else if (key === "Backspace") {
        handleButtonClick("DEL");
    } else if (key === "Escape") {
        handleButtonClick("CLEAR");
    } else if (key === "Enter" || key === "=") {
        handleButtonClick("=");
    } else if (["+", "-", "*", "/"].includes(key)) {
        let operatorSymbol = key;
        if (key === "*") operatorSymbol = "X"; // Map * to multiplication
        if (key === "/") operatorSymbol = "÷"; // Map / to division
        handleButtonClick(operatorSymbol);
    }
});

function handleButtonClick(value) {
    // Reuse existing logic by triggering the click based on the value
    if (value === "CLEAR") {
        initialiseDisplay();
        return;
    }

    if (value === "DEL") {
        if (isOperatorClicked && numTwo) {
            numTwo = numTwo.slice(0, -1);
            display.textContent = numOne + operator + numTwo;
        } else if (!isOperatorClicked && numOne) {
            numOne = numOne.slice(0, -1);
            display.textContent = numOne || "0";
        }
        return;
    }

    if (value === ".") {
        if (isOperatorClicked) {
            if (!numTwo.includes(".")) {
                numTwo += numTwo ? "." : "0.";
                display.textContent += ".";
            }
        } else {
            if (!numOne.includes(".")) {
                numOne += numOne ? "." : "0.";
                display.textContent = numOne;
            }
        }
        return;
    }

    if (["+", "-", "X", "÷"].includes(value)) {
        if (numOne && operator && !isOperatorClicked) {
            calculateResult();
        }
        operator = value;
        numOne = display.textContent;
        isOperatorClicked = true;
        display.textContent += value;
        return;
    }

    if (value === "=") {
        if (numOne && operator && numTwo) {
            calculateResult();
        }
        return;
    }

    if (isOperatorClicked) {
        numTwo += value;
        display.textContent = numOne + operator + numTwo;
    } else {
        numOne = numOne === "0" ? value : numOne + value;
        display.textContent = numOne;
    }
}


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

    if (typeof result === "number" && !isNaN(result)) {
        result = parseFloat(result.toFixed(4));
    }

    display.textContent = result.toString();
    numOne = result.toString();
    operator = "";
    numTwo = "";
    isOperatorClicked = false;
}

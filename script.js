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

// Inside the event listener for button clicks
gridItems.forEach(item => {
    item.addEventListener("click", () => {
        const value = item.getAttribute("data-value");

        if (value === "CLEAR") {
            initialiseDisplay();
            return;
        }

        // Add this block to handle the decimal point
        if (value === ".") {
            // If the display is currently "0", start with "0."
            if (display.textContent === "0") {
                display.textContent = "0."; // Start with "0."
            } else if (!display.textContent.includes(".")) {
                // Only add "." if it’s not already in the current number
                display.textContent += ".";
            }
            return; // Exit to prevent further processing of "."
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
            if (numOne && operator && numTwo) {
                calculateResult();
            }
            return;
        }

        if (isOperatorClicked) {
            numTwo += value;
            display.textContent += value;
        } else {
            // If display is "0", replace it with the new number or start with "0."
            display.textContent = display.textContent === "0" ? (value === "." ? "0." : value) : display.textContent + value;
            numOne += value;
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

// TODO: ROUND NUMBERS WITH LONG DECIMALS SO THEY DON'T OVERFLOW THE DISPLAY
// TODO: REDUCE TEXT SIZE WHEN LONG NUMBERS ENTERED (WITH A MIN VALUE TO ENSURE READABILITY?)
// TODO: ADDING A ZERO BEFORE A DECIMAL POINT DOESN'T CURRENTLY APPEAR
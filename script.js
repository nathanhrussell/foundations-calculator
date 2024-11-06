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

let numOne;
let numTwo;
let operator;

function operate(operator, a, b,) {
    return operator(a, b)
}

const display = document.getElementById("display");

const gridItems = document.querySelectorAll(".grid-item");

gridItems.forEach(item => {
    item.addEventListener("click", () => {
        const value = item.getAttribute("data-value");

        if (value === "CLEAR") {
            display.textContent = "";
        } else {
            display.textContent = display.textContent === "0" ? value : display.textContent + value;
        }
    });
});
const screen = document.querySelector('.calculator-screen');
const buttons = document.querySelectorAll('.btn');

let currentValue = '';
let firstOperand = '';
let operator = '';
let shouldResetScreen = false;

function resetScreen() {
    currentValue = '';
    shouldResetScreen = false;
}

function updateScreen() {
    screen.value = currentValue;
}

function handleNumber(number) {
    if (shouldResetScreen) resetScreen();
    currentValue += number;
}

function handleOperator(op) {
    if (operator) evaluate();
    firstOperand = currentValue;
    operator = op;
    shouldResetScreen = true;
}

function evaluate() {
    let result;
    const first = parseFloat(firstOperand);
    const second = parseFloat(currentValue);

    switch (operator) {
        case '+':
            result = first + second;
            break;
        case '-':
            result = first - second;
            break;
        case '*':
            result = first * second;
            break;
        case '/':
            result = first / second;
            break;
        default:
            return;
    }

    currentValue = result.toString();
    operator = '';
}

function clearCalculator() {
    currentValue = '';
    firstOperand = '';
    operator = '';
}

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.textContent >= '0' && button.textContent <= '9' || button.textContent === '.') {
            handleNumber(button.textContent);
        } else if (button.textContent === 'C') {
            clearCalculator();
        } else if (button.textContent === '=') {
            evaluate();
        } else {
            handleOperator(button.textContent);
        }
        updateScreen();
    });
});

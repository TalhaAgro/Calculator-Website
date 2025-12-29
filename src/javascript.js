let first = '';
let second = '';
let operator = null;
let answering = false;
let displayValue = '';
let result;
let decimal = false;
const keypad = document.querySelector('#keypad');

function add(num1, num2) {
    return (num1 + num2);
}
function subtract(num1, num2){
    return (num1-num2);
}
function multiply(num1, num2){
    return (num1*num2);
}
function divide(num1, num2){
    return (num1/num2);
}

function operate(num1, op, num2){
    num1 = Number(num1);
    num2 = Number(num2);
    if (op === '+'){
        return add(num1, num2);
    }
    else if (op === '-'){
        return subtract(num1, num2);
    }
    else if (op === 'x'){
        return multiply(num1, num2);
    }
    else if (op === '÷'){
        return divide(num1, num2);
    }

}

function digitClicked(digit) {
    if (digit === '.') {
        if (operator === null) {
            //we are typing the first number
            if (first.includes('.')) return; // Exit function if dot already exists
            if (first === '') { digit = '0.'; first = '0'; } // Optional: Turn '.' into '0.'
        } else {
            //second number
            if (second.includes('.')) return; // Exit function if dot already exists
            if (second === '') { digit = '0.'; second = '0'; } // Optional: Turn '.' into '0.'
        }
    }
    if (answering === true){
        first = '';
        displayValue = '';
        answering = false;
    }
    if (operator != null){
        second += digit;
    }
    else if (operator === null){
        first += digit;
    }
    
    displayValue += digit;
    updateDisplay();
}

function equalsClicked() {
    /**assume valid expression? */
    if (first !== '' && operator !== null && second !== ''){
        result = operate(first, operator, second);
        if (result != 'Infinity'){
            updateDisplay(result);
            first = result.toString();
            second = '';
            operator = null;
            displayValue=first;
            answering = true;
        }
        
    }
}

function operatorClicked(op) {
    if (first !== '' && operator !== null && second !== '') {
        equalsClicked();
    }
    
    if (first !== '') {
        operator = op;
        displayValue = first + operator;
        updateDisplay();
    }
    answering = false;
    
}

function deleteDisplay() {
    if (displayValue.length === 0) return;

    //remove last character
    displayValue = displayValue.slice(0, -1);

    //keep variables in sync with string removal
    if (second !== '') {
        second = second.slice(0, -1);
    } else if (operator !== null) {
        operator = null;
    } else {
        first = first.slice(0, -1);
    }

    updateDisplay(displayValue === '' ? '0' : displayValue);
    answering = false;
}

function updateDisplay(val = displayValue){
    document.querySelector('#display-current').textContent = val;
}

function clearDisplay() {
    displayValue ='';
    first = '';
    second = '';
    operator = null;
    updateDisplay('0');
}

function main() {
    updateDisplay('0');
    keypad.addEventListener('click', (e) => {
    if (!e.target.matches('button')) return;
    if (e.target.classList.contains('function')){
        if (e.target.id === 'equals') {
            equalsClicked();
        }
        if (e.target.id === 'AC') {
            clearDisplay();
        }
        if (e.target.id === 'delete'){
            deleteDisplay();
        }
    }
    else if (e.target.classList.contains('operator')){
        operatorClicked(e.target.textContent);
    }
    else {
        const digit = e.target.textContent;
        digitClicked(digit);
    }


    });


    window.addEventListener('keydown', (e) => {
        if ((e.key >= '0' && e.key <='9') || (e.key === '.')){
            digitClicked(e.key);
        }
        else if (e.key === '+'){
            operatorClicked('+');
        }
        else if (e.key === '-'){
            operatorClicked('-');
        }
        else if (e.key === '*'){
            operatorClicked('x');
        }
        else if (e.key === '/'){
            operatorClicked('÷');
        }
        else if (e.key === 'Enter' || e.key === '='){
            equalsClicked();
        }
        else if (e.key === 'Backspace'){
            deleteDisplay();
        }
        else if (e.key === 'Escape'){
            clearDisplay();
        }
    })
}
main()

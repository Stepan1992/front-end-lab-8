import showCalculator from './interface-module.js';
import calculation from './calculating-module.js';
import '../styles/styles.css';

showCalculator();

(function () {
    let screen = document.getElementById('screen'),
        buttons = document.getElementById('buttons'),
        firstOperand = '',
        secondOperand = '',
        operator = null,
        result,
        flag,
        lastInputedValue;

    buttons.addEventListener('click', (event) => {
        let inputedValue = event.target.value;

        if (result && inputedValue !== 'C') {
            return;
        };

        if (inputedValue === '-' && !firstOperand) {
            firstOperand = inputedValue;
            screen.value = inputedValue;
            return;
        };

        if (inputedValue === '-' && firstOperand && operator && !secondOperand) {
            secondOperand = '-';
            screen.value += inputedValue;
        };

        if (inputedValue) {
            if (!isNaN(parseInt(inputedValue)) || inputedValue === '.') {
                if (inputedValue === '.' && lastInputedValue === '.') {
                    return;
                };
                if (!flag) {
                    if (firstOperand && inputedValue === '.' && (parseInt(firstOperand) != firstOperand)) {
                        return;
                    };
                    firstOperand += inputedValue;
                } else {
                    if (secondOperand && inputedValue === '.' && (parseInt(secondOperand) != secondOperand)) {
                        return;
                    };
                    secondOperand += inputedValue;
                };
                screen.value += inputedValue;
            };
            lastInputedValue = inputedValue;

            if (isNaN(parseInt(inputedValue)) && inputedValue !== '=' && inputedValue !== 'C' && inputedValue !== '.') {
                if (inputedValue === '-' && firstOperand === '-') {
                    return;
                };
                if (!firstOperand) {
                    return;
                };
                if (operator) {
                    return;
                };
                operator = inputedValue;
                flag = true;
                screen.value += inputedValue;
            };

            if (inputedValue === 'C') {
                firstOperand = '';
                secondOperand = '';
                screen.value = '';
                result = null;
                operator = null;
                flag = false;
            };
            result = calculation(firstOperand, secondOperand, inputedValue, operator);

            if (result) {
                screen.value = result;
                secondOperand = '';
                operator = null;
            };
        };
    });
}());
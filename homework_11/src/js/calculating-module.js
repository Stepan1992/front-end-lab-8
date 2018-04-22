export default function (firstOperand, secondOperand, inputedValue, operator) {
    let result;
    if (firstOperand && secondOperand && inputedValue === '=') {
        switch (operator) {
            case '+':
                result = +firstOperand + +secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '/':
                result = firstOperand / secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '%':
                result = (firstOperand / 100) * secondOperand;
                break;
        };
        if (!result) {
            result = '0';
        };
    };
    return result;
};
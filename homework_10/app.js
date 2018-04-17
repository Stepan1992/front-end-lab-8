class Input {
    constructor(placeHolder) {
        this.placeHolder = placeHolder || "Type...";
        this._value = "";
    };

    get value() {
        return this._value;
    };

    setValue(newValue) {
        this._value = newValue;
    };
};

class NumberInput extends Input {
    constructor(placeHolder) {
        super(placeHolder);
        this.type = "number";
    };
};

class InputDecorator extends Input {
    constructor(input) {
        super();
        for (let prop in input) {
            this[prop] = input[prop];
        };
    };

    validating(flag, message) {
        if (this.flag === false) {
            if (message) {
                this.message = `${this.message}, ${message}`;
            };
            return;
        };
        this.flag = flag;

        if(this.flag === true){
            delete this.message;
        };

        if (message) {
            this.message = message;
        };
    };

    get valid() {
        if (this.message && !this.flag) {
            return `${this.flag} ${this.message}`;
        };
        return `${this.flag} all validators pass`;
    };

    setValue(newValue) {
        super.setValue(newValue);
        delete this.flag;
    };
};

class AddNumberValidation extends InputDecorator {
    constructor(input) {
        super(input);
        let type = input.type || 'number';
        if (typeof input._value === type) {
            super.validating(true);
        } else {
            super.validating(false, 'because of number validator');
        };
    };
};

class AddRequiredValidation extends InputDecorator {
    constructor(input) {
        super(input);
        if (input._value !== '' && typeof input._value !== 'undefined' && input._value !== null) {
            super.validating(true);
        } else {
            super.validating(false, 'because of required validator');
        };
    };
};

class AddMaxLengthValidation extends InputDecorator {
    constructor(input, maxLength) {
        super(input);
        if (String(input._value).length > 0 && String(input._value).length <= maxLength) {
            super.validating(true);
        } else {
            super.validating(false, 'because of max length validator');
        };
    };
};

let numberInput = new NumberInput('Type numbers...');

numberInput = new AddRequiredValidation(numberInput);
console.log(numberInput.valid);

numberInput.setValue('1');
numberInput = new AddNumberValidation(numberInput);
console.log(numberInput.valid);

numberInput.setValue(1);
numberInput = new AddNumberValidation(numberInput);
console.log(numberInput.valid);

numberInput.setValue(1111111111111111111111111111);
numberInput = new AddMaxLengthValidation(numberInput, 5);
console.log(numberInput.valid);
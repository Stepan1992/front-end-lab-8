export default function () {
    let calculator = document.getElementById('calculator'),
        screen = document.createElement('input'),
        valueArray = ['%', '*', '/', 'C', '7', '8', '9', '+', '4', '5', '6',
            '-', '1', '2', '3', '=', '0', '.'
        ];

    screen.setAttribute('id', 'screen');
    screen.setAttribute('readonly', '');
    screen.setAttribute('placeholder', '0');
    calculator.appendChild(screen);
    let mainDiv = document.createElement('div');
    mainDiv.setAttribute('id', 'buttons');
    for (let i = 0; i < valueArray.length; i++) {
        let inp = document.createElement('input');
        inp.setAttribute('type', 'button');
        inp.setAttribute('value', valueArray[i]);
        inp.className = 'button';
        mainDiv.appendChild(inp);
    };
    calculator.appendChild(mainDiv)
};
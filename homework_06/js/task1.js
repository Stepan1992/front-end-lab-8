var a = +prompt("Input first side of a triangle"),
    b = +prompt("Input second side of a triangle"),
    c = +prompt("Input third side of a triangle");

if (!isNaN(parseFloat(a)) && isFinite(a) && !isNaN(parseFloat(b)) && isFinite(b) && !isNaN(parseFloat(c)) && isFinite(c) && (a < b + c) && (b < a + c) && (c < a + b)) {

    var p = (a + b + c) / 2,
        square = Math.sqrt(p * (p - a) * (p - b) * (p - c));

    if (square != square.toFixed(2)) {
        square = square.toFixed(2);
    };

    if ((Math.pow(a, 2) === Math.pow(b, 2) + Math.pow(c, 2)) || (Math.pow(b, 2) === Math.pow(c, 2) + Math.pow(a, 2)) || (Math.pow(c, 2) === Math.pow(a, 2) + Math.pow(b, 2))) {
        console.log("Type of triangle is right triangle and square is " + square);
    } else if (a === b && a === c) {
        console.log("Type of triangle is equilateral and square is " + square);
    } else if (a === b || b === c || c === a) {
        console.log("Type of triangle is isosceles and square is " + square);
    } else {
        console.log("Type of triangle is scalene and square is " + square);
    };

} else {
    console.log("Incorrect data");
};
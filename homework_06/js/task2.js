var euros = +prompt("Input amount of EURO "),
    dollars = +prompt("Input amount of USD "),
    euroСourse = 33.4602,
    usdСourse = 27.1196;

if (!isNaN(parseFloat(euros)) && isFinite(euros) && !isNaN(parseFloat(dollars)) && isFinite(dollars)) {

    var eurosToUAH = (euros * euroСourse);
    if (eurosToUAH != eurosToUAH.toFixed(2)) {
        eurosToUAH = eurosToUAH.toFixed(2);
    };

    var dollarsToUAH = (dollars * usdСourse);
    if (dollarsToUAH != dollarsToUAH.toFixed(2)) {
        dollarsToUAH = dollarsToUAH.toFixed(2);
    };

    var oneEuro = euroСourse / usdСourse;
    if (oneEuro != oneEuro.toFixed(2)) {
        oneEuro = oneEuro.toFixed(2);
    };

    console.log(euros + " euros are equal " + eurosToUAH + " UAH, " + dollars + " dollars are equal " + dollarsToUAH + " UAH, one euro is equal " + oneEuro + " dollars.");
} else {
    console.log("Incorrect data");
};
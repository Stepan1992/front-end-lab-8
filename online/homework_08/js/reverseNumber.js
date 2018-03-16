function reverseNumber(number) {
    let str = String(number),
        result;

    if (str[0] === "-") {
        result = "-" + str.slice(1).split("").reverse().join("");
    } else {
        result = str.split("").reverse().join("");
    };
    return parseFloat(result);
};
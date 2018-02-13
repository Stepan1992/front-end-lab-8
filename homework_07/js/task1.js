let number = +prompt("Enter natural number from 1 to 20"),
    isNatural = Number.isInteger(number),
    element = "[~]",
    emptyElement = "   ",
    elementsCount = 1,
    spacesCount = number,
    result = "";

if (isNatural && number > 0 && number <= 20) {

    for (let i = 0; i < number; i++) {
        for (let j = 0; j < number * 2 + 1; j++) {
            if (j < spacesCount) {
                result = result + emptyElement;
            } else if (j >= spacesCount && j < (spacesCount + elementsCount)) {
                result = result + element;
            } else {
                result = result + emptyElement;
            }
        };
        elementsCount += 2;
        spacesCount--;
        result += "\n";
    };
    console.log(result);
} else {
    console.error("Incorrect!");
};
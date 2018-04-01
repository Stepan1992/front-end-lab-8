const max = process.argv[2];

let fizzBuzz = function* () {
    let start = 1,
        result = "";

    while (start <= max) {
        if (start % 3 === 0 && start % 5 === 0) {
            result = "FizzBuzz";
        } else if (start % 3 === 0) {
            result = "Fizz";
        } else if (start % 5 === 0) {
            result = "Buzz";
        } else {
            result = start;
        }
        yield result;
        start++;
    };
}();

for (let n of fizzBuzz) {
    console.log(n);
};
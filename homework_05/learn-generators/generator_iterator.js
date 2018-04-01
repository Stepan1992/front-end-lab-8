function* factorial(n) {
    let counter = 1,
        result = 1;
    while (counter <= n) {
        result *= counter;
        counter++;
        yield result;
    };
};

for (let n of factorial(5)) {
    console.log(n)
};
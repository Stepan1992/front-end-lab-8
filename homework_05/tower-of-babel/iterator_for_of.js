const max = process.argv[2];

let FizzBuzz = {
    [Symbol.iterator]() {
        let from = 1;
        return {
            next() {
                if (from <= max) {
                    if (from % 3 === 0 && from % 5 === 0) {
                        from++;
                        return {
                            done: false,
                            value: "FizzBuzz"
                        };
                    } else if (from % 3 === 0) {
                        from++;
                        return {
                            done: false,
                            value: "Fizz"
                        };
                    } else if (from % 5 === 0) {
                        from++;
                        return {
                            done: false,
                            value: "Buzz"
                        };
                    } else if (from <= max) {
                        return {
                            done: false,
                            value: from++
                        };
                    } else {
                        return {
                            done: true
                        };
                    };
                } else {
                    return {
                        done: true
                    };
                };
            }
        };
    }
};

for (let n of FizzBuzz) {
    console.log(n);
};
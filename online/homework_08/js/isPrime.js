function isPrime(number) {
    if (parseInt(number) !== number || number <= 0) {
        return false;
    } else {
        for (let i = 2; i < number; i++) {
            if (number % i === 0) {
                return false;
            };
        };
        return true;
    };
};
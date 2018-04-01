const waitFewSec = (msec, triggerFail) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (triggerFail) {
                reject(false);
                return;
            }

            resolve(true);
        }, msec);
    });
};
const asyncFn = async () => {
    const result = await waitFewSec(1000);
    return result;
};

async function doAsyncMagic() {
    let resultsArray = [];
    for (let i = 0; i < 4; i++) {
        try {
            let result = await asyncFn();
            resultsArray.push(result);
        } catch (error) {
            resultsArray.push(error);
        };
    };
    return console.log(resultsArray);
};

doAsyncMagic();

async function* rangeGen() {
    for (let i = 1; i <= 15; i++) {
        yield i;
    }
}

async function iterateRange() {
    let sum = 0;
    for await (let number of rangeGen()) {
        sum += number;
    };
    return sum;
};

iterateRange();
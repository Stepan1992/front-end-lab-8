function askFoo() {
    return new Promise(function (resolve, reject) {
        resolve('foo');
    });
};

function run(generator) {
    let gen = generator();
    gen.next().value.then(function (result) {
        gen.next(result);
    }).catch(function (e) {
        gen.throw(e);
    });
};

run(function* () {
    try {
        let foo = yield askFoo();
        console.log(foo);
    } catch (e) {
        console.log(e);
    };
});
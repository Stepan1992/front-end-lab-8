function* upper(items) {
    for (let elem of items) {
        try {
            yield elem.toUpperCase();
        } catch (e) {
            yield null;
        };
    };
};

let bad_items = ['a', 'B', 1, 'c'];

for (let item of upper(bad_items)) {
    console.log(item);
};
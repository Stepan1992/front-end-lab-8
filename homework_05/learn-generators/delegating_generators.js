function* flat(arr) {
    for (let elem of arr) {
        if (!Array.isArray(elem)) {
            yield elem;
        }else{
            yield *flat(elem);
        };
    };
};

let A = [1, [2, [3, 4], 5], 6];
for (let f of flat(A)) {
    console.log(f);
};
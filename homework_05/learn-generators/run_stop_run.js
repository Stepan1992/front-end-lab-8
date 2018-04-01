function* range(from, to) {
    while (from <= to) {
        yield from;
        from++;
    };
};

for (let r of range(5, 10)) {
    console.log(r);
};
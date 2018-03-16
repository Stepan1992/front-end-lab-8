function getFilteredArray(array, callback) {
    let newArray = [];
    forEach(array, function (el) {
        if (callback(el)) {
            newArray.push(el);
        };
    });
    return newArray;
};
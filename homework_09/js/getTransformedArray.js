function getTransformedArray(array, callback) {
    let newArray = [];
    forEach(array, function (el) {
        newArray.push(callback(el));
    });
    return newArray;
};
function collectIds(movies) {
    let result = getTransformedArray(getFilteredArray(movies, function (el) {
        return el.rating > 3;
    }), function (el) {
        return el.id;
    });
    return result;
};
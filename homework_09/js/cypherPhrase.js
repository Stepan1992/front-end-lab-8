function cypherPhrase(obj, str) {
    let result = getTransformedArray(str.split(""), function (el) {
        return obj[el] || el;
    });
    return result.join("");
};
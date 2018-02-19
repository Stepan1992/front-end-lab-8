function decypherPhrase(obj, str) {
    let reversedCharactersMap = {};
    for (let key in obj) {
        reversedCharactersMap[obj[key]] = key;
    };
    return cypherPhrase(reversedCharactersMap, str);
};
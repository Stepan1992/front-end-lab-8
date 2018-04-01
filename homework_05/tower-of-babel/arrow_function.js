let inputs = process.argv.slice(2);
let result = inputs.map((el) => el[0].toUpperCase())
    .reduce((a, b)=> a + b);
console.log(result);
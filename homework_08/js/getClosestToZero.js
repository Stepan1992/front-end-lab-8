function getClosestToZero(...args) {

    let leftNumbersArr = args.filter(element => element < 0),
        rightNumbersArr = args.filter(element => element > 0);

    let leftClosest = Math.max(...leftNumbersArr),
        rightClosest = Math.min(...rightNumbersArr);

    if (Math.abs(leftClosest) > rightClosest) {
        return rightClosest;
    } else {
        return leftClosest;
    };
};

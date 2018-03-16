let game = confirm('Do you want to play a game?');

if (game) {
    let nextGame = true,
        range = 6,
        totalPrize = 0,
        bet = 10,
        prize,
        answear;

    while (nextGame) {
        let attemptsCount = 3,
            randomNumber = Math.floor(Math.random() * range);
        prize = bet;

        for (let i = 1; i <= 3; i++) {
            let rede = "Enter a number from 0 to " + (range - 1) + "\r" + "Attempts left: " + attemptsCount + "\r" + "Total prize: " + totalPrize +
                "$\r" + "Possible prize on current attempts: " + prize + "$" + "\r";
            attemptsCount--;
            answear = prompt(rede);

            if (answear !== null && answear !== '') {
                answear = Number(answear);
            };

            if (answear === randomNumber) {
                totalPrize += prize;
                nextGame = confirm("Do you want to continue?");
                if (!nextGame) {
                    console.log("Thank you for a game. Your prize is: " + totalPrize + "$");
                    nextGame = confirm("Do you want to play again?");
                    totalPrize = 0;
                    range = 6;
                    bet = 10;
                    break;
                } else {
                    range += 5;
                    bet *= 3;
                };
                break;
            };

            if (i === 3 || answear === null) {
                console.log("Thank you for a game. Your prize is: " + totalPrize + "$");
                totalPrize = 0;
                range = 6;
                bet = 10;
                nextGame = confirm("Do you want to play again?");
                break;
            } else {
                prize = Math.floor(prize / 2);
            };
        };
    }
} else {
    console.log("You did not become a millionaire");
};
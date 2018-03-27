// Extra task

function fight(fighter, enemy) {
    console.log(`----${fighter.name} - ${fighter.currentHitpoints}HP vs ${enemy.name} - ${enemy.currentHitpoints}HP----`);

    function attacking(fighter, enemy) {
        let turn = Math.floor(Math.random() * 2),
            firstPlayer,
            secondPlayer;

        if (arguments[turn] === fighter) {
            firstPlayer = fighter;
            secondPlayer = enemy;
        } else {
            firstPlayer = enemy;
            secondPlayer = fighter;
        };

        if (!Math.floor(Math.random() * 5)) {
            let playerWithSkill = arguments[Math.floor(Math.random() * 2)],
                playersSkills = [];
            if (playerWithSkill instanceof Champion) {
                playersSkills.push('heal', 'defence');
            } else {
                playersSkills.push('enrage', 'fury');
            };

            let skill = playersSkills[Math.floor(Math.random() * 2)];
            playerWithSkill[skill]();
            console.log(`${playerWithSkill.name} use ${skill}`);

            switch (skill) {
                case 'heal':
                    if (playerWithSkill.currentHitpoints === playerWithSkill.totalHitpoints) {
                        console.log(`${playerWithSkill.name} wasted his heal skill. Hi has had enough HP`);
                    } else {
                        console.log(`${playerWithSkill.name} increased his HP`);
                    };
                    break;
                case 'defence':
                    console.log(`${playerWithSkill.name} increases his total HP to ${
                        playerWithSkill.totalHitpoints} and can block next incoming attack`);
                    break;
                case 'enrage':
                    console.log(`Next two attacks of ${playerWithSkill.name} will deal double damage`);
                    break;
                case 'fury':
                    if (playerWithSkill.currentHitpoints > 5) {
                        console.log(`${playerWithSkill.name} increases attack by 2`);
                    }
                    break;
            };

        };

        firstPlayer.fight(secondPlayer);
        console.log(`${firstPlayer.name} hit ${secondPlayer.name}`);
        if (secondPlayer.currentHitpoints <= 0) {
            console.log(`${firstPlayer.name} killed ${secondPlayer.name}`);
            console.log(`----${firstPlayer.name} has won----`);
            clearInterval(round);

        } else {
            console.log(`${secondPlayer.name} has ${secondPlayer.currentHitpoints}HP`);
        };
        console.log('------------------------------------------------');
    };

    let round = setInterval(function () {
        attacking(fighter, enemy);
    }, 2000);
};
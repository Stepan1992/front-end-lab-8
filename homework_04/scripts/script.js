// Task 1

function assign(target, obj) {
    if (target === undefined || target === null) {
        console.log('The target object can not be null or undefined');
        return;
    };

    for (let i = 1; i < arguments.length; i++) {
        if (arguments[i] === undefined || arguments[i] === null) {
            continue;
        };

        let nextObj = arguments[i];

        for (let key in nextObj) {
            let descriptor = Object.getOwnPropertyDescriptor(nextObj, key);

            if (!nextObj.hasOwnProperty(key)) {
                continue;
            };

            if (target.hasOwnProperty(key)) {
                let targetDescriptor = Object.getOwnPropertyDescriptor(target, key);
                if (!targetDescriptor.writable) {
                    continue;
                };
            };
            target[key] = nextObj[key];
            Object.defineProperty(target, key, descriptor);
        };
    };
    return target;
};

// Task 2

function Fighter({
    name,
    attack,
    hitpoints
}) {

    this.name = name;
    this.attack = attack;
    this.totalHitpoints = hitpoints;
    this.currentHitpoints = this.totalHitpoints;
};

Fighter.valueChecker = function (value) {
    if (!isNaN(parseFloat(value)) && isFinite(value) && value > 0) {
        return true;
    } else {
        console.log('You can set only finite number more than 0');
    };
};

Fighter.prototype.getHitpoints = function () {
    return this.currentHitpoints;
};

Fighter.prototype.setHitpoints = function (value) {
    if (Fighter.valueChecker(value)) {
        this.currentHitpoints = value;
    };
};

Fighter.prototype.getTotalHitpoints = function () {
    return this.totalHitpoints;
};

Fighter.prototype.setTotalHitpoints = function (value) {
    if (Fighter.valueChecker(value)) {
        this.totalHitpoints = value;
    };
};

Fighter.prototype.getAttack = function () {
    return this.attack;
};

Fighter.prototype.setAttack = function (value) {
    if (Fighter.valueChecker(value)) {
        this.attack = value;
    };
};

Fighter.prototype.fight = function (enemy) {
    if (enemy instanceof Fighter) {
        if (enemy.name === this.name) {
            console.log(`${this.name} can not fight with yourself`);
            return;
        };

        if (enemy.currentHitpoints === 0) {
            console.log(`${enemy.name} is dead`);
            return;
        };

        if (enemy instanceof Champion && enemy.defenceCount > 0) {
            enemy.defenceCount--;
            console.log(`${enemy.name} repulsed the attack`);
            return;
        };

        if (this instanceof Monster && this.angerCount > 0) {
            enemy.currentHitpoints -= this.attack;
            this.angerCount--;
        };

        enemy.currentHitpoints -= this.attack;
        if (enemy.currentHitpoints <= 0) {
            if (this instanceof Champion) {
                this.attack++;
            };
            if (this instanceof Monster) {
                this.totalHitpoints += Math.floor(enemy.totalHitpoints * 0.1);
                this.currentHitpoints += Math.floor(enemy.totalHitpoints * 0.25);
                if (this.currentHitpoints > this.totalHitpoints) {
                    this.currentHitpoints = this.totalHitpoints;
                };
            };
            enemy.currentHitpoints = 0;
        };
    } else {
        console.log('Please try to add Fighter instance');
    };
};

Fighter.prototype.isAlive = function () {
    return this.currentHitpoints > 0 ? true : false;
};

function Champion(config) {
    Fighter.call(this, config);
    this.defenceCount = 0;
};

Champion.prototype = Object.create(Fighter.prototype);
Champion.prototype.constructor = Champion;

Champion.prototype.heal = function () {
    this.currentHitpoints += 5;
    if (this.currentHitpoints > this.totalHitpoints) {
        this.currentHitpoints = this.totalHitpoints;
    };
};

Champion.prototype.defence = function () {
    this.defenceCount++;
    this.totalHitpoints++;
};

function Monster(config) {
    Fighter.call(this, config);
    this.angerCount = 0;

};

Monster.prototype = Object.create(Fighter.prototype);
Monster.prototype.constructor = Monster;

Monster.prototype.enrage = function () {
    this.angerCount += 2;
};

Monster.prototype.fury = function () {
    if (this.currentHitpoints > 5) {
        this.totalHitpoints -= 5;
        this.currentHitpoints -= 5;
        this.attack += 2;
    } else {
        console.log(`${this.name} don't have enough hitpoints to use this skill`);
    };
};


//Task 2
var hunter = new Champion({name: 'Rexxar', attack: 10, hitpoints: 60});
var beast = new Monster({name: 'King Krush', attack: 8, hitpoints: 80});


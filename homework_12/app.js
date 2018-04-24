const model = {
    currentPerson: {},
    allPersons: [{
        name: 'Lily Butler',
        score: 2,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/1.jpg'
    }, {
        name: 'Waller Perry',
        score: 4,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/women/1.jpg'
    }, {
        name: 'Tammi Donovan',
        score: 5,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/2.jpg'
    }, {
        name: 'Doreen Flowers',
        score: 4,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/3.jpg'
    }, {
        name: 'Price Pace',
        score: 2,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/4.jpg'
    }, {
        name: 'Larson Maldonado',
        score: 1,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/5.jpg'
    }, {
        name: 'Berg Bolton',
        score: 5,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/women/2.jpg'
    }, {
        name: 'Mack Lott',
        score: 3,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/6.jpg'
    }, {
        name: 'Rosanna Mcleod',
        score: 4,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/7.jpg'
    }, {
        name: 'Rosalie Rice',
        score: 1,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/8.jpg'
    }, {
        name: 'Virginia Buchanan',
        score: 2,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/women/3.jpg'
    }, {
        name: 'Lorna Stein',
        score: 4,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/9.jpg'
    }, {
        name: 'Rosalie Steele',
        score: 3,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/women/4.jpg'
    }, {
        name: 'Wilcox Boyd',
        score: 5,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/10.jpg'
    }, {
        name: 'Ollie Rice',
        score: 5,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/11.jpg'
    }]
};

const control = {
    init: function () {
        listView.init();
        listView.render();

        scoresView.init();
        scoresView.render();

        profileView.init();

        controlsView.init();
        controlsView.render();
    },
    getAllNames: function () {
        return model.allPersons.map(el => el.name);
    },
    getAllScores: function () {
        return model.allPersons.map(el => el.score);
    },
    setCurrentPerson: function (index) {
        model.currentPerson = model.allPersons[index];
        this.viewCurrentProfile();
    },
    getCurrentPerson: function () {
        return model.currentPerson;
    },
    viewCurrentProfile: function () {
        profileView.render();
    },
    setCurrentPersonScore: function (value) {
        model.currentPerson.score = value;
        profileView.render();
        scoresView.render();
        controlsView.render();
    },
    listSorting: function (column, order) {
        if (column === 'name') {
            if (order === 'up') {
                model.allPersons.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    };
                    if (a.name < b.name) {
                        return -1;
                    };
                });
            } else {
                model.allPersons.sort((a, b) => {
                    if (a.name < b.name) {
                        return 1;
                    };
                    if (a.name > b.name) {
                        return -1;
                    };
                });
            };
        } else {
            if (order === 'up') {
                model.allPersons.sort((a, b) => a.score - b.score);
            } else {
                model.allPersons.sort((a, b) => b.score - a.score);
            };
        };
        listView.render();
        scoresView.render();
    }
};

const listView = {
    init: function () {
        this.$container = $('.names');
        this.handleClicks();
    },
    render: function () {
        let template = control.getAllNames().reduce((acc, cur, i) => {
            return acc += `<li>${cur}</li>`;
        }, '');
        this.$container.html(template);
    },
    handleClicks: function () {
        this.$container.on('click', 'li', function (e) {
            let currentIndex = $(e.target).index();
            control.setCurrentPerson(currentIndex);
        });
    }
};

const scoresView = {
    init: function () {
        this.$container = $('.scores');
        this.handleClicks();
    },
    render: function () {
        let template = control.getAllScores().reduce((acc, cur) => {
            return acc += `
                <li>
                    <span>${cur}</span>
                    <input class="hidden score-input" type="text" value="${cur}">
                </li>
            `
        }, '');
        this.$container.html(template);
    },
    handleClicks: function () {
        this.$container.on('click', 'li', function (e) {
            let $currentLi = $(e.target);
            let $currentSpan = $currentLi.find('span');
            let $currentInput = $currentLi.find('input.score-input');
            let currentIndex = $currentLi.index();
            if (!$currentInput.is('.hidden')) {
                return false;
            }
            control.setCurrentPerson(currentIndex);
            $currentSpan.addClass('hidden');
            $currentInput.removeClass('hidden').focus();
        });
        this.$container.on('focusout .score-input', function (e) {
            let newScore = $(e.target).val();
            control.setCurrentPersonScore(newScore);
        });
    }
};

const profileView = {
    init: function () {
        this.$container = $('.profile');
    },
    render: function () {
        let currentPerson = control.getCurrentPerson();
        let template = `
            <img src="${currentPerson.photoUrl}">
            <h3>${currentPerson.name}</h3>
            <p>Score:${currentPerson.score}</p>
        `
        this.$container.html(template);
    }
};

const controlsView = {
    init: function () {
        this.$container = $('.sort-controls');
        this.handleClicks();
    },
    render: function () {
        let template = `<li class="controls-name">Name<div class="arrow controls-down" data-column="name" data-order="down"></div>
        <div class="arrow controls-up" data-column="name" data-order="up"></div></li>
        <li class="controls-score">Score<div class="arrow controls-down" data-order="down" data-column="score"></div>
        <div class="arrow controls-up" data-column="score" data-order="up"></div></li>`;
        this.$container.html(template);
    },
    handleClicks: function () {
        this.$container.on('click', function (event) {
            let $currentElement = $(event.target);
            if ($currentElement.hasClass('arrow')) {
                let column = $currentElement.data('column'),
                    order = $currentElement.data('order');
                    $currentElement.addClass('active').siblings().removeClass('active').css({
                    display: 'none'
                });
                $currentElement.parent().siblings().children().each(function () {
                    $(this).removeClass('active').css({
                        display: 'block'
                    });
                });
                control.listSorting(column, order);
            };
        });
    }
};

control.init();
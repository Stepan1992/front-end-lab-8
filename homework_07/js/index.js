(function game() {
    let turnsCount = 256,
        container = $('#container'),
        x = 0,
        y = -1;

    for (let i = 0; i < turnsCount; i++, x++) {
        let cell = $('<div></div>').addClass('cell'),
            stone = $('<div></div>').addClass('stone');
        if (i % 16 === 0) {
            x = 0;
            y++;
        };
        stone.attr({
            'data-x': x,
            'data-y': y
        });
        cell.append(stone);
        container.append(cell);
    };

    let playerSwitcher = true,
        color = 'white',
        firstPlayer = $('#player1'),
        secondPlayer = $('#player2');

    firstPlayer.addClass('active-player');
    secondPlayer.removeClass('active-player');
    $('.stone').hover(function () {
        if (!$(this).is('[data-player]')) {
            $(this).css({
                'backgroundColor': `${color}`,
                'opacity': '0.5'
            });
        };
    }, function () {
        if (!$(this).is('[data-player]')) {
            $(this).css({
                'opacity': '0'
            });
        };
    });

    container.click(function (event) {
        let clickedElement = $(event.target);

        if (clickedElement.hasClass('stone') && !clickedElement.attr('data-player')) {
            if (playerSwitcher) {
                clickedElement.css({
                    'backgroundImage': 'url("img/white-ball.jpg")',
                    'opacity': '1'
                }).attr('data-player', 'white');
                playerSwitcher = false;
                color = 'black';
                firstPlayer.removeClass('active-player');
                secondPlayer.addClass('active-player');
            } else {
                clickedElement.css({
                    'backgroundImage': 'url("img/black-ball.jpg")',
                    'opacity': '1'
                }).attr('data-player', 'black');
                playerSwitcher = true;
                color = 'white';
                secondPlayer.removeClass('active-player');
                firstPlayer.addClass('active-player');
            };

            let gameOver = false;
            winChecker(clickedElement, gameOver, container);
        };
    });

    function winChecker(stone, gameOver, container) {
        let x = stone.attr('data-x'),
            y = stone.attr('data-y'),
            currentPlayer = stone.attr('data-player');

        function winMessage() {
            $('.stone').unbind();
            gameOver = true;
            container.off();
            $('#modal-text').text(`${currentPlayer.charAt(0).toUpperCase() + currentPlayer.substr(1)} won!`);
            setTimeout(function () {
                $('#modal').modal('show');
            }, 2000);
            $('#newGame').click(function () {
                container.empty();
                game();
            });
        };

        function animation(array) {
            array.forEach(element => {
                element.animate({
                    width: "30px",
                    height: "30px",
                    bottom: '-13px',
                    left: '-15px'
                }, 1000).animate({
                    width: "24px",
                    height: "24px",
                    bottom: '-17px',
                    left: '-12px'
                }, 1000, function () {
                    animation(array);
                });
            });
        };

        if (!gameOver) {
            linesChecker(true);
        };

        function linesChecker(xLine) {
            let j, k;
            let counter = 0,
                direction = true,
                victoriousLine = [];

            if (xLine) {
                j = x;
                k = x;
            } else {
                j = y;
                k = y;
            };

            while (true) {
                let checkingElement;
                if (xLine) {
                    checkingElement = $(`.stone[data-x="${j}"].stone[data-y="${y}"]`);
                } else {
                    checkingElement = $(`.stone[data-x="${x}"].stone[data-y="${j}"]`);
                };
                if (direction) {
                    if (checkingElement.attr('data-player') === currentPlayer) {
                        counter++;
                        victoriousLine.push(checkingElement);
                        j++;
                    } else {
                        direction = false;
                        j = k;
                        counter--;
                    };
                } else {
                    if (checkingElement.attr('data-player') === currentPlayer) {
                        counter++;
                        victoriousLine.push(checkingElement);
                        j--;
                    } else {
                        break;
                    };
                };
            };

            if (counter >= 4) {
                animation(victoriousLine);
                winMessage();
                return;
            };

            if (xLine) {
                linesChecker(false);
            } else {
                diagonalsChecker(true);
            };
        };

        function diagonalsChecker(majorDiagonal) {
            let counter = 0,
                direction = true,
                victoriousLine = [],
                j = x,
                k = y;

            while (true) {
                let checkingElement = $(`.stone[data-x="${j}"].stone[data-y="${k}"]`);
                if (direction) {
                    if (checkingElement.attr('data-player') === currentPlayer) {
                        counter++;
                        victoriousLine.push(checkingElement);
                        j++;
                        if (majorDiagonal) {
                            k++;
                        } else {
                            k--;
                        };
                    } else {
                        direction = false;
                        j = x;
                        k = y;
                        counter--;
                    };
                } else {
                    if (checkingElement.attr('data-player') === currentPlayer) {
                        counter++;
                        victoriousLine.push(checkingElement);
                        j--;
                        if (majorDiagonal) {
                            k--;
                        } else {
                            k++;
                        }
                    } else {
                        break;
                    };
                };
            };
            if (counter >= 4) {
                animation(victoriousLine);
                winMessage();
                return;
            };
            if (majorDiagonal) {
                diagonalsChecker(false);
            };
        };
    };
})();
import { displayMessage } from "../../js/main.js";

const cell1 = document.querySelector('#cell-1'),
    cell2 = document.querySelector('#cell-2'),
    cell3 = document.querySelector('#cell-3'),
    cell4 = document.querySelector('#cell-4'),
    cell5 = document.querySelector('#cell-5'),
    cell6 = document.querySelector('#cell-6'),
    cell7 = document.querySelector('#cell-7'),
    cell8 = document.querySelector('#cell-8'),
    cell9 = document.querySelector('#cell-9'),
    restart_button = document.querySelector('#game__restart'),
    game_message = document.querySelector('#game__status__message'),
    player1_pontuation = document.querySelector('#pontuation__player__1'),
    player2_pontuation = document.querySelector('#pontuation__player__2'),
    player1_name = document.querySelector('#player__1'),
    player2_name = document.querySelector('#player__2'),
    confirm_change_p2 = document.querySelector('#change__name2__confirm'),
    confirm_change_p1 = document.querySelector('#change__name1__confirm'),

    cells = [cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9],

    winning_combinations = [
        [cell1, cell2, cell3],
        [cell4, cell5, cell6],
        [cell7, cell8, cell9],
        [cell1, cell4, cell7],
        [cell2, cell5, cell8],
        [cell3, cell6, cell9],
        [cell1, cell5, cell9],
        [cell3, cell5, cell7]
    ],

    player1 = {
        name: 'Player 1',
        symbol: 'X',
        score: 0
    },

    player2 = {
        name: 'Player 2',
        symbol: 'O',
        score: 0
    };

let currentPlayer = player1,
    gameIsRunning = true;

export class Game {
    constructor() {
        this.init();
    }

    init() {
        this.addEventListeners();
        this.updateGame();
    }

    addEventListeners() {
        cells.forEach(cell => {
            cell.addEventListener('click', this.cellClickHandler);
        });

        restart_button.addEventListener('click', this.restartGame);

        confirm_change_p1.addEventListener('click', () => {
            if (player1_name.textContent === '' || player1_name.textContent === player2.name) {
                displayMessage('O nome do jogador 1 não pode ser vazio ou igual ao jogador 2');
                return;
            }

            this.setPlayerName(player1, player1_name.textContent);
            this.updateGame();
        });

        confirm_change_p2.addEventListener('click', () => {
            if (player2_name.textContent === '' || player2_name.textContent === player1.name) {
                displayMessage('O nome do jogador 2 não pode ser vazio ou igual ao jogador 1');
                return;
            }

            this.setPlayerName(player2, player2_name.textContent);
            this.updateGame();
        });
    }

    cellClickHandler = (e) => {
        if (gameIsRunning) {
            const cell = e.target;

            if (cell.textContent === '') {
                cell.textContent = currentPlayer.symbol;

                if (this.checkWin()) {
                    game_message.textContent = `${currentPlayer.name} ganhou!`;
                    currentPlayer.score++;
                    gameIsRunning = false;
                    restart_button.classList.add('active');
                    this.updateScore();
                } else if (this.checkDraw()) {
                    game_message.textContent = "Empate!";
                    restart_button.classList.add('active');
                    gameIsRunning = false;
                } else
                    this.switchPlayer();
            }
        }
    }

    checkWin() {
        return winning_combinations.some(combination => {
            return combination.every(cell => { return cell.textContent === currentPlayer.symbol; });
        });
    }

    checkDraw() { return cells.every(cell => { return cell.textContent !== ''; }); }

    switchPlayer() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        game_message.textContent = `É a vez do: ${currentPlayer.name}`;
    }

    restartGame = () => {
        cells.forEach(cell => { cell.textContent = ''; });

        restart_button.classList.remove('active');
        game_message.textContent = `É a vez do: ${currentPlayer.name}`;
        gameIsRunning = true;
    }

    updateScore() {
        player1_pontuation.textContent = player1.score;
        player2_pontuation.textContent = player2.score;
    }

    updateNames() {
        player1_name.textContent = player1.name;
        player2_name.textContent = player2.name;
    }

    updateGame() {
        this.updateScore();
        this.updateNames();
    }

    setPlayerName(player, name) {
        player.name = name;

        displayMessage(`O nome do jogador ${player === player1 ? 1 : 2} foi alterado para ${name}!`);
    }
    
    resetAll() {
        player1.score = 0;
        player2.score = 0;
        this.updateGame();
    }
}

export const game = new Game();
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
    restartBtn = document.querySelector('#game__restart'),
    gameMessage = document.querySelector('#game__status__message'),
    player1Pontuation = document.querySelector('#pontuation__player__1'),
    playerPontuation = document.querySelector('#pontuation__player__2'),
    player1Name = document.querySelector('#player__1'),
    player2Name = document.querySelector('#player__2'),
    confirmChangeP1 = document.querySelector('#change__name1__confirm'),
    confirmChangeP2 = document.querySelector('#change__name2__confirm'),

    cells = [cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9],

    winningCombinationsList = [
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

        restartBtn.addEventListener('click', this.restartGame);

        confirmChangeP1.addEventListener('click', () => {
            if (player1Name.textContent === '' || player1Name.textContent === player2.name) {
                displayMessage('O nome do jogador 1 não pode ser vazio ou igual ao jogador 2');
                return;
            }

            this.setPlayerName(player1, player1Name.textContent);
            this.updateGame();
        });

        confirmChangeP2.addEventListener('click', () => {
            if (player2Name.textContent === '' || player2Name.textContent === player1.name) {
                displayMessage('O nome do jogador 2 não pode ser vazio ou igual ao jogador 1');
                return;
            }

            this.setPlayerName(player2, player2Name.textContent);
            this.updateGame();
        });
    }

    cellClickHandler = (e) => {
        if (gameIsRunning) {
            const cell = e.target;

            if (cell.textContent === '') {
                cell.textContent = currentPlayer.symbol;

                if (this.checkWin()) {
                    gameMessage.textContent = `${currentPlayer.name} ganhou!`;
                    currentPlayer.score++;
                    gameIsRunning = false;
                    restartBtn.classList.add('active');
                    this.updateScore();
                } else if (this.checkDraw()) {
                    gameMessage.textContent = "Empate!";
                    restartBtn.classList.add('active');
                    gameIsRunning = false;
                } else
                    this.switchPlayer();
            }
        }
    }

    checkWin() {
        return winningCombinationsList.some(combination => {
            return combination.every(cell => { return cell.textContent === currentPlayer.symbol; });
        });
    }

    checkDraw() { return cells.every(cell => { return cell.textContent !== ''; }); }

    switchPlayer() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        gameMessage.textContent = `É a vez do: ${currentPlayer.name}`;
    }

    restartGame = () => {
        cells.forEach(cell => { cell.textContent = ''; });

        restartBtn.classList.remove('active');
        gameMessage.textContent = `É a vez do: ${currentPlayer.name}`;
        gameIsRunning = true;
    }

    updateScore() {
        player1Pontuation.textContent = player1.score;
        playerPontuation.textContent = player2.score;
    }

    updateNames() {
        player1Name.textContent = player1.name;
        player2Name.textContent = player2.name;
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
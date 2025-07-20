const COORDINATES_MAP = {
    // P1 (Blue) path - Starts at 0
    0: [6.5, 13.5], 1: [6.5, 12.5], 2: [6.5, 11.5], 3: [6.5, 10.5], 4: [6.5, 9.5],
    5: [5.5, 8.5], 6: [4.5, 8.5], 7: [3.5, 8.5], 8: [2.5, 8.5], 9: [1.5, 8.5], 10: [0.5, 8.5],
    11: [0.5, 7.5], 
    12: [0.5, 6.5], 13: [1.5, 6.5], 14: [2.5, 6.5], 15: [3.5, 6.5], 16: [4.5, 6.5], 17: [5.5, 6.5],
    18: [6.5, 5.5], 19: [6.5, 4.5], 20: [6.5, 3.5], 21: [6.5, 2.5], 22: [6.5, 1.5], 23: [6.5, 0.5],
    24: [7.5, 0.5], 
    25: [8.5, 0.5], 26: [8.5, 1.5], 27: [8.5, 2.5], 28: [8.5, 3.5], 29: [8.5, 4.5], 30: [8.5, 5.5],
    31: [9.5, 6.5], 32: [10.5, 6.5], 33: [11.5, 6.5], 34: [12.5, 6.5], 35: [13.5, 6.5], 36: [14.5, 6.5],
    37: [14.5, 7.5], 
    38: [14.5, 8.5], 39: [13.5, 8.5], 40: [12.5, 8.5], 41: [11.5, 8.5], 42: [10.5, 8.5], 43: [9.5, 8.5],
    44: [8.5, 9.5], 45: [8.5, 10.5], 46: [8.5, 11.5],
    47: [8.5, 12.5], 48: [8.5, 13.5], 49: [8.5, 14.5], 
    50: [7.5, 14.5], 
    51: [6.5, 14.5], 

    
    100: [7.5, 13.5], 101: [7.5, 12.5], 102: [7.5, 11.5], 103: [7.5, 10.5], 104: [7.5, 9.5],
    105: [7.5, 8.5], 

    
    200: [1.5, 7.5], 201: [2.5, 7.5], 202: [3.5, 7.5], 203: [4.5, 7.5], 204: [5.5, 7.5],
    205: [6.5, 7.5], 

    
    300: [7.5, 1.5], 301: [7.5, 2.5], 302: [7.5, 3.5], 303: [7.5, 4.5], 304: [7.5, 5.5],
    305: [7.5, 6.5], 
    
    400: [13.5, 7.5], 401: [12.5, 7.5], 402: [11.5, 7.5], 403: [10.5, 7.5], 404: [9.5, 7.5],
    405: [8.5, 7.5], 


    
    500: [2, 11], 501: [4, 11], 502: [2, 13], 503: [4, 13],
    
    
    600: [11, 2], 601: [13, 2], 602: [11, 4], 603: [13, 4],
    

    700: [2, 2], 701: [4, 2], 702: [2, 4], 703: [4, 4],
    
    
    800: [11, 11], 801: [13, 11], 802: [11, 13], 803: [13, 13],
};

const STEP_LENGTH = 6.66; 

const PLAYERS = ['P1', 'P2', 'P3', 'P4']; 

const BASE_POSITIONS = {
    P1: [500, 501, 502, 503],
    P2: [600, 601, 602, 603],
    P3: [700, 701, 702, 703], // Base positions for P3
    P4: [800, 801, 802, 803], // Base positions for P4
}

const START_POSITIONS = {
    P1: 0,
    P2: 26,
    P3: 13, 
    P4: 39  
}

const HOME_ENTRANCE = {
    P1: [100, 101, 102, 103, 104],
    P2: [200, 201, 202, 203, 204],
    P3: [300, 301, 302, 303, 304], 
    P4: [400, 401, 402, 403, 404]  
}

const HOME_POSITIONS = {
    P1: 105,
    P2: 205,
    P3: 305, // Final home 
    P4: 405  // Final home for P4
}

const TURNING_POINTS = {
    P1: 50,
    P2: 25, 
    P3: 12, 
    P4: 38  
}


const SAFE_POSITIONS = [
    0, 8, 13, 21, 26, 34, 39, 47, 
    5, 18, 31, 44, 
];

const STATE = {
    DICE_NOT_ROLLED: 'DICE_NOT_ROLLED',
    DICE_ROLLED: 'DICE_ROLLED',
}

// =================================================================
// 2. UI (Originally from ui.js)
// =================================================================

// DOM Elements
const diceButtonElement = document.querySelector('#dice-btn');
const resetButtonElement = document.querySelector('#reset-btn');
const playerPiecesContainer = document.querySelector('.player-pieces');

const playerPiecesElements = {
    P1: document.querySelectorAll('[player-id="P1"].player-piece'),
    P2: document.querySelectorAll('[player-id="P2"].player-piece'),
    P3: document.querySelectorAll('[player-id="P3"].player-piece'), 
    P4: document.querySelectorAll('[player-id="P4"].player-piece'), 
}

class UI {

    static listenDiceClick(callback) {
        if (diceButtonElement) {
            diceButtonElement.addEventListener('click', callback);
        } else {
            console.error('UI Error: Dice button element (#dice-btn) not found!');
        }
    }

    static listenResetClick(callback) {
        if (resetButtonElement) {
            resetButtonElement.addEventListener('click', callback);
        } else {
            console.error('UI Error: Reset button element (#reset-btn) not found!');
        }
    } 

    static listenPieceClick(callback) {
        if (playerPiecesContainer) {
            playerPiecesContainer.addEventListener('click', callback);
        } else {
            console.error('UI Error: Player pieces container element (.player-pieces) not found!');
        }
    }

    static setPiecePosition(player, piece, newPosition) {
        if (!playerPiecesElements[player] || !playerPiecesElements[player][piece]) {
            console.error(`UI Error: Player element of given player: ${player} and piece: ${piece} not found in DOM.`);
            return;
        }

        const coordinates = COORDINATES_MAP[newPosition];
        if (!coordinates) {
            console.error(`UI Error: Coordinates not found for newPosition: ${newPosition} in COORDINATES_MAP.`);
            return;
        }

        const [x, y] = coordinates;
        const pieceElement = playerPiecesElements[player][piece];

        pieceElement.style.top = y * STEP_LENGTH + '%';
        pieceElement.style.left = x * STEP_LENGTH + '%';
    }

    static setTurn(index) {
        if (index < 0 || index >= PLAYERS.length) {
            console.error('UI Error: Turn index out of bounds!');
            return;
        }

        const player = PLAYERS[index];
        const activePlayerSpan = document.querySelector('.active-player span');
        if (activePlayerSpan) {
            activePlayerSpan.innerText = player;
        } else {
            console.warn('UI Warning: .active-player span element not found.');
        }

        // Remove highlight from previously active player base
        document.querySelectorAll('.player-base.highlight').forEach(ele => {
            ele.classList.remove('highlight');
        });

        // Add highlight to the current active player's base
        const currentPlayerBase = document.querySelector(`[player-id="${player}"].player-base`);
        if (currentPlayerBase) {
            currentPlayerBase.classList.add('highlight');
        } else {
            console.error(`UI Error: Player base for ${player} not found.`);
        }
    }

    static enableDice() {
        if (diceButtonElement) {
            diceButtonElement.removeAttribute('disabled');
        }
    }

    static disableDice() {
        if (diceButtonElement) {
            diceButtonElement.setAttribute('disabled', '');
        }
    }

    static highlightPieces(player, pieces) {
        pieces.forEach(piece => {
            const pieceElement = playerPiecesElements[player][piece];
            if (pieceElement) {
                pieceElement.classList.add('highlight');
            }
        });
    }

    static unhighlightPieces() {
        document.querySelectorAll('.player-piece.highlight').forEach(ele => {
            ele.classList.remove('highlight');
        });
    }

    static setDiceValue(value) {
        const diceValueElement = document.querySelector('.dice-value');
        if (diceValueElement) {
            diceValueElement.innerText = value;
        } else {
            console.warn('UI Warning: .dice-value element not found.');
        }
    }
}

// =================================================================
// 3. LUDO GAME LOGIC (Originally from ludo.js)
// =================================================================

class Ludo {
    currentPositions = {
        P1: [],
        P2: [],
        P3: [], 
        P4: []  
    }

    _diceValue;
    get diceValue() {
        return this._diceValue;
    }
    set diceValue(value) {
        this._diceValue = value;
        UI.setDiceValue(value);
    }
 
    _turn;
    get turn() {
        return this._turn;
    }
    set turn(value) {
        this._turn = value;
        UI.setTurn(value);
    }

    _state;
    get state() {
        return this._state;
    }
    set state(value) {
        this._state = value;
        if (value === STATE.DICE_NOT_ROLLED) {
            UI.enableDice();
            UI.unhighlightPieces();
        } else {
            UI.disableDice();
        }
    }

    constructor() {
        console.log('4 Player Ludo game initialized! Let\'s play!');

        this.listenDiceClick();
        this.listenResetClick();
        this.listenPieceClick();

        this.resetGame();
    }

    listenDiceClick() {
        UI.listenDiceClick(this.onDiceClick.bind(this));
    }

    onDiceClick() {
        console.log('Dice clicked!');
        this.diceValue = 1 + Math.floor(Math.random() * 6);
        this.state = STATE.DICE_ROLLED;

        this.checkForEligiblePieces();
    }

    checkForEligiblePieces() {
        const player = PLAYERS[this.turn];
        const eligiblePieces = this.getEligiblePieces(player);

        if (eligiblePieces.length) {
            UI.highlightPieces(player, eligiblePieces);
        } else {
            this.incrementTurn();
        }
    }

    incrementTurn() {
        this.turn = (this.turn + 1) % PLAYERS.length;
        this.state = STATE.DICE_NOT_ROLLED;
    }

    getEligiblePieces(player) {
        return [0, 1, 2, 3].filter(piece => {
            const currentPosition = this.currentPositions[player][piece];

            if (currentPosition === HOME_POSITIONS[player]) {
                return false;
            }

            if (
                BASE_POSITIONS[player].includes(currentPosition) &&
                this.diceValue !== 6
            ) {
                return false;
            }

            if (
                HOME_ENTRANCE[player].includes(currentPosition) &&
                (currentPosition + this.diceValue > HOME_POSITIONS[player])
            ) {
                return false;
            }

            return true;
        });
    }

    listenResetClick() {
        UI.listenResetClick(this.resetGame.bind(this));
    }

    resetGame() {
        console.log('Resetting 4 player game...');
        this.currentPositions = structuredClone(BASE_POSITIONS);

        PLAYERS.forEach(player => {
            [0, 1, 2, 3].forEach(piece => {
                this.setPiecePosition(player, piece, this.currentPositions[player][piece]);
            });
        });

        this.turn = 0; // P1 starts
        this.state = STATE.DICE_NOT_ROLLED;
        this.diceValue = 0;
    }

    listenPieceClick() {
        UI.listenPieceClick(this.onPieceClick.bind(this));
    }

    onPieceClick(event) {
        const target = event.target;

        if (!target.classList.contains('player-piece') || !target.classList.contains('highlight')) {
            return;
        }
        console.log('Piece clicked!');

        const player = target.getAttribute('player-id');
        const piece = parseInt(target.getAttribute('piece'), 10);

        this.handlePieceClick(player, piece);
    }

    handlePieceClick(player, piece) {
        const currentPosition = this.currentPositions[player][piece];

        if (BASE_POSITIONS[player].includes(currentPosition)) {
            this.setPiecePosition(player, piece, START_POSITIONS[player]);
            this.state = STATE.DICE_NOT_ROLLED; // Grant another turn for rolling a 6
            return;
        }

        UI.unhighlightPieces();
        this.movePiece(player, piece, this.diceValue);
    }

    setPiecePosition(player, piece, newPosition) {
        this.currentPositions[player][piece] = newPosition;
        UI.setPiecePosition(player, piece, newPosition);
    }

    movePiece(player, piece, moveBy) {
        const interval = setInterval(() => {
            this.incrementPiecePosition(player, piece);
            moveBy--;

            if (moveBy === 0) {
                clearInterval(interval);

                if (this.hasPlayerWon(player)) {
                    alert(`Player: ${player} has won!`);
                    this.resetGame();
                    return;
                }

                const isKill = this.checkForKill(player, piece);

                if (isKill || this.diceValue === 6) {
                    this.state = STATE.DICE_NOT_ROLLED;
                    return;
                }

                this.incrementTurn();
            }
        }, 200);
    }

    checkForKill(player, piece) {
        const currentPosition = this.currentPositions[player][piece];
        let kill = false;

        PLAYERS.forEach(opponent => {
            if (opponent === player) return;

            [0, 1, 2, 3].forEach(oppPiece => {
                const opponentPosition = this.currentPositions[opponent][oppPiece];

                if (currentPosition === opponentPosition && !SAFE_POSITIONS.includes(currentPosition)) {
                    this.setPiecePosition(opponent, oppPiece, BASE_POSITIONS[opponent][oppPiece]);
                    kill = true;
                }
            });
        });

        return kill;
    }

    hasPlayerWon(player) {
        return [0, 1, 2, 3].every(piece => this.currentPositions[player][piece] === HOME_POSITIONS[player]);
    }

    incrementPiecePosition(player, piece) {
        this.setPiecePosition(player, piece, this.getIncrementedPosition(player, piece));
    }

    getIncrementedPosition(player, piece) {
        const currentPosition = this.currentPositions[player][piece];

        if (currentPosition === TURNING_POINTS[player]) {
            return HOME_ENTRANCE[player][0];
        }
        else if (HOME_ENTRANCE[player].includes(currentPosition)) {
            const homePathIndex = HOME_ENTRANCE[player].indexOf(currentPosition);
            if (homePathIndex === HOME_ENTRANCE[player].length - 1) {
                return HOME_POSITIONS[player];
            }
            return currentPosition + 1;
        } else if (currentPosition === 51) {
            return 0;
        }
        return currentPosition + 1; 
    }
}

// =================================================================
// 4. INITIALIZE THE GAME
// =================================================================
const ludo = new Ludo();
// This function waits for the full page to load before running any code
document.addEventListener('DOMContentLoaded', () => {
  // Get all necessary elements from the HTML
  const cells = document.querySelectorAll('.cell'); // All 9 cells of the board
  const status = document.getElementById('status'); // Text showing whose turn it is
  const restartButton = document.getElementById('restartButton'); // Restart button

  // Sound for click — plays when a cell is clicked
  const clickSound = document.getElementById('click_sound');

  // Initialize the game state
  let board = ['', '', '', '', '', '', '', '', '']; // Empty board
  let currentPlayer = 'O'; // Human player starts
  let isGameActive = true; // The game starts as active

  // All possible winning combinations (rows, columns, diagonals)
  const winningConditions = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6]  // Diagonal 2
  ];

  // Function to mark the cell
  function handleCellPlayed(clickedCell, clickedIndex) {
    board[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add('disabled');
  }

  // Change turn
  function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  }

  // Check winner or draw
  function handleResultValidation() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
      const [aIndex, bIndex, cIndex] = winningConditions[i];
      const a = board[aIndex];
      const b = board[bIndex];
      const c = board[cIndex];

      if (a === '' || b === '' || c === '') continue;

      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      isGameActive = false;
      const boardElement = document.getElementById('board');
      const winnerMessage = document.getElementById('winnerMessage');

      boardElement.classList.add('fade-out');
      boardElement.addEventListener('animationend', () => {
        boardElement.style.display = 'none';
        winnerMessage.textContent = `Player ${currentPlayer} has won!`;
        winnerMessage.classList.add('fade-in');
      }, { once: true });

      return;
    }

    if (!board.includes('')) {
      status.textContent = `Game ended in a draw!`;
      isGameActive = false;
      return;
    }

    handlePlayerChange();
  }

  // --------------------------
  // BASIC AI FOR PLAYER X
  // --------------------------
  function aiMove() {
    if (!isGameActive) return;
    if (currentPlayer !== 'X') return;

    let aiIndex = -1;

    // 1. AI tries to win
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];

      if (board[a] === 'X' && board[b] === 'X' && board[c] === '') aiIndex = c;
      else if (board[a] === 'X' && board[b] === '' && board[c] === 'X') aiIndex = b;
      else if (board[a] === '' && board[b] === 'X' && board[c] === 'X') aiIndex = a;

      if (aiIndex !== -1) break;
    }

    // 2. Block player O from winning
    if (aiIndex === -1) {
      for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];

        if (board[a] === 'O' && board[b] === 'O' && board[c] === '') aiIndex = c;
        else if (board[a] === 'O' && board[b] === '' && board[c] === 'O') aiIndex = b;
        else if (board[a] === '' && board[b] === 'O' && board[c] === 'O') aiIndex = a;

        if (aiIndex !== -1) break;
      }
    }

    // 3. Otherwise pick first empty cell
    if (aiIndex === -1) {
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
          aiIndex = i;
          break;
        }
      }
    }

    const cell = cells[aiIndex];
    handleCellPlayed(cell, aiIndex);
    handleResultValidation();
  }

  // When player clicks a cell
  function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedIndex] !== '' || !isGameActive) return;

    clickSound.play();
    handleCellPlayed(clickedCell, clickedIndex);
    handleResultValidation();

    // Trigger AI move
    if (isGameActive) {
      setTimeout(aiMove, 300);
    }
  }

  // Restart game
  function handleRestartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'O';
    status.textContent = `Player ${currentPlayer}'s turn`;

    const boardElement = document.getElementById('board');
    const winnerMessage = document.getElementById('winnerMessage');
    boardElement.style.display = 'grid';
    boardElement.classList.remove('fade-out');
    winnerMessage.textContent = '';
    winnerMessage.classList.remove('fade-in');

    cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('disabled');
    });
  }

  // Add event listeners
  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  restartButton.addEventListener('click', handleRestartGame);

  status.textContent = `Player ${currentPlayer}'s turn`;
});

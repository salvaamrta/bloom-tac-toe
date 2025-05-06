    const greeting = document.getElementById('greeting');
    const gameContainer = document.getElementById('gameContainer');
    const board = document.getElementById('board');
    const message = document.getElementById('message');
    const restartBtn = document.getElementById('restartBtn');
    const cells = document.querySelectorAll('[data-cell]');

    let isXTurn = true;
    let vsComputer = true;
    let playerXEmoji = '🌷';
    let playerOEmoji = '🌱';

    const WINNING_COMBOS = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    function startGameMode(mode) {
      vsComputer = mode === 'pvc';
      if (vsComputer) {
        playerOEmoji = '🤖';
      }
      greeting.style.display = 'none';
      gameContainer.style.display = 'block';
      startGame();
    }

    function startGame() {
      isXTurn = true;
      cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
      });
      message.textContent = `${playerXEmoji}'s turn`;
    }

    function handleClick(e) {
      const cell = e.target;
      const currentClass = isXTurn ? 'x' : 'o';
      const symbol = isXTurn ? playerXEmoji : playerOEmoji;

      placeMark(cell, currentClass, symbol);

      if (checkWin(currentClass)) {
        endGame(false);
      } else if (isDraw()) {
        endGame(true);
      } else {
        isXTurn = !isXTurn;
        message.textContent = isXTurn ? `${playerXEmoji}'s turn` : `${vsComputer ? '🤖' : playerOEmoji}'s turn`;

        if (!isXTurn && vsComputer) {
          setTimeout(computerMove, 500);
        }
      }
    }

    function placeMark(cell, currentClass, symbol) {
      cell.textContent = symbol;
      cell.classList.add(currentClass);
    }

    function computerMove() {
      const availableCells = [...cells].filter(cell =>
        !cell.classList.contains('x') && !cell.classList.contains('o')
      );
      const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
      if (randomCell) {
        randomCell.click();
      }
    }

    function endGame(draw) {
      if (draw) {
        message.textContent = "It's a Draw! 😳";
      } else {
        message.textContent = `${isXTurn ? playerXEmoji : playerOEmoji} Wins! 🎉`;
      }
      cells.forEach(cell => cell.removeEventListener('click', handleClick));
    }

    function isDraw() {
      return [...cells].every(cell =>
        cell.classList.contains('x') || cell.classList.contains('o')
      );
    }

    function checkWin(currentClass) {
      return WINNING_COMBOS.some(combination =>
        combination.every(index =>
          cells[index].classList.contains(currentClass)
        )
      );
    }

    restartBtn.addEventListener('click', startGame);
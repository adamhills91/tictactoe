const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const grid = document.querySelector(".grid");
  board.forEach((item, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.cell = index;
    grid.appendChild(cell);
  });
  return { board };
})();

const createPlayer = (name, number, symbol) => {
  return { name, number, symbol };
};

const displayController = (() => {
  let gameOn = true;
  if (gameOn) {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let player1 = createPlayer("Player 1", 1, "X");
    let player2 = createPlayer("Player 2", 2, "O");
    let activeUser = player1;

    let cells = document.querySelectorAll(".cell");

    const makeMove = function () {
      if (!this.textContent) {
        // update the board array
        this.textContent = activeUser.symbol;
        Gameboard.board[this.dataset.cell] = activeUser.symbol;
        switchUser();
        checkWinner(this);
      }
    };

    const initialiseGame = () => {
      cells.forEach((item) => {
        item.addEventListener("click", makeMove);
        item.textContent = "";
        Gameboard.board[item.dataset] === "";
      });
      activeUser = player1;
      crosses = [];
      noughts = [];
      gameOn = true;
    };
    initialiseGame();
    const resetBtn = document.getElementById("reset-button");
    resetBtn.addEventListener("click", initialiseGame);

    const stopGame = () => {
      gameOn = false;
      cells.forEach((item) => {
        item.removeEventListener("click", makeMove);
      });
    };

    const switchUser = () => {
      activeUser.number === 1 ? (activeUser = player2) : (activeUser = player1);
    };

    const checkWinner = (userSelection) => {
      if (userSelection.textContent === player1.symbol) {
        crosses.push(parseInt(userSelection.dataset.cell));
        // Check if winningCombinations array contains current crosses combination
        winningCombinations.forEach((item) => {
          if (item.every((element) => crosses.includes(element))) {
            console.log(`${player1.name} wins!`);
            stopGame();
          }
        });
      } else if (userSelection.textContent === player2.symbol) {
        noughts.push(parseInt(userSelection.dataset.cell));

        // Check if winningCombinations array contains current noughts combination
        winningCombinations.forEach((item) => {
          if (item.every((element) => noughts.includes(element))) {
            console.log(`${player2.name} wins!`);
            stopGame();
          }
        });
      }
    };
    return { initialiseGame, noughts };
  }
})();

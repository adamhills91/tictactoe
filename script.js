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

  let gameOn = true;

  if (gameOn) {
    const overlay = document.getElementById("overlay");
    const vsPlayerBtn = document.getElementById("vs-player");
    const vsAIBtn = document.getElementById("vs-ai");
    const buttons = document.getElementById("buttons");
    const form = document.getElementById("player-names");
    const playerNameDisplays = document.querySelectorAll(
      ".player-name-display"
    );
    const playInfo = document.getElementById("play-info");
    let gameMode;
    let player1;
    let player2;
    let activeUser;

    vsPlayerBtn.addEventListener("click", () => {
      buttons.style.display = "none";
      form.style.display = "block";
      gameMode = "vs-player";
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      clearOverlay();
      player1 = createPlayer(document.getElementById("player1").value, 1, "X");
      player2 = createPlayer(document.getElementById("player2").value, 2, "O");
      setActivePlayer();
    });

    vsAIBtn.addEventListener("click", () => {
      clearOverlay();
      gameMode = "vs-ai";
      player1 = createPlayer("You", 1, "X");
      player2 = createPlayer("Computer", 2, "O");
      setActivePlayer();
    });

    const clearOverlay = () => {
      overlay.style.opacity = "0";
      setTimeout(() => {
        overlay.style.display = "none";
      }, 500);
    };

    const setActivePlayer = () => {
      activeUser = player1;
      playerNameDisplays[0].textContent = player1.name;
      playerNameDisplays[1].textContent = player2.name;
      if (gameMode === "vs-player") {
        playInfo.textContent = `${player1.name}'s Turn`;
      } else if (gameMode === "vs-ai") {
        playInfo.textContent = "Your Turn";
      }
    };

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

    const stopGame = () => {
      gameOn = false;
      cells.forEach((item) => {
        item.removeEventListener("click", makeMove);
      });
    };

    const playBtn = document.getElementById("play-button");
    playBtn.addEventListener("click", initialiseGame);

    const switchUser = () => {
      if (activeUser.number === 1) {
        activeUser = player2;
      } else {
        activeUser = player1;
      }
      playInfo.textContent = `${activeUser.name}'s Turn`;
    };

    const checkWinner = (userSelection) => {
      if (userSelection.textContent === player1.symbol) {
        crosses.push(parseInt(userSelection.dataset.cell));
        // Check if winningCombinations array contains current crosses combination
        winningCombinations.forEach((item) => {
          if (item.every((element) => crosses.includes(element))) {
            playInfo.textContent = `${player1.name} Wins!`;
            stopGame();
          }
        });
      } else if (userSelection.textContent === player2.symbol) {
        noughts.push(parseInt(userSelection.dataset.cell));
        // Check if winningCombinations array contains current noughts combination
        winningCombinations.forEach((item) => {
          if (item.every((element) => noughts.includes(element))) {
            playInfo.textContent = `${player2.name} Wins!`;
            stopGame();
          }
        });
      }
      console.log(gameOn);
    };
    return { initialiseGame };
  }
})();

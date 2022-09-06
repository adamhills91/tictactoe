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
    const playerScoreDisplays = document.querySelectorAll(
      ".player-score-display"
    );
    const playInfo = document.getElementById("play-info");
    let gameMode;
    let player1;
    let player2;
    let activePlayer = player1;
    let player1Score = 0;
    let player2Score = 0;

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
      activePlayer = player1;
      initialiseGame();
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

    const setActivePlayer = () => {};

    let cells = document.querySelectorAll(".cell");

    const makeMove = function () {
      if (!this.textContent) {
        // update the board array
        this.textContent = activePlayer.symbol;
        Gameboard.board[this.dataset.cell] = activePlayer.symbol;
        switchUser();
        checkWinner(this);
      }
    };

    const initialiseGame = () => {
      Gameboard.board = ["", "", "", "", "", "", "", "", ""];
      cells.forEach((item) => {
        item.classList.remove("winning-combo");
        item.classList.remove("no-hover");
        item.addEventListener("click", makeMove);
        item.textContent = "";
        Gameboard.board[item.dataset] === "";
      });
      crosses = [];
      noughts = [];
      gameOn = true;
      playInfo.style.display = "block";
      replayButton.style.display = "none";
      playerNameDisplays[0].textContent = player1.name;
      playerNameDisplays[1].textContent = player2.name;
      playerScoreDisplays[0].textContent = player1Score;
      playerScoreDisplays[1].textContent = player2Score;
      if (gameMode === "vs-player") {
        playInfo.textContent = `${activePlayer.name}'s Turn`;
      } else if (gameMode === "vs-ai") {
        playInfo.textContent = "Your Turn";
      }
    };

    const stopGame = () => {
      gameOn = false;
      cells.forEach((item) => {
        item.removeEventListener("click", makeMove);
        item.classList.add("no-hover");
      });
      playInfo.style.display = "none";
      replayButton.style.display = "block";
    };

    const replayButton = document.getElementById("replay-button");
    replayButton.addEventListener("click", initialiseGame);

    const switchUser = () => {
      if (activePlayer.number === 1) {
        activePlayer = player2;
      } else {
        activePlayer = player1;
      }
      playInfo.textContent = `${activePlayer.name}'s Turn`;
    };

    const checkWinner = (userSelection) => {
      if (userSelection.textContent === player1.symbol) {
        crosses.push(parseInt(userSelection.dataset.cell));
        // Check if winningCombinations array contains current crosses combination
        winningCombinations.forEach((item) => {
          if (item.every((element) => crosses.includes(element))) {
            for (let i = 0; i < item.length; i++) {
              cells[item[i]].classList.add("winning-combo");
            }

            playInfo.style.display = "none";
            replayButton.style.display = "block";
            player1Score++;
            playerScoreDisplays[0].textContent = player1Score;
            stopGame();
          }
        });
      } else if (userSelection.textContent === player2.symbol) {
        noughts.push(parseInt(userSelection.dataset.cell));
        // Check if winningCombinations array contains current noughts combination
        winningCombinations.forEach((item) => {
          if (item.every((element) => noughts.includes(element))) {
            for (let i = 0; i < item.length; i++) {
              cells[item[i]].classList.add("winning-combo");
            }
            player2Score++;
            playerScoreDisplays[1].textContent = player2Score;
            stopGame();
          }
        });
      }
      if (Gameboard.board.every((e) => e === "X" || e === "O")) {
        playInfo.style.display = "none";
        replayButton.style.display = "block";
        stopGame();
      }
    };
    return { initialiseGame };
  }
})();

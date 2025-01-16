// -----Player
const Player = (() => {
  let currentPlayer = "X";

  const getPlayer = () => currentPlayer;
  const switchPlayer = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  };

  return { getPlayer, switchPlayer };
})();

// -----Board
const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;
  const resetBoard = () => (board = ["", "", "", "", "", "", "", "", ""]);

  let boardDisabled = false;
  const isDisabled = () => boardDisabled;
  const changeDisability = () =>
    (boardDisabled = boardDisabled === true ? false : true);

  const checkWin = () => {
    const winningCombinaitons = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combo of winningCombinaitons) {
      const [a, b, c] = combo;
      let board = getBoard();
      if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
        changeDisability();
        UI.winningBoard(combo);
        return true;
      }
    }
  };

  const makeMove = (el) => {
    const i = el.id;
    if (board[i] !== "") {
      return;
    }
    board[i] = Player.getPlayer();
    UI.displayMove(i);
    if (!checkWin()) {
      Player.switchPlayer();
      UI.displayStatus().textContent = `${Player.getPlayer()}'s turn`;
    }
  };

  const playAgain = () => {
    Gameboard.resetBoard();
    Gameboard.changeDisability();
    UI.init();
  };

  return {
    isDisabled,
    changeDisability,
    getBoard,
    resetBoard,
    makeMove,
    playAgain,
  };
})();

// -----Display
const UI = (() => {
  const gameboard = document.getElementById("gameBoard");
  const cells = Array.from(document.getElementsByClassName("cell"));

  const status = document.getElementById("status");
  const displayStatus = () => status;

  const resetBtn = document.getElementById("reset-btn");
  resetBtn.addEventListener("click", Gameboard.playAgain);

  const init = () => {
    UI.displayStatus().textContent = `${Player.getPlayer()}'s turn`;
    cells.forEach((cell) => {
      cell.classList.remove("winning-x");
      cell.classList.remove("winning-o");
      cell.textContent = "";
      gameboard.style.cursor = "pointer";
      cell.addEventListener("click", () => {
        if (!Gameboard.isDisabled()) {
          Gameboard.makeMove(cell);
          return;
        }
      });
    });
  };

  const winningBoard = (combo) => {
    gameboard.style.cursor = "default";
    combo.forEach((id) => {
      if (Player.getPlayer() === "X") {
        document.getElementById(id).classList.add("winning-x");
      } else {
        document.getElementById(id).classList.add("winning-o");
      }
    });

    UI.displayStatus().textContent = `WINNER IS: ${Player.getPlayer()} !`;
  };

  const displayMove = (i) => {
    document.getElementById([i]).textContent = Player.getPlayer();
  };

  return { init, displayMove, displayStatus, winningBoard };
})();

UI.init();

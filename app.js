const cells = Array.from(document.getElementsByClassName("cell"));
console.log(cells);

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
      console.log(board);
      if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
        console.log(`Winner: Player ${Player.getPlayer()}`);
      }
    }
  };

  const makeMove = (el) => {
    // const cell = el.target;
    const i = el.target.id;
    if (board[i] === "") {
      board[i] = Player.getPlayer();
      checkWin();
      Player.switchPlayer();
      return;
    }
    console.log("spot taken");
  };
  return { getBoard, resetBoard, makeMove };
})();

const playAgain = () => {
  Gameboard.resetBoard();
};

// -----Display
cells.forEach((el) => {
  el.addEventListener("click", Gameboard.makeMove);
});

const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", playAgain);

let status = document.getElementById("status");

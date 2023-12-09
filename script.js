const game = new TicTacToe2();
const gameBoardHTML = document.querySelector("#principal");
const playerTurn = document.querySelector("#turn");

const cell = (cellNumber, item, mainCell) => {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.setAttribute("data-cell", cellNumber);

  const X = document.createElement("p");
  X.innerText = "X";

  const O = document.createElement("p");
  O.innerText = "O";

  if (item === "X") {
    cell.appendChild(X);
  } else if (item === "O") {
    cell.appendChild(O);
  }

  cell.addEventListener("click", () => {
    game.changeItemBoard(mainCell, cellNumber);
  });

  return cell;
};

const clearBoard = () => {
  gameBoardHTML.innerHTML = "";
};

const drawGame = (board) => {
  clearBoard();

  playerTurn.innerText = `Vez do jogador ${game.currentPlayer}`;

  board.forEach((smallBoard, mainCellNumber) => {
    if (smallBoard === "X" || smallBoard === "O") {
      const mainCell = cell(mainCellNumber, smallBoard);

      gameBoardHTML.appendChild(mainCell);
      return;
    }

    const mainCell = cell(mainCellNumber);

    const smallBoardHTML = document.createElement("div");
    smallBoardHTML.classList.add("game");

    if (game.currentMainCell === mainCellNumber) {
      smallBoardHTML.classList.add("selected");
    }

    const smallBoardCells = drawOneBoard(smallBoard, mainCellNumber);

    smallBoardCells.forEach((smallBoardCell) => {
      smallBoardHTML.appendChild(smallBoardCell);
    });

    mainCell.appendChild(smallBoardHTML);

    gameBoardHTML.appendChild(mainCell);
  });
};

const drawOneBoard = (smallBoard, mainCell) => {
  return smallBoard.map((cellItem, cellNumber) =>
    cell(cellNumber, cellItem, mainCell)
  );
};

game.onDraw(drawGame);
console.log(game.gameBoard);

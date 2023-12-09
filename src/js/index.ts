import { GameBoard, SmallBoard, TicTacToe2 } from "./tictactoe.js";

const game = new TicTacToe2();

const gameBoardHTML = document.querySelector("#principal") as HTMLDivElement;
const playerTurn = document.querySelector("#turn") as HTMLSpanElement;
const btnReset = document.querySelector("#reset") as HTMLButtonElement;

btnReset.addEventListener("click", () => {
  game.restart();
});

const clearBoard = () => {
  gameBoardHTML.innerHTML = "";
};

const createX = () => {
  const X = document.createElement("p");
  X.innerText = "X";

  return X;
};

const createO = () => {
  const O = document.createElement("p");
  O.innerText = "O";

  return O;
};

type SmallCell = { cellNumber: number; item: string; mainCell: number };

const createSmallCell = ({ cellNumber, item, mainCell }: SmallCell) => {
  const cell = createCell(item);

  cell.addEventListener("click", () => {
    const hasWinner = game.changeItemBoard(mainCell, cellNumber);
    if (hasWinner) {
      alert(`O jogador ${game.currentPlayer} venceu!`);
    }
  });

  return cell;
};

const createCell = (item?: string) => {
  const cell = document.createElement("div");
  cell.classList.add("cell");

  if (item === "X") {
    cell.appendChild(createX());
  } else if (item === "O") {
    cell.appendChild(createO());
  }

  return cell;
};

const drawSmallBoard = (smallBoard: SmallBoard, mainCell: number) => {
  return smallBoard.map((item, cellNumber) =>
    createSmallCell({ cellNumber, item, mainCell })
  );
};

const drawGame = (board: GameBoard) => {
  clearBoard();

  playerTurn.innerText = `Vez do jogador ${game.currentPlayer}`;

  board.forEach((smallBoard, mainCellNumber) => {
    if (typeof smallBoard === "string") {
      const mainCell = createCell(smallBoard[0]);
      gameBoardHTML.appendChild(mainCell);
      return;
    }

    const smallBoardHTML = document.createElement("div");
    smallBoardHTML.classList.add("game");

    if (game.currentMainCell === mainCellNumber) {
      smallBoardHTML.classList.add("selected");
    }

    const smallBoardCells = drawSmallBoard(smallBoard, mainCellNumber);

    smallBoardCells.forEach((smallBoardCell) => {
      smallBoardHTML.appendChild(smallBoardCell);
    });

    const mainCell = createCell();
    mainCell.appendChild(smallBoardHTML);

    gameBoardHTML.appendChild(mainCell);
  });
};

game.setDraw(drawGame);

export type SmallBoard = Array<string>;
export type MainCell = "O" | "X";
export type GameBoard = Array<SmallBoard | MainCell>;

const equalsItemsInArray = (array: Array<any>) => {
  const set = new Set(array);
  return set.size == 1;
};

type CheckWinnerParams = {
  board: Array<SmallBoard | any>;
  a: number;
  b: number;
  c: number;
};

const rows = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];

const columns = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

const diagonals = [
  [0, 4, 8],
  [2, 4, 6],
];

const isEqual = ({ board, a, b, c }: CheckWinnerParams) => {
  const valueA = board[a];
  const valueB = board[b];
  const valueC = board[c];

  const values = [valueA, valueB, valueC];

  const check = equalsItemsInArray(values) && valueA !== "_";

  if (check) {
    return board[a];
  }

  return false;
};

export class TicTacToe2 {
  #gameBoard: GameBoard = [];
  #currentPlayer: "X" | "O" = "X";
  #currentMainCell = 4;
  #onDraw: Function = (board: GameBoard) => {};

  #generateBasicBoard() {
    return Array(9).fill("_");
  }

  #setInitialGameBoard() {
    this.#gameBoard = [];
    const board = this.#generateBasicBoard();

    for (let i = 0; i < 9; i++) {
      this.#gameBoard.push(Array.from(board));
    }
  }

  constructor() {
    this.#setInitialGameBoard();
  }

  #generateChecks(board: SmallBoard | GameBoard) {
    const checkRows = rows.map((row) => {
      return isEqual({ board, a: row[0], b: row[1], c: row[2] });
    });

    const checkColumns = columns.map((col) => {
      return isEqual({ board, a: col[0], b: col[1], c: col[2] });
    });

    const checkDiagonals = diagonals.map((diagonal) => {
      return isEqual({ board, a: diagonal[0], b: diagonal[1], c: diagonal[2] });
    });

    return { checkRows, checkColumns, checkDiagonals };
  }

  #checkSmallWinner(small: SmallBoard) {
    const { checkColumns, checkDiagonals, checkRows } =
      this.#generateChecks(small);

    const winner =
      checkRows.find((row) => row) ||
      checkColumns.find((col) => col) ||
      checkDiagonals.find((diagonal) => diagonal);

    return winner;
  }

  #changePlayer() {
    this.#currentPlayer = this.#currentPlayer === "X" ? "O" : "X";
  }

  #checkIfCanChooseMainCell(clickedMainCell: number) {
    if (this.#currentMainCell === clickedMainCell) {
      return true;
    }

    if (
      this.#gameBoard[this.currentMainCell] === "X" ||
      this.#gameBoard[this.currentMainCell] === "O"
    ) {
      return true;
    }

    return false;
  }

  setDraw(fn: Function) {
    this.#onDraw = fn;
    this.#drawGame();
  }

  get gameBoard() {
    return this.#gameBoard;
  }

  get currentPlayer() {
    return this.#currentPlayer;
  }

  get currentMainCell() {
    return this.#currentMainCell;
  }

  set currentMainCell(cell: number) {
    this.#currentMainCell = cell;
    this.#drawGame();
  }

  #drawGame() {
    this.#onDraw(this.#gameBoard);
  }

  #checkWinnerMainBoard() {
    const { checkColumns, checkDiagonals, checkRows } = this.#generateChecks(
      this.gameBoard
    );

    console.log(checkColumns, checkDiagonals, checkRows);

    const winner =
      checkRows.find((row) => row) ||
      checkColumns.find((col) => col) ||
      checkDiagonals.find((diagonal) => diagonal);

    return winner;
  }

  changeItemBoard(mainCell: number, cellNumber: number) {
    if (!this.#checkIfCanChooseMainCell(mainCell)) {
      return;
    }

    const smallBoard = this.#gameBoard[mainCell] as SmallBoard;

    if (smallBoard[cellNumber] !== "_") {
      return;
    }

    smallBoard[cellNumber] = this.#currentPlayer;
    this.#gameBoard[mainCell] = smallBoard;

    this.#currentMainCell = cellNumber;

    const hasSmallWinner = this.#checkSmallWinner(smallBoard);

    if (hasSmallWinner) {
      console.log("small winner");

      this.#gameBoard[mainCell] = hasSmallWinner;

      const hasWinnerMainBoard = this.#checkWinnerMainBoard();

      if (hasWinnerMainBoard) {
        this.#drawGame();
        return true;
      }
    }

    this.#changePlayer();
    this.#drawGame();

    return false;
  }

  restart() {
    this.#setInitialGameBoard();
    this.currentMainCell = 4;
    this.#currentPlayer = "X";
    this.#drawGame();
  }
}

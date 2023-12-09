var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TicTacToe2_instances, _TicTacToe2_gameBoard, _TicTacToe2_currentPlayer, _TicTacToe2_currentMainCell, _TicTacToe2_onDraw, _TicTacToe2_generateBasicBoard, _TicTacToe2_setInitialGameBoard, _TicTacToe2_generateChecks, _TicTacToe2_checkSmallWinner, _TicTacToe2_changePlayer, _TicTacToe2_checkIfCanChooseMainCell, _TicTacToe2_drawGame, _TicTacToe2_checkWinnerMainBoard;
const equalsItemsInArray = (array) => {
    const set = new Set(array);
    return set.size == 1;
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
const isEqual = ({ board, a, b, c }) => {
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
    constructor() {
        _TicTacToe2_instances.add(this);
        _TicTacToe2_gameBoard.set(this, []);
        _TicTacToe2_currentPlayer.set(this, "X");
        _TicTacToe2_currentMainCell.set(this, 4);
        _TicTacToe2_onDraw.set(this, (board) => { });
        __classPrivateFieldGet(this, _TicTacToe2_instances, "m", _TicTacToe2_setInitialGameBoard).call(this);
    }
    setDraw(fn) {
        __classPrivateFieldSet(this, _TicTacToe2_onDraw, fn, "f");
        __classPrivateFieldGet(this, _TicTacToe2_instances, "m", _TicTacToe2_drawGame).call(this);
    }
    get gameBoard() {
        return __classPrivateFieldGet(this, _TicTacToe2_gameBoard, "f");
    }
    get currentPlayer() {
        return __classPrivateFieldGet(this, _TicTacToe2_currentPlayer, "f");
    }
    get currentMainCell() {
        return __classPrivateFieldGet(this, _TicTacToe2_currentMainCell, "f");
    }
    set currentMainCell(cell) {
        __classPrivateFieldSet(this, _TicTacToe2_currentMainCell, cell, "f");
        __classPrivateFieldGet(this, _TicTacToe2_instances, "m", _TicTacToe2_drawGame).call(this);
    }
    changeItemBoard(mainCell, cellNumber) {
        if (!__classPrivateFieldGet(this, _TicTacToe2_instances, "m", _TicTacToe2_checkIfCanChooseMainCell).call(this, mainCell)) {
            return;
        }
        const smallBoard = __classPrivateFieldGet(this, _TicTacToe2_gameBoard, "f")[mainCell];
        if (smallBoard[cellNumber] !== "_") {
            return;
        }
        smallBoard[cellNumber] = __classPrivateFieldGet(this, _TicTacToe2_currentPlayer, "f");
        __classPrivateFieldGet(this, _TicTacToe2_gameBoard, "f")[mainCell] = smallBoard;
        __classPrivateFieldSet(this, _TicTacToe2_currentMainCell, cellNumber, "f");
        const hasSmallWinner = __classPrivateFieldGet(this, _TicTacToe2_instances, "m", _TicTacToe2_checkSmallWinner).call(this, smallBoard);
        if (hasSmallWinner) {
            console.log("small winner");
            __classPrivateFieldGet(this, _TicTacToe2_gameBoard, "f")[mainCell] = hasSmallWinner;
            const hasWinnerMainBoard = __classPrivateFieldGet(this, _TicTacToe2_instances, "m", _TicTacToe2_checkWinnerMainBoard).call(this);
            if (hasWinnerMainBoard) {
                __classPrivateFieldGet(this, _TicTacToe2_instances, "m", _TicTacToe2_drawGame).call(this);
                return true;
            }
        }
        __classPrivateFieldGet(this, _TicTacToe2_instances, "m", _TicTacToe2_changePlayer).call(this);
        __classPrivateFieldGet(this, _TicTacToe2_instances, "m", _TicTacToe2_drawGame).call(this);
        return false;
    }
    restart() {
        __classPrivateFieldGet(this, _TicTacToe2_instances, "m", _TicTacToe2_setInitialGameBoard).call(this);
        this.currentMainCell = 4;
        __classPrivateFieldSet(this, _TicTacToe2_currentPlayer, "X", "f");
        __classPrivateFieldGet(this, _TicTacToe2_instances, "m", _TicTacToe2_drawGame).call(this);
    }
}
_TicTacToe2_gameBoard = new WeakMap(), _TicTacToe2_currentPlayer = new WeakMap(), _TicTacToe2_currentMainCell = new WeakMap(), _TicTacToe2_onDraw = new WeakMap(), _TicTacToe2_instances = new WeakSet(), _TicTacToe2_generateBasicBoard = function _TicTacToe2_generateBasicBoard() {
    return Array(9).fill("_");
}, _TicTacToe2_setInitialGameBoard = function _TicTacToe2_setInitialGameBoard() {
    __classPrivateFieldSet(this, _TicTacToe2_gameBoard, [], "f");
    const board = __classPrivateFieldGet(this, _TicTacToe2_instances, "m", _TicTacToe2_generateBasicBoard).call(this);
    for (let i = 0; i < 9; i++) {
        __classPrivateFieldGet(this, _TicTacToe2_gameBoard, "f").push(Array.from(board));
    }
}, _TicTacToe2_generateChecks = function _TicTacToe2_generateChecks(board) {
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
}, _TicTacToe2_checkSmallWinner = function _TicTacToe2_checkSmallWinner(small) {
    const { checkColumns, checkDiagonals, checkRows } = __classPrivateFieldGet(this, _TicTacToe2_instances, "m", _TicTacToe2_generateChecks).call(this, small);
    const winner = checkRows.find((row) => row) ||
        checkColumns.find((col) => col) ||
        checkDiagonals.find((diagonal) => diagonal);
    return winner;
}, _TicTacToe2_changePlayer = function _TicTacToe2_changePlayer() {
    __classPrivateFieldSet(this, _TicTacToe2_currentPlayer, __classPrivateFieldGet(this, _TicTacToe2_currentPlayer, "f") === "X" ? "O" : "X", "f");
}, _TicTacToe2_checkIfCanChooseMainCell = function _TicTacToe2_checkIfCanChooseMainCell(clickedMainCell) {
    if (__classPrivateFieldGet(this, _TicTacToe2_currentMainCell, "f") === clickedMainCell) {
        return true;
    }
    if (__classPrivateFieldGet(this, _TicTacToe2_gameBoard, "f")[this.currentMainCell] === "X" ||
        __classPrivateFieldGet(this, _TicTacToe2_gameBoard, "f")[this.currentMainCell] === "O") {
        return true;
    }
    return false;
}, _TicTacToe2_drawGame = function _TicTacToe2_drawGame() {
    __classPrivateFieldGet(this, _TicTacToe2_onDraw, "f").call(this, __classPrivateFieldGet(this, _TicTacToe2_gameBoard, "f"));
}, _TicTacToe2_checkWinnerMainBoard = function _TicTacToe2_checkWinnerMainBoard() {
    const { checkColumns, checkDiagonals, checkRows } = __classPrivateFieldGet(this, _TicTacToe2_instances, "m", _TicTacToe2_generateChecks).call(this, this.gameBoard);
    console.log(checkColumns, checkDiagonals, checkRows);
    const winner = checkRows.find((row) => row) ||
        checkColumns.find((col) => col) ||
        checkDiagonals.find((diagonal) => diagonal);
    return winner;
};

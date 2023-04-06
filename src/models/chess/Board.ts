import Cell from './Cell';
import Colors from './Colors';
import Pawn from './figures/Pawn';
import Rook from './figures/Rook';
import Knight from './figures/Knight';
import Bishop from './figures/Bishop';
import Queen from './figures/Queen';
import King from './figures/King';
import Figure, { FigureName } from './figures/Figure';
import ChessGameLoadedCell from '../../types/chess/chessGameLoadedCell';
import ChessGameState from '../../types/chess/chessGameState';

class Board {
  cells: Cell[][] = [];
  lostBlackFigures: Figure[] = [];
  lostWhiteFigures: Figure[] = [];
  whiteKing: King | null = null;
  blackKing: King | null = null;
  currentPlayer: Colors = Colors.WHITE;
  isCheckState: { state: boolean, king: King | null } = { state: false, king: null };
  isCheckmateState: { state: boolean, king: King | null } = { state: false, king: null };

  public initCells() {
    this.cells = [];
    console.log('init sellcs');
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null));
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null));
        }
      }
      this.cells.push(row);
    }
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.currentPlayer = this.currentPlayer;
    return newBoard;
  }

  public applyStateFromServer(state: ChessGameState) {
    console.log(state);
    const { cells, currentPlayer } = state;
    cells.forEach((row) => row.forEach((cell) => {
      this.getFigureClassFromName(cell.x, cell.y, cell.figure, cell.color);
    }));
    this.currentPlayer = currentPlayer;
  }

  private getFigureClassFromName(
    x: number,
    y: number,
    figureName: FigureName | undefined,
    color: Colors | undefined,
  ) {
    if (!figureName || !color) {
      this.getCell(x, y).figure = null;
      return;
    }
    switch (figureName) {
      case 'Rook':
        new Rook(color, this.getCell(x, y));
        break;
      case 'Knight':
        new Knight(color, this.getCell(x, y));
        break;
      case 'King':
        new King(color, this.getCell(x, y));
        break;
      case 'Queen':
        new Queen(color, this.getCell(x, y));
        break;
      case 'Pawn':
        new Pawn(color, this.getCell(x, y));
        break;
      case 'Bishop':
        new Bishop(color, this.getCell(x, y));
        break;
      default:
        this.getCell(x, y).figure = null;
    }
  }

  public getBoardState() {
    const boardState = <ChessGameState>{};
    const cellsToSend: ChessGameLoadedCell[][] = this.cells.map((row) => row.map((cell) => (
      {
        ...cell, figure: cell.figure?.name, color: cell.figure?.color, board: null,
      }
    )));
    boardState.cells = cellsToSend;
    boardState.currentPlayer = this.currentPlayer;
    console.log(boardState);
    return boardState;
  }

  public highlightTargetCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  public toggleCurrentPlayer() {
    this.currentPlayer = this.currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
    console.log(this.currentPlayer, ' toggle player');
  }

  public checkKingsState(color: Colors) {
    this.isCheckState = { state: false, king: null };
    this.checkIsKingReachable();
    if (this.isCheckState.state) {
      console.log('========================= check mock ===========================');
    }
    if (this.isCheckState.state) {
      this.checkIsCheckmate(color);
    }
  }

  checkIsCheckmate(color: Colors) {
    if (color === this.isCheckState.king?.color) {
      this.isCheckmateState = { state: true, king: this.isCheckState.king };
      console.log('========================= checkmate mock ===========================');
    }
  }

  checkIsKingReachable() {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        this.checkIsTargetDangerousForKing(target);
      }
    }
  }

  checkIsTargetDangerousForKing(target: Cell) {
    if (!target.figure || !this.whiteKing || !this.blackKing) {
      return;
    }
    [this.whiteKing, this.blackKing].forEach((king) => {
      if (target.figure?.color === king.color) {
        return;
      }
      if (king.cell.isEmptyHorizontal(target) || king.cell.isEmptyVertical(target)) {
        if (FigureName.ROOK === target.figure?.name || FigureName.QUEEN === target.figure?.name) {
          console.log(target, ` is dangerous for ${king.color} king`);
          this.isCheckState = { state: true, king };
          return;
        }
      }
      if (king.cell.isEmptyDiagonal(target)) {
        if (FigureName.BISHOP === target.figure?.name || FigureName.QUEEN === target.figure?.name) {
          console.log(target, ` is dangerous for ${king.color} king`);
          this.isCheckState = { state: true, king };
          return;
        }
      }
      if (king.cell.isEmptyCorner(target)) {
        if (FigureName.KNIGHT === target.figure?.name) {
          console.log(target, ` is dangerous for ${king.color} king`);
          this.isCheckState = { state: true, king };
          return;
        }
      }
      if (king.cell.isEmptyCircle(target)) {
        if (FigureName.KING === target.figure?.name) {
          console.log(target, ` is dangerous for ${king.color} king`);
          this.isCheckState = { state: true, king };
          return;
        }
      }
      if (king.cell.isEmptyPawnZone(target, king.color)) {
        if (FigureName.PAWN === target.figure?.name) {
          console.log(target, ` is dangerous for ${king.color} king`);
          this.isCheckState = { state: true, king };
        }
      }
    });
  }

  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCell(i, 1));
      new Pawn(Colors.WHITE, this.getCell(i, 6));
    }
  }

  private addKings() {
    this.whiteKing = new King(Colors.WHITE, this.getCell(4, 7));
    this.blackKing = new King(Colors.BLACK, this.getCell(4, 0));
  }

  private addQueens() {
    new Queen(Colors.BLACK, this.getCell(3, 0));
    new Queen(Colors.WHITE, this.getCell(3, 7));
  }

  private addBishops() {
    new Bishop(Colors.BLACK, this.getCell(2, 0));
    new Bishop(Colors.BLACK, this.getCell(5, 0));
    new Bishop(Colors.WHITE, this.getCell(2, 7));
    new Bishop(Colors.WHITE, this.getCell(5, 7));
  }

  private addKnights() {
    new Knight(Colors.BLACK, this.getCell(1, 0));
    new Knight(Colors.BLACK, this.getCell(6, 0));
    new Knight(Colors.WHITE, this.getCell(1, 7));
    new Knight(Colors.WHITE, this.getCell(6, 7));
  }

  private addRooks() {
    new Rook(Colors.BLACK, this.getCell(0, 0));
    new Rook(Colors.BLACK, this.getCell(7, 0));
    new Rook(Colors.WHITE, this.getCell(0, 7));
    new Rook(Colors.WHITE, this.getCell(7, 7));
  }

  public addFigures() {
    this.addPawns();
    this.addKnights();
    this.addKings();
    this.addBishops();
    this.addQueens();
    this.addRooks();
  }
}

export default Board;

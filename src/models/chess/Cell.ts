import Colors from './Colors';
import Figure from './figures/Figure';
import Board from './Board';

class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  figure: Figure | null;
  board: Board;
  available: boolean;
  id: number;

  constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.board = board;
    this.available = false;
    this.id = Math.random();
  }

  isEmpty(): boolean {
    return this.figure === null;
  }

  isEnemy(target: Cell): boolean {
    if (target.figure) {
      return this.figure?.color !== target.figure.color;
    }
    return false;
  }

  isEmptyPawnZone(target: Cell, color: Colors): boolean {
    const direction = color === Colors.BLACK ? 1 : -1;

    if (target.y === this.y + direction
      && (target.x === this.x + 1 || target.x === this.x - 1)
      && this.isEnemy(target)) {
      return true;
    }
    return false;
  }

  isEmptyCorner(target: Cell): boolean {
    const dx = Math.abs(this.x - target.x);
    const dy = Math.abs(this.y - target.y);

    return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
  }

  isEmptyVertical(target: Cell): boolean {
    if (this.x !== target.x) {
      return false;
    }

    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);
    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(this.x, y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmptyCircle(target: Cell): boolean {
    if ((target.x > this.x + 1 || target.x < this.x - 1)
      || (target.y > this.y + 1 || target.y < this.y - 1)) {
      return false;
    }
    return true;
  }

  isEmptyHorizontal(target: Cell): boolean {
    if (this.y !== target.y) {
      return false;
    }

    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);
    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(x, this.y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmptyDiagonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);
    if (absY !== absX) {
      return false;
    }

    const dy = this.y < target.y ? 1 : -1;
    const dx = this.x < target.x ? 1 : -1;

    for (let i = 1; i < absY; i++) {
      if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }

  moveFigure(target: Cell, board: Board) {
    if (this.figure && this.figure?.canMove(target)) {
      if (target.figure) {
        board.eatenFigures.push({
          name: target.figure.name, img: target.figure.logo, eatenBy: this.figure.logo, id: Math.random(),
        });
      }
      target.setFigure(this.figure);
      this.figure.moveFigure(target);
      const figureColor = this.figure.color;
      this.figure = null;
      board.checkKingsState(figureColor);
    }
  }
}

export default Cell;

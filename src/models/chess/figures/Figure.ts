import Colors from '../Colors';
import logo from '../../../assets/figures/King-black.svg';
import Cell from '../Cell';

export enum FigureName {
  FIGURE = 'Figure',
  KING = 'King',
  QUEEN = 'Queen',
  KNIGHT = 'Knight',
  BISHOP = 'Bishop',
  ROOK = 'Rook',
  PAWN = 'Pawn',
}

class Figure {
  color: Colors;
  logo: typeof logo | null;
  cell: Cell;
  name: FigureName;
  id: number;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.logo = null;
    this.name = FigureName.FIGURE;
    this.id = Math.random();
  }

  canMove(target: Cell) : boolean {
    if (target.figure?.color === this.color) {
      return false;
    }
    if (target.figure?.name === FigureName.KING) {
      return false;
    }
    return true;
  }

  moveFigure(target: Cell) {
    console.log(target);
  }
}

export default Figure;

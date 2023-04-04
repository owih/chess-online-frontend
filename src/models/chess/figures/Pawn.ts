import Figure, { FigureName } from './Figure';
import Colors from '../Colors';
import Cell from '../Cell';
import blackLogo from '../../../assets/figures/Pawn-black.svg';
import whiteLogo from '../../../assets/figures/Pawn-white.svg';
import Queen from './Queen';

class Pawn extends Figure {
  isFirstStep: boolean = true;
  constructor(color: Colors, cell: Cell) {
    super(color, cell);

    this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
    this.name = FigureName.PAWN;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
    const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2;

    if (!this.checkIsFirstMove()
      && ((target.y === this.cell.y + direction)
      && target.x === this.cell.x
      && this.cell.board.getCell(target.x, target.y).isEmpty())) {
      return true;
    }

    if (this.checkIsFirstMove()
      && (((target.y === this.cell.y + firstStepDirection)
        || (target.y === this.cell.y + direction))
        && (target.x === this.cell.x)
        && (this.cell.board.getCell(target.x, target.y).isEmpty())
        && (this.cell.board.getCell(target.x, this.cell.y + direction).isEmpty())
      )) {
      return true;
    }

    if (target.y === this.cell.y + direction
      && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
      && this.cell.isEnemy(target)) {
      return true;
    }

    return false;
  }

  checkIsFirstMove() {
    if (this.color === Colors.BLACK && this.cell.y === 1) {
      return true;
    }
    if (this.color === Colors.WHITE && this.cell.y === 6) {
      return true;
    }
    return false;
  }

  moveFigure(target: Cell) {
    super.moveFigure(target);
    this.isFirstStep = false;
    this.checkIsEndOfTheBoard();
  }

  checkIsEndOfTheBoard() {
    if (this.color === Colors.BLACK && this.cell.y === 7) {
      this.replacePawn();
    }
    if (this.color === Colors.WHITE && this.cell.y === 0) {
      this.replacePawn();
    }
  }

  replacePawn() {
    console.log('end of the board');
    this.cell.setFigure(new Queen(this.color, this.cell));
  }
}

export default Pawn;

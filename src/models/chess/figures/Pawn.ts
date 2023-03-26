import Figure, { FigureName } from './Figure';
import Colors from '../Colors';
import Cell from '../Cell';
import blackLogo from '../../../assets/figures/Pawn-black.svg';
import whiteLogo from '../../../assets/figures/Pawn-white.svg';

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

    if (!this.isFirstStep
      && ((target.y === this.cell.y + direction)
      && target.x === this.cell.x
      && this.cell.board.getCell(target.x, target.y).isEmpty())) {
      return true;
    }

    if (this.isFirstStep
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

  moveFigure(target: Cell) {
    super.moveFigure(target);
    this.isFirstStep = false;
  }
}

export default Pawn;

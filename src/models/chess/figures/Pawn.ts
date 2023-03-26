import Figure, { FigureName } from './Figure';
import Colors from '../Colors';
import Cell from '../Cell';
import blackLogo from '../../../assets/figures/Pawn-black.svg';
import whiteLogo from '../../../assets/figures/Pawn-white.svg';

class Pawn extends Figure {
  isFirstStep: boolean = true;
  constructor(color: Colors, cell: Cell) {
    super(color, cell);

    this.logo = color === Colors.WHITE ? blackLogo : whiteLogo;
    this.name = FigureName.PAWN;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
    const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2;

    console.log(target, ' TARGET');
    console.log(this.cell, ' CELL');

    console.log(firstStepDirection);

    if (((target.y === this.cell.y + direction)
      && target.x === this.cell.x
      && this.cell.board.getCell(target.x, target.y).isEmpty())) {
      console.log('FIRST TRUE');
      return true;
    }

    if (target.y === this.cell.y + direction
      && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
      && this.cell.isEnemy(target)) {
      console.log('SECOND TRUE');
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

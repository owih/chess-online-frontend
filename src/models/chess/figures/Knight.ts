import Figure, { FigureName } from './Figure';
import Colors from '../Colors';
import Cell from '../Cell';
import blackLogo from '../../../assets/figures/Knight-black.svg';
import whiteLogo from '../../../assets/figures/Knight-white.svg';

class Knight extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);

    this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
    this.name = FigureName.KNIGHT;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    if (this.cell.isEmptyCorner(target)) {
      return true;
    }
    return false;
  }
}

export default Knight;

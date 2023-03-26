import Figure, { FigureName } from './Figure';
import Colors from '../Colors';
import Cell from '../Cell';
import blackLogo from '../../../assets/figures/Queen-black.svg';
import whiteLogo from '../../../assets/figures/Queen-white.svg';

class Queen extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);

    this.logo = color === Colors.WHITE ? blackLogo : whiteLogo;
    this.name = FigureName.QUEEN;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;
    if (this.cell.isEmptyVertical(target)) return true;
    if (this.cell.isEmptyHorizontal(target)) return true;
    if (this.cell.isEmptyDiagonal(target)) return true;
    return false;
  }
}

export default Queen;

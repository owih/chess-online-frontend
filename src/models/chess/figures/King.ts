import Figure, { FigureName } from './Figure';
import Colors from '../Colors';
import Cell from '../Cell';
import blackLogo from '../../../assets/figures/King-black.svg';
import whiteLogo from '../../../assets/figures/King-white.svg';

class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);

    this.logo = color === Colors.WHITE ? blackLogo : whiteLogo;
    this.name = FigureName.KING;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    return true;
  }
}

export default King;

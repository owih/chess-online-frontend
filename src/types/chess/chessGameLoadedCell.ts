import Colors from '../../models/chess/Colors';
import { FigureName } from '../../models/chess/figures/Figure';

interface ChessGameLoadedCell {
  x: number,
  y: number,
  color: Colors | undefined,
  figure: FigureName | undefined,
  board: null,
}

export default ChessGameLoadedCell;

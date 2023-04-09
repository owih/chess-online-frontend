import ChessGameLoadedCell from './chessGameLoadedCell';
import Colors from '../../models/chess/Colors';
import ChessGameEatenFigure from './chessGameEatenFigure';
import ChessGameCheck from './chessGameCheck';

interface ChessGameState {
  cells: ChessGameLoadedCell[][];
  currentPlayer: Colors;
  eatenFigures: ChessGameEatenFigure[]
  isCheckmateState: ChessGameCheck,
}

export default ChessGameState;

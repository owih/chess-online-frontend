import ChessGameLoadedCell from './chessGameLoadedCell';
import Colors from '../../models/chess/Colors';

interface ChessGameState {
  cells: ChessGameLoadedCell[][];
  currentPlayer: Colors;
}

export default ChessGameState;

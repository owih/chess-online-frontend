import ChessGameState from './chessGameState';
import ChessGameProcess from './chessGameProcess';
import Colors from '../../models/chess/Colors';

interface ChessGameRoom {
  gameId: string,
  state: ChessGameState;
  whitePlayerId: number | null;
  blackPlayerId: number | null;
  viewersId: number[];
  gameProcess: ChessGameProcess;
  currentPlayer: Colors;
}
export default ChessGameRoom;

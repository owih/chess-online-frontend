import ChessGameProcess from './chessGameProcess';
import Colors from '../../models/chess/Colors';

interface ChessGameRoomRaw {
  gameId: string,
  state: string;
  whitePlayerId: number | null;
  blackPlayerId: number | null;
  viewersId: number[];
  gameProcess: ChessGameProcess;
  currentPlayer: Colors;
}
export default ChessGameRoomRaw;

import ChessGameState from './chessGameState';
import ChessGameProcess from './chessGameProcess';

interface ChessGameRoom {
  gameId: string,
  state: ChessGameState;
  whitePlayerId: number | null;
  blackPlayerId: number | null;
  viewersId: number[];
  gameProcess: ChessGameProcess;
}
export default ChessGameRoom;

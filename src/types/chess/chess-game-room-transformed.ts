import ChessGameState from './chess-game-state';
import User from '../user/user';

interface ChessGameRoomTransformed {
  state: ChessGameState;
  whitePlayer: User | null;
  blackPlayer: User | null;
  viewers: User[];
}
export default ChessGameRoomTransformed;

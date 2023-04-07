import ChessGameMemberEvent from './chessGameMemberEvent';
import Colors from '../../models/chess/Colors';

interface ChessGamePlayer {
  userId: number;
  color: Colors;
  event: ChessGameMemberEvent
}

export default ChessGamePlayer;

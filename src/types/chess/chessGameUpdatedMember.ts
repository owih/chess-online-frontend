import ChessGameEvent from './chessGameEvent';
import Colors from '../../models/chess/Colors';

interface ChessGameUpdatedMember {
  gameId: string;
  userId: number;
  event: ChessGameEvent;
  color?: Colors;
}

export default ChessGameUpdatedMember;

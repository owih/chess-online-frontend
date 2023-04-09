import Colors from '../../models/chess/Colors';

interface ChessGameCheck {
  isCheck: boolean;
  isCheckmate: boolean;
  king: Colors | null;
}

export default ChessGameCheck;

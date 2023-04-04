import Colors from '../../models/chess/Colors';

interface ChessGameRoom {
  gameId: string,
  state: string;
  whitePlayerId: number | null;
  blackPlayerId: number | null;
  currentPlayer: Colors;
  viewersId: number[];
}
export default ChessGameRoom;

import ChessGameState from './chessGameState';

interface ChessGameWebsocketResponse {
  userId: number;
  room: string;
  data: ChessGameState;
}

export default ChessGameWebsocketResponse;

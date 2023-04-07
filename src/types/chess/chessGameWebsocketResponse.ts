interface ChessGameWebsocketResponse<T> {
  userId: number;
  room: string;
  data: T;
}

export default ChessGameWebsocketResponse;

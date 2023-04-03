interface ChessGameRoom {
  gameId: number,
  stateId: number;
  whitePlayerId: number;
  blackPlayerId: number;
  viewersId: number[];
}
export default ChessGameRoom;

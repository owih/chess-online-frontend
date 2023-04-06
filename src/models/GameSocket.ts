import { io, Socket } from 'socket.io-client';
import ChessGameEvent from '../types/chess/chessGameEvent';
import ChessGameWebsocketResponse from '../types/chess/chessGameWebsocketResponse';
import ChessGameState from '../types/chess/chessGameState';

class GameSocket {
  gameId: string;
  userId: number;
  socket: Socket;

  constructor(gameId: string, userId: number) {
    console.log('INIT CLASS SOCKET');
    this.gameId = gameId;
    this.userId = userId;
    this.socket = io(`${process.env.REACT_APP_WEBSOCKET_URL}`, {
      autoConnect: false,
    });
  }

  private checkIsSelfMadeMessage(userId: number) {
    console.log(this.userId === userId, ' checkIsSelfMadeMessage');
    return this.userId === userId;
  }

  public connectToServer() {
    this.socket.connect();
  }

  public sendUpdatedChessState(data: ChessGameState) {
    console.log(data, ' sended data');
    this.socket.emit(ChessGameEvent.EVENT, { room: this.gameId, userId: this.userId, data });
  }

  public connectUserToGameRoom() {
    this.socket.emit(ChessGameEvent.JOIN_ROOM, { room: this.gameId, userId: this.userId });
  }

  public registerOnChessGameEvent(callback: (state: ChessGameState) => void) {
    this.socket.on(ChessGameEvent.EVENT, (response: ChessGameWebsocketResponse) => {
      if (this.checkIsSelfMadeMessage(response.userId)) {
        return;
      }

      console.log(response, 'response data');

      callback(response.data);
    });
  }

  // public onLeaveRoomMessage(event: ChessGameEvent, callback: () => void) {
  //   if (this.checkIsSelfMadeMessage(data.userId)) {
  //     return;
  //   }
  //
  //   this.socket.on(event, () => {
  //     callback();
  //   });
  // }

  public onConnect(callback: () => void) {
    console.log('connect');
    return this.socket.on('connect', callback);
  }

  public closeConnection() {
    this.socket.close();
  }
}

export default GameSocket;

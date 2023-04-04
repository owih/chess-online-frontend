import { io, Socket } from 'socket.io-client';
import ChessGameEvent from '../types/chess/chess-game-event';

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

  public connectToServer() {
    this.socket.connect();
  }

  public sendEventWithData(event: ChessGameEvent, data: any) {
    console.log(data);
    this.socket.emit(event, { room: this.gameId, userId: this.userId, data });
  }

  public connectUserToGameRoom() {
    this.socket.emit(ChessGameEvent.JOIN_ROOM, { room: this.gameId, userId: this.userId });
  }

  public onReceivedMessage(event: ChessGameEvent, callback: any) {
    return this.socket.on(event, callback);
  }

  public onConnect(callback: any) {
    console.log('connect');
    return this.socket.on('connect', callback);
  }

  public closeConnection() {
    this.socket.close();
  }
}

export default GameSocket;

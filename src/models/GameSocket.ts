import { io, Socket } from 'socket.io-client';
import ChessGameEvent from '../types/chess/chessGameEvent';
import ChessGameWebsocketResponse from '../types/chess/chessGameWebsocketResponse';
import ChessGameState from '../types/chess/chessGameState';
import ChessGameProcess from '../types/chess/chessGameProcess';
import ChessGameViewers from '../types/chess/chessGameViewers';
import ChessGameMemberEvent from '../types/chess/chessGameMemberEvent';
import ChessGamePlayer from '../types/chess/chessGamePlayer';

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

  public sendLeaveViewer(data: ChessGameViewers) {
    this.socket.emit(ChessGameEvent.VIEWERS, { room: this.gameId, userId: this.userId, data });
  }

  public sendJoinViewer(data: ChessGameViewers) {
    this.socket.emit(ChessGameEvent.VIEWERS, { room: this.gameId, userId: this.userId, data });
  }

  public sendPlayerEvent(data: ChessGamePlayer) {
    this.socket.emit(ChessGameEvent.PLAYER, { room: this.gameId, userId: this.userId, data });
  }

  public sendUpdatedChessProcess(data: ChessGameProcess) {
    console.log(data, ' sended data');
    this.socket.emit(ChessGameEvent.PROCESS, {
      room: this.gameId,
      userId: this.userId,
      data,
    });
  }

  public connectUserToGameRoom() {
    const data = { userId: this.userId, event: ChessGameMemberEvent.JOIN };
    this.socket.emit(ChessGameEvent.JOIN_ROOM, { room: this.gameId, data });
  }

  public disconnectUserFromGameRoom() {
    console.log('emit leave room');
    const data = { userId: this.userId, event: ChessGameMemberEvent.LEAVE };
    this.socket.emit(ChessGameEvent.LEAVE_ROOM, { room: this.gameId, data });
  }

  public registerOnChessGameEvent(callback: (state: ChessGameState) => void) {
    this.socket.on(ChessGameEvent.EVENT, (response: ChessGameWebsocketResponse<ChessGameState>) => {
      if (this.checkIsSelfMadeMessage(response.userId)) {
        return;
      }

      console.log(response, 'response data');

      callback(response.data);
    });
  }

  public registerOnChessGameProcess(callback: (process: ChessGameProcess) => void) {
    this.socket.on(
      ChessGameEvent.PROCESS,
      (response: ChessGameWebsocketResponse<ChessGameProcess>) => {
        if (this.checkIsSelfMadeMessage(response.userId)) {
          return;
        }
        callback(response.data);
      },
    );
  }

  public registerOnChessGameViewers(callback: (viewersData: ChessGameViewers) => void) {
    this.socket.on(
      ChessGameEvent.VIEWERS,
      (response: ChessGameWebsocketResponse<ChessGameViewers>) => {
        console.log(response);
        if (this.checkIsSelfMadeMessage(response.userId)) {
          return;
        }
        callback(response.data);
      },
    );
  }

  public registerOnChessGamePlayer(callback: (playerData: ChessGamePlayer) => void) {
    this.socket.on(
      ChessGameEvent.PLAYER,
      (response: ChessGameWebsocketResponse<ChessGamePlayer>) => {
        console.log(response, ' player response');
        if (this.checkIsSelfMadeMessage(response.userId)) {
          return;
        }
        callback(response.data);
      },
    );
  }

  public onConnect(callback: () => void) {
    console.log('connect');
    return this.socket.on('connect', callback);
  }

  public closeConnection() {
    this.disconnectUserFromGameRoom();
    this.socket.close();
  }
}

export default GameSocket;

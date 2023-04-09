import { io, Socket } from 'socket.io-client';
import ChessGameEvent from '../types/chess/chessGameEvent';
import ChessGameWebsocketResponse from '../types/chess/chessGameWebsocketResponse';
import ChessGameState from '../types/chess/chessGameState';
import ChessGameProcess from '../types/chess/chessGameProcess';
import ChessGameViewers from '../types/chess/chessGameViewers';
import ChessGameMemberEvent from '../types/chess/chessGameMemberEvent';
import ChessGamePlayer from '../types/chess/chessGamePlayer';
import ChessGameMember from '../types/chess/chessGameMember';

class GameSocket {
  gameId: string;
  userId: number;
  socket: Socket;

  constructor(gameId: string, userId: number) {
    this.gameId = gameId;
    this.userId = userId;
    this.socket = io(`${process.env.REACT_APP_WEBSOCKET_URL}`, {
      autoConnect: false,
    });
  }

  private checkIsSelfMadeMessage(userId: number) {
    return this.userId === userId;
  }

  public connectToServer() {
    this.socket.connect();
  }

  public sendUpdatedChessState(data: ChessGameState) {
    this.socket.emit(ChessGameEvent.EVENT, { room: this.gameId, userId: this.userId, data });
  }

  public sendViewerEvent(data: ChessGameViewers) {
    this.socket.emit(ChessGameEvent.VIEWERS, { room: this.gameId, userId: this.userId, data });
  }

  public sendPlayerEvent(data: ChessGamePlayer) {
    this.socket.emit(ChessGameEvent.PLAYER, { room: this.gameId, userId: this.userId, data });
  }

  public sendUpdatedChessProcess(data: ChessGameProcess) {
    this.socket.emit(ChessGameEvent.PROCESS, {
      room: this.gameId,
      userId: this.userId,
      data,
    });
  }

  public connectUserToGameRoom() {
    const data = { room: this.gameId, userId: this.userId, event: ChessGameMemberEvent.JOIN };
    this.socket.emit(ChessGameEvent.JOIN_ROOM, { room: this.gameId, userId: this.userId, data });
  }

  public disconnectUserFromGameRoom() {
    const data = { room: this.gameId, userId: this.userId, event: ChessGameMemberEvent.LEAVE };
    this.socket.emit(ChessGameEvent.LEAVE_ROOM, { room: this.gameId, userId: this.userId, data });
  }

  public registerOnChessGameEvent(callback: (state: ChessGameState) => void) {
    this.socket.on(ChessGameEvent.EVENT, (response: ChessGameWebsocketResponse<ChessGameState>) => {
      if (this.checkIsSelfMadeMessage(response.userId)) {
        return;
      }

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
        if (this.checkIsSelfMadeMessage(response.userId)) {
          return;
        }
        callback(response.data);
      },
    );
  }

  public registerOnChessGameMember(callback: (memberData: ChessGameMember) => void) {
    this.socket.on(
      ChessGameEvent.LEAVE_ROOM,
      (response: ChessGameWebsocketResponse<ChessGameMember>) => {
        if (this.checkIsSelfMadeMessage(response.userId)) {
          return;
        }
        callback(response.data);
      },
    );
    this.socket.on(
      ChessGameEvent.JOIN_ROOM,
      (response: ChessGameWebsocketResponse<ChessGameMember>) => {
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
        if (this.checkIsSelfMadeMessage(response.userId)) {
          return;
        }
        callback(response.data);
      },
    );
  }

  public onConnect(callback: () => void) {
    return this.socket.on('connect', callback);
  }

  public onDisconnect(callback: () => void) {
    return this.socket.on('disconnect', callback);
  }

  public closeConnection() {
    this.socket.close();
  }
}

export default GameSocket;

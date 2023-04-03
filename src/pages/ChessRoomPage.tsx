import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { io } from 'socket.io-client';
import BoardComponent from '../components/BoardComponent/BoardComponent';
import Board from '../models/chess/Board';
import Colors from '../models/chess/Colors';
import Player from '../models/chess/Player';
import { useAppSelector } from '../hooks/redux';
import { useStartChessGameQuery } from '../services/chessService';
import ChessGameEvent from '../types/chess/chess-game-event';

const socket = io(`${process.env.REACT_APP_WEBSOCKET_URL}`, {
  autoConnect: false,
});

export default function ChessRoomPage() {
  const [board, setBoard] = useState<Board>(new Board());
  const [whitePlayer] = useState<Player>(new Player(Colors.WHITE));
  const [blackPlayer] = useState<Player>(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  const { id: gameId } = useParams();
  const userId = useAppSelector((state) => state.user.id);
  const { data } = useStartChessGameQuery(gameId ?? skipToken);

  useEffect(() => {
    if (!data || !userId || !gameId) return;

    console.log('useeffect');
    socket.connect();
  }, [data]);

  const repaintBoard = (boardToReplace?: Board) => {
    const newBoard = boardToReplace || new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  };

  useEffect(() => {
    repaintBoard();

    socket.on('connect', () => {
      console.log('connected');
      socket.emit(ChessGameEvent.JOIN_CHESS_GAME_ROOM, { room: gameId, userId });
    });

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    console.log('board changed');
  }, [board]);

  const swapPlayer = () => {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  };

  return (
    <div className="container h-full">
      <div className="flex justify-center items-center h-full">
        <button type="button" onClick={() => repaintBoard()}>Restart</button>
        <BoardComponent
          currentPlayer={currentPlayer}
          swapPlayer={swapPlayer}
          board={board}
          setBoard={setBoard}
        />
      </div>
    </div>
  );
}

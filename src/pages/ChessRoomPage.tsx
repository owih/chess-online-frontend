import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { Button } from '@mui/material';
import BoardComponent from '../components/BoardComponent/BoardComponent';
import Board from '../models/chess/Board';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useSendUpdatedRoomMutation, useStartChessGameQuery } from '../services/chessService';
import ChessGameEvent from '../types/chess/chess-game-event';
import PlayersPanel from '../components/PlayersPanel/PlayersPanel';
import ViewersPanel from '../components/ViewersPanel/ViewersPanel';
import GameSocket from '../models/GameSocket';
import AuthorizationForm from '../components/AuthorizationForm/AuthorizationForm';
import ChessGameLoadedCell from '../types/chess/chess-game-loaded-cell';
import { toggleCurrentPlayer } from '../store/reducers/ChessGameRoomSlice';

export default function ChessRoomPage() {
  const [board, setBoard] = useState<Board>(new Board());
  const [updatedBoardState, setUpdatedBoardState] = useState<ChessGameLoadedCell[][] | null>(null);
  const chessGameState = useAppSelector((state) => state.chessGameRoom.state);
  const chessGameRoom = useAppSelector((state) => state.chessGameRoom);
  const [sendUpdatedRoomMutation] = useSendUpdatedRoomMutation();

  const { id: gameId } = useParams();
  const userId = useAppSelector((state) => state.user.id);

  const dispatch = useAppDispatch();

  if (!userId || !gameId) {
    return (
      <AuthorizationForm />
    );
  }

  const { data } = useStartChessGameQuery(gameId ?? skipToken);
  const [socket] = useState(new GameSocket(gameId, userId));

  useEffect(() => {
    console.log('state update');
    sendUpdatedRoomMutation(chessGameRoom);
  }, [chessGameState]);

  useEffect(() => {
    if (!data || !userId || !gameId) return;

    console.log('useeffect ');
    socket.connectToServer();
  }, [data]);

  useEffect(() => {
    if (!updatedBoardState) return;
    board.applyStateFromServer(updatedBoardState);
    setBoard(board.getCopyBoard());
  }, [updatedBoardState]);

  const repaintBoard = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    dispatch(toggleCurrentPlayer());
  };

  useEffect(() => {
    repaintBoard();
    socket.onConnect(() => {
      console.log('on connect');
      socket.connectUserToGameRoom();
      socket.onReceivedMessage(ChessGameEvent.EVENT, (message: ChessGameLoadedCell[][]) => {
        setUpdatedBoardState(message);
      });
    });

    return () => {
      socket.closeConnection();
    };
  }, []);

  return (
    <div className="container h-full">
      <div className="flex justify-center items-center h-full">
        <Button variant="contained" onClick={repaintBoard}>Restart</Button>
        <PlayersPanel />
        <BoardComponent
          board={board}
          setBoard={setBoard}
        />
        <ViewersPanel />
      </div>
    </div>
  );
}

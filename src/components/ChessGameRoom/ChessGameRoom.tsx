import * as React from 'react';
import { Button } from '@mui/material';
import { useEffect, useMemo } from 'react';
import PlayersPanel from '../PlayersPanel/PlayersPanel';
import BoardComponent from '../BoardComponent/BoardComponent';
import ViewersPanel from '../ViewersPanel/ViewersPanel';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import GameSocket from '../../models/GameSocket';
import ChessGameState from '../../types/chess/chessGameState';
import ChessGameProcess from '../../types/chess/chessGameProcess';
import { setGameProcess, setGameState } from '../../store/reducers/ChessGameRoomSlice';

type Props = {
  gameId: string;
  userId: number;
};

export default function ChessGameRoom({ gameId, userId }: Props) {
  const socket = useMemo<GameSocket>(() => (new GameSocket(gameId, userId)), []);
  const chessGameProcess = useAppSelector((state) => state.chessGameRoom.gameProcess);

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('use effect on chess game room');
    const updateWebsocketState = (state: ChessGameState) => {
      dispatch(setGameState(state));
    };

    socket.connectToServer();
    socket.onConnect(() => {
      console.log('on connect ');
      socket.connectUserToGameRoom();
      socket.registerOnChessGameEvent(updateWebsocketState);
    });

    return () => {
      socket.closeConnection();
    };
  }, []);

  useEffect(() => {
    console.log(chessGameProcess);
  }, [chessGameProcess]);

  const updateChessState = (updatedChessState: ChessGameState) => {
    socket.sendUpdatedChessState(updatedChessState);
  };

  const pauseGame = () => {
    dispatch(setGameProcess(ChessGameProcess.PAUSED));
  };

  const endGame = () => {
    dispatch(setGameProcess(ChessGameProcess.ENDED));
  };

  const startGame = () => {
    dispatch(setGameProcess(ChessGameProcess.STARTED));
  };

  return (
    <div>
      <Button variant="contained" onClick={pauseGame}>Pause game</Button>
      <Button variant="contained" onClick={endGame}>End game</Button>
      <Button variant="contained" onClick={startGame}>Start game</Button>
      <PlayersPanel />
      <BoardComponent
        chessGameProcess={chessGameProcess}
        updateChessState={updateChessState}
      />
      <ViewersPanel />
    </div>
  );
}

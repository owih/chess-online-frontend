import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Button, Grid } from '@mui/material';
import BoardComponent from '../BoardComponent/BoardComponent';
import ViewersPanel from '../ViewersPanel/ViewersPanel';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import GameSocket from '../../models/GameSocket';
import ChessGameState from '../../types/chess/chessGameState';
import ChessGameProcess from '../../types/chess/chessGameProcess';
import {
  removeUserIdFromEvery,
  setBlackPlayerId,
  setGameProcess,
  setGameState,
  setMemberFromWebsocket,
  setPlayerFromWebsocket,
  setUserToViewers,
  setViewerFromWebsocket,
  setWhitePlayerId,
} from '../../store/reducers/ChessGameRoomSlice';
import PlayerCard from '../PlayerCard/PlayerCard';
import { useGetManyUsersQuery, useGetPlayerQuery } from '../../services/userService';
import Colors from '../../models/chess/Colors';
import ChessGameViewers from '../../types/chess/chessGameViewers';
import ChessGameMemberEvent from '../../types/chess/chessGameMemberEvent';
import ChessGamePlayer from '../../types/chess/chessGamePlayer';
import { useSendUpdatedMemberMutation, useSendUpdatedRoomMutation } from '../../services/chessService';
import ChessGameEvent from '../../types/chess/chessGameEvent';
import ChessGameMember from '../../types/chess/chessGameMember';
import EatenFiguresPanel from '../EatenFiguresPanel/EatenFiguresPanel';
import ChessGameEatenFigure from '../../types/chess/chessGameEatenFigure';
import ChessGameCheck from '../../types/chess/chessGameCheck';

type Props = {
  gameId: string;
  userId: number;
};

export default function ChessGameRoom({ gameId, userId }: Props) {
  const [eatenFigures, setEatenFigures] = useState<ChessGameEatenFigure[]>([]);
  const [checkmateState, setCheckmateState] = useState<ChessGameCheck>({
    isCheck: false,
    isCheckmate: false,
    king: null,
  });
  const socket = useMemo<GameSocket>(() => (new GameSocket(gameId, userId)), []);

  const {
    viewersId, whitePlayerId, blackPlayerId, gameProcess,
  } = useAppSelector((state) => state.chessGameRoom);
  const viewersWithoutUser = useMemo(() => viewersId.filter((item) => item !== userId), [viewersId]);
  const currentUser = useAppSelector((state) => state.user.user);
  const { data: fetchedViewers, isLoading: isViewersLoading } = useGetManyUsersQuery(viewersWithoutUser);
  const { data: whitePlayer, isLoading: isWhitePlayerLoading } = useGetPlayerQuery({
    id: whitePlayerId,
    color: Colors.WHITE,
  }, { skip: !whitePlayerId || whitePlayerId === userId });
  const { data: blackPlayer, isLoading: isBlackPlayerLoading } = useGetPlayerQuery({
    id: blackPlayerId,
    color: Colors.BLACK,
  }, { skip: !blackPlayerId || blackPlayerId === userId });

  const [sendUpdatedRoom] = useSendUpdatedRoomMutation();
  const [sendUpdatedMember] = useSendUpdatedMemberMutation();

  const dispatch = useAppDispatch();

  const userForWhitePlayer = useMemo(() => {
    if (!whitePlayerId) {
      return null;
    }
    if (currentUser && whitePlayerId === currentUser.id) {
      return currentUser;
    }
    return whitePlayer || null;
  }, [whitePlayerId, whitePlayer]);

  const userForBlackPlayer = useMemo(() => {
    if (!blackPlayerId) {
      return null;
    }
    if (currentUser && blackPlayerId === currentUser.id) {
      return currentUser;
    }
    return blackPlayer || null;
  }, [blackPlayerId, blackPlayer]);

  const viewersForViewersPanel = useMemo(() => {
    if (currentUser && viewersId.includes(userId)) {
      return [currentUser, ...fetchedViewers || []];
    }
    return fetchedViewers || [];
  }, [viewersId, fetchedViewers]);

  const currentPlayerPosition: Colors | null = useMemo(() => {
    if (userId === whitePlayerId) {
      return Colors.WHITE;
    }
    if (userId === blackPlayerId) {
      return Colors.BLACK;
    }
    return null;
  }, [whitePlayerId, blackPlayerId]);

  useEffect(() => {
    const joinToViewers = () => {
      dispatch(removeUserIdFromEvery(userId));
      dispatch(setUserToViewers(userId));

      sendUpdatedMember({
        userId, gameId, event: ChessGameEvent.VIEWERS,
      });
    };
    const updateWebsocketState = (state: ChessGameState) => {
      dispatch(setGameState(state));
    };
    const updateWebsocketViewers = (viewersData: ChessGameViewers) => {
      dispatch(setViewerFromWebsocket(viewersData));
    };
    const updateWebsocketPlayer = (playerData: ChessGamePlayer) => {
      dispatch(setPlayerFromWebsocket(playerData));
    };
    const updateChessProcess = (process: ChessGameProcess) => {
      dispatch(setGameProcess(process));
    };

    const updateWebsocketMember = (memberData: ChessGameMember) => {
      dispatch(setMemberFromWebsocket(memberData));
    };

    const closeTabHandler = () => {
      sendUpdatedMember({ userId, gameId, event: ChessGameEvent.LEAVE_ROOM });
      socket.disconnectUserFromGameRoom();
      socket.closeConnection();
    };

    socket.connectToServer();
    socket.onConnect(() => {
      socket.connectUserToGameRoom();
      socket.registerOnChessGameEvent(updateWebsocketState);
      socket.registerOnChessGameProcess(updateChessProcess);
      socket.registerOnChessGameViewers(updateWebsocketViewers);
      socket.registerOnChessGamePlayer(updateWebsocketPlayer);
      socket.registerOnChessGameMember(updateWebsocketMember);
      joinToViewers();
    });

    window.addEventListener('beforeunload', closeTabHandler);

    return () => {
      sendUpdatedMember({ userId, gameId, event: ChessGameEvent.LEAVE_ROOM });
      socket.closeConnection();
      window.removeEventListener('beforeunload', closeTabHandler);
    };
  }, []);

  const updateChessState = (updatedChessState: ChessGameState, currentPlayer: Colors) => {
    socket.sendUpdatedChessState(updatedChessState);
    sendUpdatedRoom({
      gameId, state: updatedChessState, whitePlayerId, blackPlayerId, currentPlayer, viewersId, gameProcess,
    });
  };

  const pauseGame = () => {
    dispatch(setGameProcess(ChessGameProcess.PAUSED));
    socket.sendUpdatedChessProcess(ChessGameProcess.PAUSED);
  };

  const resumeGame = () => {
    dispatch(setGameProcess(ChessGameProcess.RESUMED));
    socket.sendUpdatedChessProcess(ChessGameProcess.RESUMED);
  };

  const endGame = () => {
    dispatch(setGameProcess(ChessGameProcess.ENDED));
    socket.sendUpdatedChessProcess(ChessGameProcess.ENDED);
  };

  const startGame = () => {
    dispatch(setGameProcess(ChessGameProcess.STARTED));
    socket.sendUpdatedChessProcess(ChessGameProcess.STARTED);
  };

  const updateWhitePlayer = () => {
    dispatch(removeUserIdFromEvery(userId));
    dispatch(setWhitePlayerId(userId));
    socket.sendViewerEvent({ userId, event: ChessGameMemberEvent.LEAVE });
    socket.sendPlayerEvent({ userId, color: Colors.WHITE, event: ChessGameMemberEvent.JOIN });

    sendUpdatedMember({
      userId, gameId, event: ChessGameEvent.PLAYER, color: Colors.WHITE,
    });
  };

  const updateBlackPlayer = () => {
    dispatch(removeUserIdFromEvery(userId));
    dispatch(setBlackPlayerId(userId));
    socket.sendViewerEvent({ userId, event: ChessGameMemberEvent.LEAVE });
    socket.sendPlayerEvent({ userId, color: Colors.BLACK, event: ChessGameMemberEvent.JOIN });

    sendUpdatedMember({
      userId, gameId, event: ChessGameEvent.PLAYER, color: Colors.BLACK,
    });
  };

  const updateViewers = () => {
    dispatch(removeUserIdFromEvery(userId));
    dispatch(setUserToViewers(userId));
    socket.sendViewerEvent({ userId, event: ChessGameMemberEvent.JOIN });

    sendUpdatedMember({
      userId, gameId, event: ChessGameEvent.VIEWERS,
    });
  };

  return (
    <div>
      {gameProcess === ChessGameProcess.RESUMED && <Button variant="contained" onClick={pauseGame}>Pause game</Button>}
      {gameProcess === ChessGameProcess.PAUSED && <Button variant="contained" onClick={resumeGame}>Resume game</Button>}
      <Button variant="contained" onClick={endGame}>End game</Button>
      <Button variant="contained" onClick={startGame}>Start game</Button>
      {isViewersLoading}
      {isWhitePlayerLoading}
      {isBlackPlayerLoading}
      {`check ${JSON.stringify(checkmateState)}`}
      <Grid container spacing={2} wrap="nowrap">
        <Grid item>
          {blackPlayerId
            ? <PlayerCard color={Colors.BLACK} user={userForBlackPlayer} />
            : <Button variant="contained" onClick={updateBlackPlayer}>Join black</Button> }
          <EatenFiguresPanel figuresList={eatenFigures} />
          {whitePlayerId
            ? <PlayerCard color={Colors.WHITE} user={userForWhitePlayer} />
            : <Button variant="contained" onClick={updateWhitePlayer}>Join white</Button> }
        </Grid>
        <Grid item>
          <Grid container>
            {checkmateState.isCheck && (
              <Grid item>
                Check
              </Grid>
            )}
            <Grid item>
              <BoardComponent
                currentPlayerPosition={currentPlayerPosition}
                chessGameProcess={gameProcess}
                updateChessState={updateChessState}
                setEatenFigures={setEatenFigures}
                setCheckmateState={setCheckmateState}
              />
            </Grid>
            {checkmateState.isCheckmate && (
              <Grid item>
                Checkmate
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={updateViewers}>Join viewers</Button>
          <ViewersPanel viewers={viewersForViewersPanel} />
        </Grid>
      </Grid>
    </div>
  );
}

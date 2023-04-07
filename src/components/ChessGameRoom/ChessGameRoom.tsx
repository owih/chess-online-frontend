import * as React from 'react';
import { useEffect, useMemo } from 'react';
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
  setGameState, setPlayerFromWebsocket,
  setUserToViewers, setViewerFromWebsocket,
  setWhitePlayerId,
} from '../../store/reducers/ChessGameRoomSlice';
import PlayerCard from '../PlayerCard/PlayerCard';
import { useGetManyUsersQuery, useGetPlayerQuery } from '../../services/userService';
import Colors from '../../models/chess/Colors';
import ChessGameViewers from '../../types/chess/chessGameViewers';
import ChessGameMemberEvent from '../../types/chess/chessGameMemberEvent';
import { removeUserFromEvery } from '../../store/reducers/ChessGameMembers';
import ChessGamePlayer from '../../types/chess/chessGamePlayer';
import { useSendUpdatedRoomMutation } from '../../services/chessService';

type Props = {
  gameId: string;
  userId: number;
};

export default function ChessGameRoom({ gameId, userId }: Props) {
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
  const [sandUpdatedRoom] = useSendUpdatedRoomMutation();

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

  useEffect(() => {
    const joinToViewers = () => {
      console.log(viewersId, ' viewersId');
      dispatch(setUserToViewers(userId));

      // sandUpdatedRoom({
      //   gameId, whitePlayerId, blackPlayerId, viewersId: [...viewersId, userId], gameProcess,
      // });
    };
    const updateWebsocketState = (state: ChessGameState) => {
      dispatch(setGameState(state));
    };
    const updateWebsocketViewers = (viewersData: ChessGameViewers) => {
      console.log(viewersData, ' viewers data');
      dispatch(setViewerFromWebsocket(viewersData));
    };
    const updateWebsocketPlayer = (playerData: ChessGamePlayer) => {
      console.log(playerData, ' players data');
      dispatch(setPlayerFromWebsocket(playerData));
    };
    const updateChessProcess = (process: ChessGameProcess) => {
      console.log(process, ' update process');
      dispatch(setGameProcess(process));
    };

    socket.connectToServer();
    socket.onConnect(() => {
      console.log('on connect ');
      socket.connectUserToGameRoom();
      socket.registerOnChessGameEvent(updateWebsocketState);
      socket.registerOnChessGameProcess(updateChessProcess);
      socket.registerOnChessGameViewers(updateWebsocketViewers);
      socket.registerOnChessGamePlayer(updateWebsocketPlayer);
      joinToViewers();
    });

    return () => {
      socket.closeConnection();
    };
  }, []);

  useEffect(() => {
    console.log(gameProcess);
  }, [gameProcess]);

  const updateChessState = (updatedChessState: ChessGameState, currentPlayer: Colors) => {
    socket.sendUpdatedChessState(updatedChessState);
    sandUpdatedRoom({
      gameId, state: updatedChessState, whitePlayerId, blackPlayerId, currentPlayer, viewersId, gameProcess,
    });
  };

  const pauseGame = () => {
    dispatch(setGameProcess(ChessGameProcess.PAUSED));
    socket.sendUpdatedChessProcess(ChessGameProcess.PAUSED);
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
    console.log(removeUserFromEvery);
    dispatch(removeUserIdFromEvery(userId));
    dispatch(setWhitePlayerId(userId));
    socket.sendLeaveViewer({ userId, event: ChessGameMemberEvent.LEAVE });
    socket.sendPlayerEvent({ userId, color: Colors.WHITE, event: ChessGameMemberEvent.JOIN });

    sandUpdatedRoom({
      gameId, whitePlayerId, blackPlayerId, viewersId, gameProcess,
    });
  };

  const updateBlackPlayer = () => {
    dispatch(removeUserIdFromEvery(userId));
    dispatch(setBlackPlayerId(userId));
    socket.sendLeaveViewer({ userId, event: ChessGameMemberEvent.LEAVE });
    socket.sendPlayerEvent({ userId, color: Colors.BLACK, event: ChessGameMemberEvent.JOIN });

    sandUpdatedRoom({
      gameId, whitePlayerId, blackPlayerId, viewersId, gameProcess,
    });
  };

  const updateViewers = () => {
    dispatch(removeUserIdFromEvery(userId));
    dispatch(setUserToViewers(userId));
    socket.sendJoinViewer({ userId, event: ChessGameMemberEvent.JOIN });

    sandUpdatedRoom({
      gameId, whitePlayerId, blackPlayerId, viewersId, gameProcess,
    });
  };

  return (
    <div>
      <Button variant="contained" onClick={pauseGame}>Pause game</Button>
      <Button variant="contained" onClick={endGame}>End game</Button>
      <Button variant="contained" onClick={startGame}>Start game</Button>
      {isViewersLoading}
      {isWhitePlayerLoading}
      {isBlackPlayerLoading}
      {`viewersId ${viewersId}`}
      {`white ${whitePlayer}`}
      {`black ${blackPlayer}`}
      <Grid container spacing={2} wrap="nowrap">
        <Grid item>
          {blackPlayerId
            ? <PlayerCard color={Colors.BLACK} user={userForBlackPlayer} />
            : <Button variant="contained" onClick={updateBlackPlayer}>Join black</Button> }
          {whitePlayerId
            ? <PlayerCard color={Colors.WHITE} user={userForWhitePlayer} />
            : <Button variant="contained" onClick={updateWhitePlayer}>Join white</Button> }
        </Grid>
        <Grid item>
          <BoardComponent
            chessGameProcess={gameProcess}
            updateChessState={updateChessState}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={updateViewers}>Join viewers</Button>
          <ViewersPanel viewers={viewersForViewersPanel} />
        </Grid>
      </Grid>
    </div>
  );
}

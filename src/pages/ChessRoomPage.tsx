import * as React from 'react';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { useAppSelector } from '../hooks/redux';
import { useStartChessGameQuery } from '../services/chessService';
import AuthorizationForm from '../components/AuthorizationForm/AuthorizationForm';
import ChessGameRoom from '../components/ChessGameRoom/ChessGameRoom';

export default function ChessRoomPage() {
  const userId = useAppSelector((state) => state.user.user?.id);
  const { id: gameId } = useParams();
  const { data, isLoading, isFetching } = useStartChessGameQuery(gameId ?? skipToken);

  if (isLoading || isFetching || !data) {
    return (
      <div>Loading...</div>
    );
  }

  if (!gameId || !userId) {
    return (
      <AuthorizationForm />
    );
  }

  return (
    <div className="container h-full">
      <div className="flex justify-center items-center h-full">
        <ChessGameRoom gameId={gameId} userId={userId} />
      </div>
    </div>
  );
}

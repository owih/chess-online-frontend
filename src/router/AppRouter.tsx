import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ChessRoomPage from '../pages/ChessRoomPage';
import useRouteList from '../composables/useRouteList';
import ChessLobbyPage from '../pages/ChessLobbyPage';
import { useAppSelector } from '../hooks/redux';
import AuthorizationPage from '../pages/AuthorizationPage';

export default function AppRouter() {
  const isUserAuthorized = useAppSelector((state) => state.user.isAuthorized);

  return (
    <Routes>
      <Route path={useRouteList.home.url} element={<HomePage />} />
      <Route
        path={useRouteList.chess.url}
        element={isUserAuthorized
          ? <Navigate to={`${useRouteList.chess.url}/f${new Date().getTime().toString()}`} />
          : <AuthorizationPage />}
      />
      <Route path={`${useRouteList.chess.url}/:id`} element={isUserAuthorized ? <ChessRoomPage /> : <AuthorizationPage />} />
      <Route path={useRouteList.lobby.url} element={<ChessLobbyPage />} />
    </Routes>
  );
}

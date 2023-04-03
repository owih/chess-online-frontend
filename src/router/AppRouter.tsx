import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ChessRoomPage from '../pages/ChessRoomPage';
import useRouteList from '../composables/useRouteList';
import ChessLobbyPage from '../pages/ChessLobbyPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path={useRouteList.home.url} element={<HomePage />} />
      <Route path={useRouteList.chess.url} element={<Navigate to={`${useRouteList.chess.url}/f${new Date().getTime().toString()}`} />} />
      <Route path={`${useRouteList.chess.url}/:id`} element={<ChessRoomPage />} />
      <Route path={useRouteList.lobby.url} element={<ChessLobbyPage />} />
    </Routes>
  );
}

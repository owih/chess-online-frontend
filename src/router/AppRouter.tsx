import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ChessPage from '../pages/ChessPage';
import useRouteList from '../composables/useRouteList';
import ChessLobby from '../pages/ChessLobby';

export default function AppRouter() {
  return (
    <Routes>
      <Route path={useRouteList.home.url} element={<HomePage />} />
      <Route path={useRouteList.chess.url} element={<Navigate to={`${useRouteList.chess.url}/f${new Date().getTime().toString()}`} />} />
      <Route path={`${useRouteList.chess.url}/:id`} element={<ChessPage />} />
      <Route path={useRouteList.lobby.url} element={<ChessLobby />} />
    </Routes>
  );
}

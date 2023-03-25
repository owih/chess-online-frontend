import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ChessPage from '../pages/ChessPage';
import useRouteList from '../composables/useRouteList';

export default function AppRouter() {
  return (
    <Routes>
      <Route path={useRouteList.home.url} element={<HomePage />} />
      <Route path={useRouteList.chess.url} element={<ChessPage />} />
    </Routes>
  );
}

import * as React from 'react';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useRouteList from '../composables/useRouteList';

export default function ChessLobbyPage() {
  const navigate = useNavigate();

  const onClickGoToChessGamePage = () => {
    navigate(useRouteList.chess.url);
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item>
        <Button variant="contained" onClick={onClickGoToChessGamePage}>
          New game
        </Button>
      </Grid>
    </Grid>
  );
}

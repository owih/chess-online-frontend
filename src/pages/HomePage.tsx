import * as React from 'react';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import WelcomePanel from '../components/WelcomePanel/WelcomePanel';
import UserInfoPanel from '../components/UserInfoPanel/UserInfoPanel';
import { toggle } from '../store/reducers/ModalsSlice';
import ModalName from '../types/app/Modal/modalName';
import useRouteList from '../composables/useRouteList';
import ModalAuthorization from '../components/Modals/ModalAuthorization/ModalAuthorization';

export default function HomePage() {
  const isUserAuthorized = useAppSelector((state) => state.user.isAuthorized);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onClickStartGame = () => {
    if (isUserAuthorized) {
      navigate(useRouteList.lobby.url);
    } else {
      dispatch(toggle(ModalName.AUTH));
    }
  };

  return (
    <div>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid lg={6} item>
          <WelcomePanel />
        </Grid>
        <Grid container lg={6} item direction="column" spacing={2}>
          <Grid item>
            {isUserAuthorized
              ? <UserInfoPanel />
              : <ModalAuthorization />}
          </Grid>
          <Grid item>
            <Button type="button" variant="contained" onClick={onClickStartGame}>Start game!</Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

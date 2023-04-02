import * as React from 'react';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import WelcomePanel from '../components/WelcomePanel/WelcomePanel';
import UserInfoPanel from '../components/UserInfoPanel/UserInfoPanel';
import { toggle } from '../store/reducers/ModalsSlice';
import ModalName from '../types/app/Modal/modalName';
import useRouteList from '../composables/useRouteList';

export default function HomePage() {
  const isUserAuthorized = useAppSelector((state) => state.user.isAuthorized);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onClickModal = () => {
    dispatch(toggle(ModalName.AUTH));
  };

  const onClickStartGame = () => {
    if (isUserAuthorized) {
      navigate(useRouteList.lobby.url);
    } else {
      dispatch(toggle(ModalName.AUTH));
    }
  };

  return (
    <div>
      <Grid container>
        <Grid lg={6} item>
          <WelcomePanel />
        </Grid>
        <Grid lg={6} item>
          {isUserAuthorized
            ? <UserInfoPanel />
            : <Button type="button" variant="contained" onClick={onClickModal}>Registration</Button>}
          <Button type="button" variant="contained" onClick={onClickStartGame}>Start game!</Button>
        </Grid>
      </Grid>
    </div>
  );
}

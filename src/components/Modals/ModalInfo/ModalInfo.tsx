import * as React from 'react';
import {
  Box, Divider, IconButton, Typography,
} from '@mui/material';
import HelpCenter from '@mui/icons-material/HelpCenter';
import ModalComponent from '../ModalComponent/ModalComponent';
import ModalName from '../../../types/app/Modal/modalName';
import { useAppDispatch } from '../../../hooks/redux';
import { toggle } from '../../../store/reducers/ModalsSlice';

export default function ModalInfo() {
  const dispatch = useAppDispatch();

  const onClickAuthorization = () => {
    dispatch(toggle(ModalName.INFO));
  };

  return (
    <div>
      <IconButton size="large" color="info" onClick={onClickAuthorization}>
        <HelpCenter />
      </IconButton>
      <ModalComponent modalName={ModalName.AUTH} title="Info">
        <Box>
          <Typography variant="button" display="block" gutterBottom>
            Instructions
          </Typography>
          <Typography variant="body2" gutterBottom>
            To start the game you need to create a lobby, to do this click the &quot;startGame&quot; button or follow the
            link to an existing lobby.
          </Typography>
          <Typography variant="body2">
            To invite a friend to the lobby, just share the link of the current game.
          </Typography>
          <Divider />
          <Typography variant="button" display="block" gutterBottom>
            About project
          </Typography>
          <Typography variant="body2" gutterBottom>
            This is the MVP version of the project for playing chess online.
            At the moment there are many unfinished implementations and improvements,
            such as a list of current games, online players, adding avatars for players, etc.
          </Typography>
          <Typography variant="body2" gutterBottom>
            The project was written to study some technologies and is not a production sample.
          </Typography>
        </Box>
      </ModalComponent>
    </div>
  );
}

import * as React from 'react';
import { Box, Button } from '@mui/material';
import ModalComponent from '../ModalComponent/ModalComponent';
import ModalName from '../../../types/app/Modal/modalName';
import { useAppDispatch } from '../../../hooks/redux';
import { toggle } from '../../../store/reducers/ModalsSlice';
import AuthorizationForm from '../../AuthorizationForm/AuthorizationForm';

export default function ModalAuthorization() {
  const dispatch = useAppDispatch();

  const onClickAuthorization = () => {
    dispatch(toggle(ModalName.AUTH));
  };

  return (
    <div>
      <Button type="button" variant="contained" onClick={onClickAuthorization}>Authorization</Button>
      <ModalComponent modalName={ModalName.AUTH} title="Authorization">
        <Box>
          <AuthorizationForm />
        </Box>
      </ModalComponent>
    </div>
  );
}

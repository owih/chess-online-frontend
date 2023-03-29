import * as React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import ModalComponent from '../ModalComponent/ModalComponent';
import ModalName from '../../../types/app/Modal/modalName';

export default function ModalAuthorization() {
  const [formLogin, setFormLogin] = useState<string>('');

  const onSubmitFormHandler = (e: React.FormEvent):void => {
    e.preventDefault();
    console.log(formLogin);
  };

  return (
    <ModalComponent modalName={ModalName.AUTH} title="Authorization">
      <Box component="form" onSubmit={onSubmitFormHandler}>
        <TextField
          required
          variant="outlined"
          label="Name"
          value={formLogin}
          onChange={(e) => setFormLogin(e.target.value)}
        />
        <Button variant="contained" type="submit">Submit</Button>
      </Box>
    </ModalComponent>
  );
}

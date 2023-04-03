import * as React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import ModalComponent from '../ModalComponent/ModalComponent';
import ModalName from '../../../types/app/Modal/modalName';
import { useCreateUserMutation } from '../../../services/userService';
import { useAppDispatch } from '../../../hooks/redux';
import { toggle } from '../../../store/reducers/ModalsSlice';

export default function ModalAuthorization() {
  const [form, setForm] = useState<{ name: string }>({ name: '' });
  const [authorization, { error, isLoading }] = useCreateUserMutation();
  const dispatch = useAppDispatch();

  const onClickAuthorization = () => {
    dispatch(toggle(ModalName.AUTH));
  };

  const onSubmitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim().length || form.name.trim().length > 15 || form.name.trim().length < 3) {
      return;
    }
    authorization(form.name)
      .then(() => {
        dispatch(toggle(ModalName.AUTH));
      });
  };

  return (
    <div>
      <Button type="button" variant="contained" onClick={onClickAuthorization}>Authorization</Button>
      <ModalComponent modalName={ModalName.AUTH} title="Authorization">
        <Box component="form" onSubmit={onSubmitFormHandler}>
          <TextField
            required
            variant="outlined"
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ name: e.target.value })}
          />
          <Button variant="contained" type="submit">Submit</Button>
          {isLoading && 'loading'}
          {error && 'Something went wrong!'}
        </Box>
      </ModalComponent>
    </div>
  );
}

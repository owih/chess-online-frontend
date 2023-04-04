import * as React from 'react';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useCreateUserMutation } from '../../services/userService';
import { useAppDispatch } from '../../hooks/redux';
import { toggle } from '../../store/reducers/ModalsSlice';
import ModalName from '../../types/app/Modal/modalName';

export default function AuthorizationForm() {
  const [form, setForm] = useState<{ name: string }>({ name: '' });
  const [authorization, { error, isLoading }] = useCreateUserMutation();
  const dispatch = useAppDispatch();

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
    <form onSubmit={onSubmitFormHandler}>
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
    </form>
  );
}

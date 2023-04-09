import * as React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import ModalComponent from '../ModalComponent/ModalComponent';
import { useChangeUserSettingsMutation } from '../../../services/userService';
import useGetUserInfo from '../../../hooks/useGetUserInfo';
import User from '../../../types/user/user';
import { toggle } from '../../../store/reducers/ModalsSlice';
import { useAppDispatch } from '../../../hooks/redux';
import ModalName from '../../../types/app/Modal/modalName';

export default function ModalSettings() {
  const [form, setForm] = useState<User>({
    id: 0,
    name: '',
    img: '',
  });
  const { data, error: getUserError, isLoading: isUserLoading } = useGetUserInfo();
  const [changeUserSettings, { error, isLoading }] = useChangeUserSettingsMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!data) return;
    setForm({
      id: data.id,
      name: data.name,
      img: data.img,
    });
  }, [data]);

  const onSubmitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim().length) {
      return;
    }
    changeUserSettings({ ...form });
  };

  const onClickSettings = () => {
    dispatch(toggle(ModalName.SETTINGS));
  };

  return (
    <div>
      <Button type="button" variant="contained" onClick={onClickSettings}>Settings</Button>
      <ModalComponent modalName={ModalName.SETTINGS} title="Authorization">
        <Box component="form" onSubmit={onSubmitFormHandler}>
          {data && JSON.stringify(data)}
          <TextField
            required
            variant="outlined"
            label="Name"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          />
          <Button variant="contained" type="submit">Submit</Button>
          {(isLoading || isUserLoading) && 'loading'}
          {(error || getUserError) && 'Something went wrong!'}
        </Box>
      </ModalComponent>
    </div>
  );
}

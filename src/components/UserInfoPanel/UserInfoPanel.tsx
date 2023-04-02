import * as React from 'react';
import { Button } from '@mui/material';
import { useAppDispatch } from '../../hooks/redux';
import { toggle } from '../../store/reducers/ModalsSlice';
import modalName from '../../types/app/Modal/modalName';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';

export default function UserInfoPanel() {
  const { data, error, isLoading } = useGetUserInfo();

  const dispatch = useAppDispatch();

  const onClickSettings = () => {
    dispatch(toggle(modalName.SETTINGS));
  };

  return (
    <div>
      {error && 'Something went wrong'}
      {isLoading && 'Loading'}
      <div>
        {data && data.id}
      </div>
      <div>
        {data && data.name}
      </div>
      <div>
        Photo (future)
      </div>
      <Button type="button" variant="contained" onClick={onClickSettings}>Settings</Button>
    </div>
  );
}

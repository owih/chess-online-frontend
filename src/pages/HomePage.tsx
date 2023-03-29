import * as React from 'react';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { toggle } from '../store/reducers/ModalsSlice';

export default function HomePage() {
  const store = useAppSelector((state) => state);
  console.log(store);
  const dispatch = useAppDispatch();
  const onClickModal = () => {
    dispatch(toggle());
  };

  return (
    <div>
      <Button type="button" onClick={onClickModal}>modals</Button>
    </div>
  );
}

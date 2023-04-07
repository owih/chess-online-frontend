import { skipToken } from '@reduxjs/toolkit/query';
import { useAppSelector } from './redux';
import { useGetUserQuery } from '../services/userService';

export default () => {
  const userId = useAppSelector((state) => state.user.user?.id);
  console.log(userId);

  return useGetUserQuery(userId ?? skipToken);
};

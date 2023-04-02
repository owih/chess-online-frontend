import { skipToken } from '@reduxjs/toolkit/query';
import { useAppSelector } from './redux';
import { useGetUserQuery } from '../services/userService';

export const useGetUserInfo = () => {
  const userId = useAppSelector((state) => state.user.id);
  console.log(userId);

  return useGetUserQuery(userId ?? skipToken);
};

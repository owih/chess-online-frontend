import React from 'react';
import AppRouter from './router/AppRouter';
import DefaultLayout from './layouts/DefaultLayout';
import useGetUserInfo from './hooks/useGetUserInfo';
import { useAppSelector } from './hooks/redux';

function App() {
  const isFirstUserFetching = useAppSelector((state) => state.user.isFirstLoading);
  const { isLoading } = useGetUserInfo();
  console.log('app');

  return (
    <div className="App">
      <DefaultLayout isLoading={isLoading && isFirstUserFetching}>
        <AppRouter />
      </DefaultLayout>
    </div>
  );
}

export default App;

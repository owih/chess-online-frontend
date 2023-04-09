import React from 'react';
import { Container } from '@mui/material';
import Loading from '../components/Loading/Loading';

interface Props {
  isLoading: boolean,
  children: React.ReactNode
}

function DefaultLayout({ isLoading, children }: Props) {
  if (isLoading) {
    return (
      <Loading />
    );
  }
  return (
    <div className="wrapper">
      <Container>
        {children}
      </Container>
    </div>
  );
}

export default DefaultLayout;

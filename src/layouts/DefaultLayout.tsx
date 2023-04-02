import React from 'react';
import { Container } from '@mui/material';
import ModalAuthorization from '../components/Modals/ModalAuthorization/ModalAuthorization';
import Loading from '../components/Loading/Loading';
import ModalSettings from '../components/Modals/ModalSettings/ModalSettings';

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
    <div>
      <Container>
        {children}
      </Container>
      <ModalAuthorization />
      <ModalSettings />
    </div>
  );
}

export default DefaultLayout;

import React from 'react';
import { Container } from '@mui/material';
import ModalAuthorization from '../components/Modals/ModalAuthorization/ModalAuthorization';

interface Props {
  children: React.ReactNode
}

function DefaultLayout({ children }: Props) {
  return (
    <div>
      <Container>
        {children}
      </Container>
      <ModalAuthorization />
    </div>
  );
}

export default DefaultLayout;

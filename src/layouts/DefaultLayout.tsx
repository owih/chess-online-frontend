import React from 'react';
import { Container } from '@mui/material';
import { CSSTransition } from 'react-transition-group';
import InfoPanel from '../components/InfoPanel/InfoPanel';
import Loading from '../components/Loading/Loading';

interface Props {
  isLoading: boolean,
  children: React.ReactNode
}

function DefaultLayout({ isLoading, children }: Props) {
  return (
    <div className="wrapper">
      <InfoPanel />
      <CSSTransition in={isLoading} classNames="fade" timeout={1200} unmountOnExit>
        <Loading />
      </CSSTransition>
      {!isLoading && (
        <Container>
          {children}
        </Container>
      )}
    </div>
  );
}

export default DefaultLayout;

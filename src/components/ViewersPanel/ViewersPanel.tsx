import * as React from 'react';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import User from '../../types/user/user';
import ViewerCard from '../ViewerCard/ViewerCard';

interface Props {
  viewers: User[];
}

export default function ViewersPanel({ viewers }: Props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Grid container spacing={2} direction={isSmallScreen ? 'row' : 'column'}>
      {viewers.map((viewer) => (
        <Grid item key={viewer.id}>
          <ViewerCard viewer={viewer} />
        </Grid>
      ))}
    </Grid>
  );
}

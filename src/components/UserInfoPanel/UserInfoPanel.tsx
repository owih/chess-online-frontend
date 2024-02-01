import * as React from 'react';
import { Card, CardContent, Grid } from '@mui/material';
import useGetUserInfo from '../../hooks/useGetUserInfo';
import ModalSettings from '../Modals/ModalSettings/ModalSettings';

export default function UserInfoPanel() {
  const { data, error, isLoading } = useGetUserInfo();

  return (
    <Card variant="outlined" className="w-auto">
      <CardContent>
        {error && 'Something went wrong'}
        {isLoading && 'Loading'}
        <Grid container spacing={2} direction="column">
          <Grid item>
            {error && 'Something went wrong'}
            {isLoading && 'Loading'}
            <div>
              <span className="mr-1">
                id:
              </span>
              {data && data.id}
            </div>
            <div>
              <span className="mr-1">
                name:
              </span>
              {data && data.name}
            </div>
            <div className="hidden">
              Photo (future)
            </div>
          </Grid>
          <Grid item>
            <ModalSettings />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

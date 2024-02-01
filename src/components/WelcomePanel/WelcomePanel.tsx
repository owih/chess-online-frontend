import * as React from 'react';
import { Avatar } from '@mui/material';
import image from '../../assets/images/chess-image.svg';

export default function WelcomePanel() {
  return (
    <div>
      <div>
        <Avatar
          alt="main-welcome-image"
          src={image}
          variant="square"
          sx={{
            width: 256,
            height: 256,
          }}
        />
      </div>
    </div>
  );
}

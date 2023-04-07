import * as React from 'react';
import { Avatar } from '@mui/material';
import User from '../../types/user/user';
import image from '../../assets/images/no-image.png';

type Props = {
  viewer: User,
};

export default function ViewerCard({ viewer }: Props) {
  return (
    <div>
      <div>
        {viewer.name}
      </div>
      <Avatar
        alt={String(viewer.id)}
        src={viewer.img ? `${process.env.REACT_APP_BACKEND_BASE_URL}${viewer.img}` : image}
        sx={{ width: 56, height: 56 }}
      />
    </div>
  );
}

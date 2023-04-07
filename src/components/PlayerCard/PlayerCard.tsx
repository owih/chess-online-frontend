import * as React from 'react';
import { Avatar } from '@mui/material';
import User from '../../types/user/user';
import Colors from '../../models/chess/Colors';
import image from '../../assets/images/no-image.png';

type Props = {
  user: User | null
  color: Colors;
};

export default function PlayerCard({ user, color }: Props) {
  return (
    <div>
      user
      {user && (
      <div>
        {color}
        <div>
          {user.name}
        </div>
        <div>
          <Avatar
            alt={String(user.id)}
            src={user.img ? `${process.env.REACT_APP_BACKEND_BASE_URL}${user.img}` : image}
            sx={{ width: 56, height: 56 }}
          />
        </div>
      </div>
      )}
    </div>
  );
}

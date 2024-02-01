import * as React from 'react';
import { Avatar } from '@mui/material';
import User from '../../types/user/user';
import image from '../../assets/images/no-image.png';

type Props = {
  user: User | null
};

export default function PlayerCard({ user }: Props) {
  return (
    <div>
      {user && (
        <div>
          <div>
            <Avatar
              alt={String(user.id)}
              src={user.img ? `${process.env.REACT_APP_BACKEND_BASE_URL}${user.img}` : image}
              sx={{
                width: 56,
                height: 56,
              }}
            />
          </div>
          <div>
            {user.name}
          </div>
        </div>
      )}
    </div>
  );
}

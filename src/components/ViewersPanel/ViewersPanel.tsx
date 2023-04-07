import * as React from 'react';
import User from '../../types/user/user';
import ViewerCard from '../ViewerCard/ViewerCard';

interface Props {
  viewers: User[];
}

export default function ViewersPanel({ viewers }: Props) {
  return (
    <div>
      {viewers.map((viewer) => <ViewerCard key={viewer.id} viewer={viewer} />)}
    </div>
  );
}

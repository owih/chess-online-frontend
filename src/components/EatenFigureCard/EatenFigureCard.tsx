import * as React from 'react';
import { Avatar } from '@mui/material';
import ChessGameEatenFigure from '../../types/chess/chessGameEatenFigure';

type Props = {
  figure: ChessGameEatenFigure,
};

export default function EatenFigureCard({ figure }: Props) {
  return (
    <div>
      <Avatar
        alt={`${figure.name}-${figure.id}`}
        src={figure.img}
        sx={{
          width: 24,
          height: 24,
        }}
      />
    </div>
  );
}

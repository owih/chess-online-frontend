import * as React from 'react';
import ChessGameEatenFigure from '../../types/chess/chessGameEatenFigure';

type Props = {
  figure: ChessGameEatenFigure,
};

export default function EatenFigureCard({ figure }: Props) {
  return (
    <div>
      {figure.name}
    </div>
  );
}

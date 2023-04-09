import * as React from 'react';
import EatenFigureCard from '../EatenFigureCard/EatenFigureCard';
import ChessGameEatenFigure from '../../types/chess/chessGameEatenFigure';

type Props = {
  figuresList: ChessGameEatenFigure[],
};

export default function EatenFiguresPanel({ figuresList }: Props) {
  return (
    <div>
      {figuresList.map((figure) => <EatenFigureCard key={figure.id} figure={figure} />)}
    </div>
  );
}

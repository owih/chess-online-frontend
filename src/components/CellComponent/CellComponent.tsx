import * as React from 'react';
import { useMemo } from 'react';
import Cell from '../../models/chess/Cell';
import Colors from '../../models/chess/Colors';
import AvailableComponent from '../AvailableComponent/AvailableComponent';

type CellProps = {
  cell: Cell;
  isSelected: boolean;
  click: (cell: Cell) => React.MouseEventHandler<HTMLButtonElement>;
};

export default function CellComponent({ cell, isSelected, click }: CellProps) {
  const cellColorClass = cell.color === Colors.WHITE ? 'cell_white' : 'cell_black';
  const cellSelectedClass = useMemo(() => (isSelected ? 'cell_selected' : ''), [isSelected]);
  const cellAvailable = cell.available && cell.figure ? 'cell_target' : '';

  const onClickCell = () => {
    click(cell);
  };

  return (
    <button
      className={['cell', cellColorClass, cellSelectedClass, cellAvailable].join(' ')}
      onClick={onClickCell}
      type="button"
    >
      {!cell.figure && cell.available && <AvailableComponent />}
      {cell.figure?.logo && <img className="cell__img" src={cell.figure.logo} alt={cell.figure.name} />}
    </button>
  );
}

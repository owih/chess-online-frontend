import * as React from 'react';
import styles from './CellComponent.module.scss';
import Cell from '../../models/chess/Cell';
import Colors from '../../models/chess/Colors';
import AvailableComponent from '../AvailableComponent/AvailableComponent';

type CellProps = {
  cell: Cell;
  isSelected: boolean;
  click: (cell: Cell) => React.MouseEventHandler<HTMLButtonElement>;
};

export default function CellComponent({ cell, isSelected, click }: CellProps) {
  const cellColorClass = cell.color === Colors.WHITE ? styles.cell_white : styles.cell_black;

  const onClickCell = () => {
    click(cell);
  };

  return (
    <button
      className={[styles.cell, cellColorClass, isSelected ? styles.cell_selected : '', cell.available && cell.figure ? styles.cell_target : ''].join(' ')}
      onClick={onClickCell}
      type="button"
    >
      {!cell.figure && cell.available && <AvailableComponent />}
      {cell.figure?.logo && <img src={cell.figure.logo} alt={cell.figure.name} />}
    </button>
  );
}

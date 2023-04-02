import * as React from 'react';
import { useEffect, useState } from 'react';
import Board from '../../models/chess/Board';
import CellComponent from '../CellComponent/CellComponent';
import Cell from '../../models/chess/Cell';
import Player from '../../models/chess/Player';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

export default function BoardComponent({
  board, setBoard, swapPlayer, currentPlayer,
}: BoardProps) {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const updateBoard = () => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  };

  const highlightTargetCells = () => {
    board.highlightTargetCells(selectedCell);
    updateBoard();
  };

  const onClickCell = (cell: Cell): any => {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      console.log(selectedCell.figure);
      selectedCell.moveFigure(cell);
      setSelectedCell(null);
      updateBoard();
      swapPlayer();
    } else if (cell === selectedCell) {
      setSelectedCell(null);
    } else if (cell.figure?.color === currentPlayer?.color) {
      console.log('set selected cell');
      setSelectedCell(cell);
    }
  };

  useEffect(() => {
    highlightTargetCells();
  }, [selectedCell]);

  return (
    <div className="board">
      {board.cells.map((item, index) => (
        <React.Fragment key={index}>
          {item.map((cell: Cell) => (
            <CellComponent
              click={onClickCell}
              cell={cell}
              isSelected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
              key={cell.id}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

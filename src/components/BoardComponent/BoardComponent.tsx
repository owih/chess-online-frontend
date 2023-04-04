import * as React from 'react';
import { useEffect, useState } from 'react';
import Board from '../../models/chess/Board';
import CellComponent from '../CellComponent/CellComponent';
import Cell from '../../models/chess/Cell';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setCurrentPlayer, setState } from '../../store/reducers/ChessGameRoomSlice';
import Colors from '../../models/chess/Colors';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
}

export default function BoardComponent({
  board, setBoard,
}: BoardProps) {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const currentPlayer = useAppSelector((state) => state.chessGameRoom.currentPlayer);

  const dispatch = useAppDispatch();

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
      selectedCell.moveFigure(cell);
      setSelectedCell(null);
      updateBoard();
      dispatch(setCurrentPlayer(Colors.WHITE));
      dispatch(setState(JSON.stringify(board.getBoardState())));
    } else if (cell === selectedCell) {
      setSelectedCell(null);
    } else if (cell.figure?.color === currentPlayer) {
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

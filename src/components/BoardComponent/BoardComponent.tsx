import * as React from 'react';
import { useEffect, useState } from 'react';
import Board from '../../models/chess/Board';
import CellComponent from '../CellComponent/CellComponent';
import Cell from '../../models/chess/Cell';
import { useAppSelector } from '../../hooks/redux';
import ChessGameState from '../../types/chess/chessGameState';
import ChessGameProcess from '../../types/chess/chessGameProcess';
import Colors from '../../models/chess/Colors';

interface BoardProps {
  updateChessState: (updatedChessState: ChessGameState, currentPlayer: Colors) => void;
  chessGameProcess: ChessGameProcess;
}

export default function BoardComponent({ updateChessState, chessGameProcess }: BoardProps) {
  const [board, setBoard] = useState<Board>(new Board());
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const chessGameState = useAppSelector((state) => state.chessGameRoom.state);

  useEffect(() => {
    console.log(chessGameProcess);
  }, [chessGameProcess]);

  useEffect(() => {
    if (!chessGameState || !board) {
      return;
    }

    if (!board.cells.length) {
      const newBoard = new Board();
      newBoard.initCells();
      newBoard.addFigures();
      newBoard.applyStateFromServer(chessGameState);
      setBoard(newBoard);
      return;
    }

    console.log(chessGameState, ' state update');
    console.log(board);
    board.applyStateFromServer(chessGameState);
    setBoard(board.getCopyBoard());
  }, [chessGameState]);

  useEffect(() => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    console.log('INITED AND LOADED FIRST');
    console.log(board.getBoardState());
  }, []);

  const updateBoardModel = () => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  };

  console.log('HIGHTLIGHT');

  const updateCellState = (cell: Cell | null) => {
    board.highlightTargetCells(cell);
    setSelectedCell(cell);
  };

  const onClickCell = (cell: Cell): any => {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      updateCellState(null);
      board.toggleCurrentPlayer();
      updateChessState(board.getBoardState(), board.currentPlayer);
      updateBoardModel();
      console.log(board);
      return;
    }

    if (cell === selectedCell) {
      updateCellState(null);
      return;
    }

    if (cell.figure?.color === board.currentPlayer) {
      console.log(cell.figure.color);
      console.log(board.currentPlayer);
      console.log('logger');
      updateCellState(cell);
    }
  };

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

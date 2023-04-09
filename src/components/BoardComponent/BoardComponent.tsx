import * as React from 'react';
import { useEffect, useState } from 'react';
import Board from '../../models/chess/Board';
import CellComponent from '../CellComponent/CellComponent';
import Cell from '../../models/chess/Cell';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import ChessGameState from '../../types/chess/chessGameState';
import ChessGameProcess from '../../types/chess/chessGameProcess';
import Colors from '../../models/chess/Colors';
import ChessGameEatenFigure from '../../types/chess/chessGameEatenFigure';
import { setGameProcess } from '../../store/reducers/ChessGameRoomSlice';
import ChessGameCheck from '../../types/chess/chessGameCheck';

interface BoardProps {
  updateChessState: (updatedChessState: ChessGameState, currentPlayer: Colors) => void;
  setEatenFigures: (figures: ChessGameEatenFigure[]) => void;
  setCheckmateState: (checkState: ChessGameCheck) => void;
  chessGameProcess: ChessGameProcess;
  currentPlayerPosition: Colors | null;
}

export default function BoardComponent({
  updateChessState, chessGameProcess, currentPlayerPosition, setEatenFigures, setCheckmateState,
}: BoardProps) {
  const [board, setBoard] = useState<Board>(new Board());
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const chessGameState = useAppSelector((state) => state.chessGameRoom.state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (chessGameProcess === ChessGameProcess.STARTED) {
      const newBoard = new Board();
      newBoard.initCells();
      newBoard.addFigures();
      setBoard(newBoard);
      updateChessState(newBoard.getBoardState(), newBoard.currentPlayer);
      setEatenFigures(newBoard.eatenFigures);
      dispatch(setGameProcess(ChessGameProcess.RESUMED));
    }
  }, [chessGameProcess]);

  useEffect(() => {
    if (!chessGameState) {
      return;
    }

    if (!board.cells.length) {
      const newBoard = new Board();
      newBoard.initCells();
      newBoard.addFigures();
      newBoard.applyStateFromServer(chessGameState);
      setBoard(newBoard);
      setEatenFigures(chessGameState.eatenFigures);
      setCheckmateState({ ...chessGameState.isCheckmateState });
      return;
    }

    board.applyStateFromServer(chessGameState);
    setBoard(board.getCopyBoard());
    setEatenFigures(chessGameState.eatenFigures);
    setCheckmateState({ ...chessGameState.isCheckmateState });
  }, [chessGameState]);

  useEffect(() => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }, []);

  const updateBoardModel = () => {
    if (!board) {
      return;
    }
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  };

  const updateCellState = (cell: Cell | null) => {
    if (!board) {
      return;
    }
    board.highlightTargetCells(cell);
    setSelectedCell(cell);
  };

  const onClickCell = (cell: Cell): any => {
    if (selectedCell && selectedCell.figure && selectedCell !== cell && selectedCell.figure.canMove(cell) && board) {
      selectedCell.moveFigure(cell, board);
      board.toggleCurrentPlayer();
      updateChessState(board.getBoardState(), board.currentPlayer);
      setEatenFigures(board.eatenFigures);
      setCheckmateState({ ...board.isCheckmateState });
      updateCellState(null);
      updateBoardModel();
      return;
    }

    if (cell === selectedCell) {
      updateCellState(null);
      return;
    }

    if (board && cell.figure?.color === board.currentPlayer && board.currentPlayer === currentPlayerPosition) {
      updateCellState(cell);
    }
  };

  return (
    <div className={['board',
      chessGameProcess === ChessGameProcess.PAUSED ? 'paused' : '',
      chessGameProcess === ChessGameProcess.ENDED ? 'ended' : ''].join(' ')}
    >
      {board && board.cells.map((item, index) => (
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

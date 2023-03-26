import * as React from 'react';
import { useEffect, useState } from 'react';
import BoardComponent from '../components/BoardComponent/BoardComponent';
import Board from '../models/chess/Board';

export default function ChessPage() {
  const [board, setBoard] = useState<Board>(new Board());

  const restart = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  };

  console.count('page init');

  useEffect(() => {
    restart();
  }, []);

  return (
    <div className="container h-full">
      <div className="flex justify-center items-center h-full">
        <BoardComponent board={board} setBoard={setBoard} />
      </div>
    </div>
  );
}

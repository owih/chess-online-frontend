import * as React from 'react';
import { useEffect, useState } from 'react';
import BoardComponent from '../components/BoardComponent/BoardComponent';
import Board from '../models/chess/Board';
import Colors from '../models/chess/Colors';
import Player from '../models/chess/Player';

export default function ChessPage() {
  const [board, setBoard] = useState<Board>(new Board());
  const [whitePlayer, setWhitePlayer] = useState<Player>(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState<Player>(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  console.log(setWhitePlayer);
  console.log(setBlackPlayer);

  const restart = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  };

  const swapPlayer = () => {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  };

  useEffect(() => {
    restart();
  }, []);

  return (
    <div className="container h-full">
      <div className="flex justify-center items-center h-full">
        <button type="button" onClick={restart}>Restart</button>
        <BoardComponent
          currentPlayer={currentPlayer}
          swapPlayer={swapPlayer}
          board={board}
          setBoard={setBoard}
        />
      </div>
    </div>
  );
}

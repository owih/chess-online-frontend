import * as React from 'react';
import BoardComponent from '../components/BoardComponent/BoardComponent';

export default function ChessPage() {
  return (
    <div className="container h-full">
      <div className="flex justify-center items-center h-full">
        <BoardComponent />
      </div>
    </div>
  );
}

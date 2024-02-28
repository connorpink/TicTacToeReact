import "./App.css";
import { useState } from 'react'

function Square({ value, onSquareClick, winClass}) {
  
  return (
    <button className={`square ${winClass}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay}) {
  function handleClick(i) {
    const winnerInfo = calculateWinner(squares)
    if (winnerInfo.winner || squares[i]) {
      return
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] ='X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winnerInfo = calculateWinner(squares)
  const winner = winnerInfo.winner;
  const winningLine = winnerInfo.line;

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
    <div className="status">{status}</div>
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)} winClass={winningLine.includes(0) ? "win" : ""} />
      <Square value={squares[1]} onSquareClick={() => handleClick(1)} winClass={winningLine.includes(1) ? "win" : ""} />
      <Square value={squares[2]} onSquareClick={() => handleClick(2)} winClass={winningLine.includes(2) ? "win" : ""} />
    </div>
    <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)} winClass={winningLine.includes(3) ? "win" : ""} />
      <Square value={squares[4]} onSquareClick={() => handleClick(4)} winClass={winningLine.includes(4) ? "win" : ""} />
      <Square value={squares[5]} onSquareClick={() => handleClick(5)} winClass={winningLine.includes(5) ? "win" : ""} />
    </div>
    <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)} winClass={winningLine.includes(6) ? "win" : ""} />
      <Square value={squares[7]} onSquareClick={() => handleClick(7)} winClass={winningLine.includes(7) ? "win" : ""} />
      <Square value={squares[8]} onSquareClick={() => handleClick(8)} winClass={winningLine.includes(8) ? "win" : ""} />
    </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove,setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length -1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return {winner:squares[a], line: lines[i]};
    }
  }
  return {winner:null, line: []};
}



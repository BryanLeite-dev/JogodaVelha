import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './GameBoard.css';

function GameBoard({ players, gameMode, onBackToStart }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const handleClick = (index) => {
    if (winner || board[index]) return;

    const currentSymbol = gameMode === 'two' ? (isPlayerTurn ? 'X' : 'O') : players.playerSymbol;
    const newBoard = [...board];
    newBoard[index] = currentSymbol;
    setBoard(newBoard);
    
    checkWinner(newBoard);

    if (gameMode === 'two') {
      setIsPlayerTurn(!isPlayerTurn);
    } else {
      setIsPlayerTurn(false);
    }
  };

  const makeMachineMove = useCallback(() => {
    const emptySquares = board.map((cell, idx) => (cell === null ? idx : null)).filter((i) => i !== null);

    if (emptySquares.length > 0) {
      const randomMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
      const newBoard = [...board];
      newBoard[randomMove] = players.machineSymbol;
      setBoard(newBoard);
      setIsPlayerTurn(true);
      checkWinner(newBoard);
    }
  }, [board, players.machineSymbol]);

  useEffect(() => {
    if (gameMode === 'playSingle' && !isPlayerTurn && !winner) {
      const timer = setTimeout(makeMachineMove, 50);
      return () => clearTimeout(timer);
    }
  }, [board, isPlayerTurn, winner, gameMode, makeMachineMove]);

  const checkWinner = (board) => {
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

    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setScores((prevScores) => ({ ...prevScores, [board[a]]: prevScores[board[a]] + 1 }));
        return;
      }
    }

    if (!board.includes(null)) {
      setWinner('Draw');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsPlayerTurn(true); 
  };

  return (
    <div className="game-board">
      <button onClick={onBackToStart}>Voltar</button>
      <h2>Jogo da Velha</h2>
      <div className="scores">
        <p>Pontuação {players.player1}: {scores.X}</p>
        <p>Pontuação {players.player2}: {scores.O}</p>
      </div>
      <div className="board">
        {board.map((cell, index) => (
          <div key={index} className="cell" onClick={() => handleClick(index)}>
            {cell}
          </div>
        ))}
      </div>
      {winner && (
        <div className="winner">
          {winner === 'Draw' ? 'Empate!' : `Vitória de ${winner === 'X' ? players.player1 : players.player2}!`}
        </div>
      )}
      <button onClick={resetGame}>Recomeçar Jogo</button>
    </div>
  );
}

GameBoard.propTypes = {
  players: PropTypes.shape({
    player1: PropTypes.string.isRequired,
    player2: PropTypes.string.isRequired,
    playerSymbol: PropTypes.string,
    machineSymbol: PropTypes.string,
  }).isRequired,
  gameMode: PropTypes.string.isRequired,
  onBackToStart: PropTypes.func.isRequired,
};

export default GameBoard;

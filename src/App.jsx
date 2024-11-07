import { useState } from 'react';
import GameBoard from './GameBoard';
import './App.css';

function App() {
  const [gameMode, setGameMode] = useState(null);
  const [playerName1, setPlayerName1] = useState('');
  const [playerName2, setPlayerName2] = useState('');
  const [playerSymbol, setPlayerSymbol] = useState('X');
  const [players, setPlayers] = useState({ player1: '', player2: 'Máquina' });

  const handleSinglePlayerClick = () => {
    setGameMode('single');
  };

  const handleTwoPlayerClick = () => {
    setGameMode('mult');
  };

  const handleStartSinglePlayerGame = () => {
    const machineSymbol = playerSymbol === 'X' ? 'O' : 'X';
    setPlayers({ player1: playerName1, player2: 'Máquina', playerSymbol, machineSymbol });
    setGameMode('playSingle');
  };

  const handleStartMultPlayerGame = () => {
    setPlayers({ player1: playerName1, player2: playerName2, playerSymbol });
    setGameMode('two');
  };

  const handleBackToStart = () => {
    setGameMode(null);
    setPlayerName1('');
    setPlayerName2('');
    setPlayerSymbol('X');
  };

  return (
    <div className="app">
      {gameMode === null && (
        <div className="start-screen">
          <h1>Jogo da Velha</h1>
          <br></br>
          <p>Escolha o modo de jogo:</p>
          <div className="jogadores">
            <div className="flex">

              <button className="jogadores-flex" onClick={handleSinglePlayerClick}>1 jogador</button>
              <button className="jogadores-flex" onClick={handleTwoPlayerClick}>2 jogadores</button>
            </div>
          </div>
        </div>
      )}

      {gameMode === 'single' && (
        <div className="name-input-screen">
          <h1>Jogo da Velha</h1>
          <br></br>
          <div className="bloco-jogadores">
            <div className="jogador">
              <label>
                Nome do Jogador:
                <input
                  type="text"
                  value={playerName1}
                  onChange={(e) => setPlayerName1(e.target.value)}
                  placeholder="Digite o nome"
                />
              </label>
              <div>
                <br></br>
                <label>
                  Escolha seu símbolo:
                  <select value={playerSymbol} onChange={(e) => setPlayerSymbol(e.target.value)}>
                    <option value="X">X</option>
                    <option value="O">O</option>
                  </select>
                </label>
              </div>
            </div>
          </div>
          <br></br>
          <button onClick={handleStartSinglePlayerGame}>Jogar!</button>
          <button onClick={handleBackToStart}>Voltar</button>
        </div>
      )}

      {gameMode === 'mult' && (
        <div className="name-input-screen">
          <h2>Jogo da Velha</h2>
          <label>
            Nome do Jogador 1:
            <input
              type="text"
              value={playerName1}
              onChange={(e) => setPlayerName1(e.target.value)}
              placeholder="Digite o nome"
            />
            <br></br>
            Nome do Jogador 2:
            <input
              type="text"
              value={playerName2}
              onChange={(e) => setPlayerName2(e.target.value)}
              placeholder="Digite o nome"
            />
          </label>
          <br></br>
          <button onClick={handleStartMultPlayerGame}>Jogar!</button>
          <button onClick={handleBackToStart}>Voltar</button>
        </div>
      )}

      {(gameMode === 'playSingle' || gameMode === 'two') && (
        <GameBoard
          players={players}
          gameMode={gameMode}
          onBackToStart={handleBackToStart}
        />
      )}
    </div>
  );
}

export default App;

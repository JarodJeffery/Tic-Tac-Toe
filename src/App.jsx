import { useState } from 'react';
import './App.css';
import Player from './components/Players/PlayerComponet.jsx';
import GameBoard from './components/GameBoard/GameBoard.jsx';
import GameOver from './components/GameOver/GameOver.jsx';
import Log from './components/Log/Log.jsx';
import { WINNING_COMBINATIONS } from "./winning-combinations.jsx";

const INITIAL_GAME_BOARD=[
  [null,  null, null],
  [null,  null, null],
  [null,  null, null], 
];

const PLAYER ={
  'O': 'Player1',
  'X': 'Player1',
}

function deriveActivePlayer(gameTurn){
  let currentPlay ='O';
  if(gameTurn.length>0 && gameTurn[0].player === 'O'){
    currentPlay= 'X';
  }
  return currentPlay;
}

function deriveGameBorad(gameTurn){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array =>[...array])];

  for(const turn of gameTurn){
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players){
  let winner;

  for(const comb of WINNING_COMBINATIONS){
    const fistSquareSymbol = gameBoard[comb[0].row][comb[0].column];
    const secondSquareSymbol = gameBoard[comb[1].row][comb[1].column];
    const thirdSquareSymbol = gameBoard[comb[2].row][comb[2].column];

    if(fistSquareSymbol && fistSquareSymbol === secondSquareSymbol && fistSquareSymbol === thirdSquareSymbol){
      winner = players[fistSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYER);
  const [gameTurn, setGameTurns] = useState([]);

  const currentPlayer =deriveActivePlayer(gameTurn);
  const gameBoard = deriveGameBorad(gameTurn);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurn.length === 9 && !winner;

  function restart(){
    setGameTurns([]);
  }

  function handlePlayerName(symbol, newName){
    setPlayers(prePlayer =>{
      return {
        ...prePlayer,
        [symbol] : newName
      };
    });
  }

  function handleSelectSquare(rowIndex, colIndex){
    setGameTurns(prevTurn =>{
      let currentPlay = deriveActivePlayer(prevTurn);

      const updatedTurn = [
        {square: { 
          row: rowIndex, 
          col: colIndex
        }, 
        player: currentPlay},
        ...prevTurn
      ];

      return updatedTurn;
    });
  }



  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName={PLAYER.O} symbol="O" isActive={currentPlayer === 'O'} onChangeName ={handlePlayerName}/>
          <Player initialName={PLAYER.X} symbol="X" isActive={currentPlayer === 'X'} onChangeName ={handlePlayerName}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} restart={restart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurn} board={gameBoard}/>
        {/*<button id="restartButton" onClick={restart}>Reset</button> */}
      </div>
      <Log turns={gameTurn}/>
    </main>
  );
}

export default App;

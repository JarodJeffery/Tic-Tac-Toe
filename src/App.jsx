import { useState } from 'react';
import './App.css';
import Player from './components/Players/PlayerComponet.jsx';
import GameBoard from './components/GameBoard/GameBoard.jsx';
import GameOver from './components/GameOver/GameOver.jsx';
import Log from './components/Log/Log.jsx';
import { WINNING_COMBINATIONS } from "./winning-combinations.jsx";

const initialGameBoard=[
  [null,  null, null],
  [null,  null, null],
  [null,  null, null],
];

function deriveActivePlayer(gameTurn){
  let currentPlay ='O';
  if(gameTurn.length>0 && gameTurn[0].player === 'O'){
    currentPlay= 'X';
  }
  return currentPlay;
}

function App() {
  const [gameTurn, setGameTurns] = useState([]);
  const currentPlayer =deriveActivePlayer(gameTurn);

  let gameBoard = [...initialGameBoard.map(array =>[...array])];

  for(const turn of gameTurn){
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
  }

  let winner = null;

  for(const comb of WINNING_COMBINATIONS){
    const fistSquareSymbol = gameBoard[comb[0].row][comb[0].column];
    const secondSquareSymbol = gameBoard[comb[1].row][comb[1].column];
    const thirdSquareSymbol = gameBoard[comb[2].row][comb[2].column];

    if(fistSquareSymbol && fistSquareSymbol === secondSquareSymbol && fistSquareSymbol === thirdSquareSymbol){
      winner = fistSquareSymbol;
    }
  }

  const hasDraw = gameTurn.length === 9 && !winner;

  function restart(){
    setGameTurns([]);
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
          <Player initialName="Player 1" symbol="O" isActive={currentPlayer === 'O'}/>
          <Player initialName="Player 2" symbol="X" isActive={currentPlayer === 'X'}/>
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

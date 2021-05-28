import React, { useState } from 'react';
import { createCells } from './utils/cells';
import { createPlayers } from './utils/players';
import { createPlayerTokens } from './utils/playerTokens';

import './App.css';
import { drawCells } from './components/Cell';
import { drawStartRects } from './components/Start';
import { drawToken } from './components/Tokens';
import Game from './actors/game';
import { GAME_STATUS } from './constants';
import { getGameStatusLabel, rollDice, startGame } from './utils/game';

function App() {
  const [cells, updateCells] = useState(createCells());
  const [players, updatePlayers] = useState(createPlayers());
  const [playerTokens, updatePlayerTokens ] = useState(createPlayerTokens());
  const [game, updateGame] = useState(new Game());

  console.log(players);
  console.log(playerTokens);
  return (
    <div className="app">
      <div className="board">
        {
          cells.map(cell => {
            return drawCells(cell);
          })
        }
        {
          drawStartRects()
        }
        {
          playerTokens.map(token => {
            return drawToken(token, game, players, playerTokens, updatePlayerTokens, updateGame);
          })
        }
      </div>
      <p> { getGameStatusLabel(game)}</p>
      <div className="dice" onClick={() => rollDice(game, updateGame, playerTokens, updatePlayerTokens)}>{game.diceVal}</div>
      <button
        disabled={game.status !== GAME_STATUS.finished && game.status !== GAME_STATUS.not_started}
        onClick={() => startGame(game, updateGame)}>
        Start Game
      </button>
    </div>
  );
}

export default App;

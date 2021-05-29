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
import { getGameStatusLabel, rollDice, startGame, changeTurns, disableSkipButton } from './utils/game';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import useToken from './components/useToken';


function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}


function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {
  const [cells, updateCells] = useState(createCells());
  const [players, updatePlayers] = useState(createPlayers());
  const [playerTokens, updatePlayerTokens ] = useState(createPlayerTokens());
  const [game, updateGame] = useState(new Game());
  const {token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }
  let diceClassName = '';

  if(game.status === GAME_STATUS.waiting_for_dice) {
    diceClassName += " blink ";
  }
  console.log(cells);
  console.log(players);
  console.log(playerTokens);
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/">
    <div className="app">
      <div className="board-container">
        <div className="board">
          {
            cells.map(cell => {
              return drawCells(cell);
            })
          }
          {
            drawStartRects(game)
          }
          {
            playerTokens.map(token => {
              return drawToken({token, game, players, updatePlayers, playerTokens, updatePlayerTokens, updateGame, cells});
            })
          }
        </div>
      </div>
      <div className="controls">
        <h2> { getGameStatusLabel(game, players)}</h2>
        <div
          className={`dice${diceClassName}`}
          onClick={() => rollDice(game, updateGame, playerTokens, updatePlayerTokens, players)}
        >
          {game.status === GAME_STATUS.waiting_for_token? game.diceVal: null}
        </div>
        <button
          className="btn-primary"
          disabled={game.status !== GAME_STATUS.finished && game.status !== GAME_STATUS.not_started}
          onClick={() => startGame(game, updateGame)}>
          Start Game
        </button>
        <button
          className="btn-secondary"
          disabled={disableSkipButton(game, playerTokens)}
          onClick={() => changeTurns(game, updateGame, playerTokens, updatePlayerTokens)}>
          Skip Turn
        </button>
      </div>
    </div>
    </Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from 'react';
import { createCells } from './utils/cells';
import { createPlayers } from './utils/players';
import { createPlayerTokens } from './utils/playerTokens';

import './App.css';
import { drawCells } from './components/Cell';
import { drawStartRects } from './components/Start';
import { drawToken } from './components/Tokens';

function App() {
  const [cells, updateCells] = useState(createCells());
  const [players, updatePlayers] = useState(createPlayers());
  const [playerTokens, updatePlayerTokens ] = useState(createPlayerTokens());
  console.log(players);
  console.log(playerTokens);
  return (
    <div className="app">
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
          return drawToken(token);
        })
      }
    </div>
  );
}

export default App;

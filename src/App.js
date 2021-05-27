import React, { useState } from 'react';
import { createCells } from './utils/cells';

import './App.css';
import { drawCells } from './components/Cell';
import { drawStartRects } from './components/Start';

function App() {
  const [cells, updateCells] = useState(createCells())
  console.log(cells);
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
    </div>
  );
}

export default App;

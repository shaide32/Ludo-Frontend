import React, { useState } from 'react';
import { createCells } from './utils/cells';

import './App.css';
import { drawCells } from './components/cell';

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
    </div>
  );
}

export default App;

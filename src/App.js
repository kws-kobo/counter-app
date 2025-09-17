import React, { useState, useEffect } from 'react';
import './App.css';
import Counter from './Counter';

function App() {
  const [totalGames, setTotalGames] = useState(() => {
    const savedTotalGames = localStorage.getItem('totalGames_input');
    return savedTotalGames !== null ? savedTotalGames : '';
  });

  // 🔸 開始ゲーム数の state と localStorage連携
  const [startGameCount, setStartGameCount] = useState(() => {
    const savedStartGameCount = localStorage.getItem('startGameCount_input');
    return savedStartGameCount !== null ? savedStartGameCount : '';
  });

  const [resetTrigger, setResetTrigger] = useState(0);

  useEffect(() => {
    localStorage.setItem('totalGames_input', totalGames);
  }, [totalGames]);

  useEffect(() => {
    localStorage.setItem('startGameCount_input', startGameCount);
  }, [startGameCount]);

  const handleTotalGamesChange = (event) => {
    setTotalGames(event.target.value);
  };

  const handleStartGameCountChange = (event) => {
    setStartGameCount(event.target.value);
  };


const handleResetAll = () => {
  setTotalGames('');
  setStartGameCount('');
  localStorage.removeItem('totalGames_input');
  localStorage.removeItem('startGameCount_input');

  // 🔸 6つのカウンターすべてをリセット
  for (let i = 1; i <= 6; i++) {
    localStorage.removeItem(`counter_${i}`);
  }

  setResetTrigger(prev => prev + 1);
};


  return (
    <div className="App">
      <header className="App-header">
        <h1>独立カウンター x 6</h1>

        <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <label htmlFor="totalGamesInput" style={{ marginRight: '10px' }}>
            ゲーム数合計:
          </label>
          <input
            id="totalGamesInput"
            type="number"
            value={totalGames}
            onChange={handleTotalGamesChange}
            placeholder="例: 100"
            style={{ padding: '5px', fontSize: '16px', marginRight: '10px' }}
          />

          {/* 🔸 開始ゲーム数の入力欄 */}
          <label htmlFor="startGameCountInput" style={{ marginRight: '10px' }}>
            開始ゲーム数:
          </label>
          <input
            id="startGameCountInput"
            type="number"
            value={startGameCount}
            onChange={handleStartGameCountChange}
            placeholder="例: 0"
            style={{ padding: '5px', fontSize: '16px', marginRight: '10px' }}
          />

          <button onClick={handleResetAll} style={{ padding: '8px 15px', fontSize: '16px', cursor: 'pointer' }}>
            全てリセット
          </button>
        </div>

<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
  
  {/* 上段の3つ */}
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '50px' }}>
    <Counter key={resetTrigger + '_1'} color="yellow" storageKey="counter_1" totalGames={totalGames} startGameCount={startGameCount} />
    <Counter key={resetTrigger + '_2'} color="red" storageKey="counter_2" totalGames={totalGames} startGameCount={startGameCount} />
    <Counter key={resetTrigger + '_3'} color="green" storageKey="counter_3" totalGames={totalGames} startGameCount={startGameCount} />
  </div>

  {/* 下段の3つ */}
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '50px' }}>
    <Counter key={resetTrigger + '_4'} color="skyblue" storageKey="counter_4" totalGames={totalGames} startGameCount={startGameCount} />
    <Counter key={resetTrigger + '_5'} color="lightgray" storageKey="counter_5" totalGames={totalGames} startGameCount={startGameCount} />
    <Counter key={resetTrigger + '_6'} color="purple" storageKey="counter_6" totalGames={totalGames} startGameCount={startGameCount} />
  </div>

</div>

      </header>
    </div>
  );
}

export default App;

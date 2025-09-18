import React, { useState, useEffect } from 'react';
import './App.css';
import Counter from './Counter';

function App() {
  const [totalGames, setTotalGames] = useState(() => {
    const savedTotalGames = localStorage.getItem('totalGames_input');
    return savedTotalGames !== null ? savedTotalGames : '';
  });

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

  // --- 入力フィールドからフォーカスが外れたときにキーボードを閉じる関数 ---
  const handleInputBlur = (event) => {
    event.target.blur(); // input要素のblurメソッドを呼び出す
  };

  // --- ゲーム数を加算するボタン用の関数 ---
  const handleGameCountIncrement = (amount) => {
    // 現在のゲーム数を数値に変換します。入力が空の場合は0として扱います。
    const currentGameCount = totalGames === '' ? 0 : parseInt(totalGames, 10);
    // 新しいゲーム数を計算します。
    const newTotalGames = currentGameCount + amount;
    // stateを更新します。inputのvalueは文字列を期待するため、String()で文字列に変換します。
    setTotalGames(String(newTotalGames));
  };

  // --- 開始ゲーム数を加算するボタン用の関数 ---
  const handleStartGameCountIncrement = (amount) => {
    // 現在の開始ゲーム数を数値に変換します。入力が空の場合は0として扱います。
    const currentCount = startGameCount === '' ? 0 : parseInt(startGameCount, 10);
    // 新しい開始ゲーム数を計算します。
    const newCount = currentCount + amount;
    // stateを更新します。
    setStartGameCount(String(newCount));
  };


const handleResetAll = () => {
  setTotalGames('');
  setStartGameCount('');
  localStorage.removeItem('totalGames_input');
  localStorage.removeItem('startGameCount_input');

  for (let i = 1; i <= 6; i++) {
    localStorage.removeItem(`counter_${i}`);
  }

  setResetTrigger(prev => prev + 1);
};


  return (
    <div className="App">
      <header className="App-header">
        <h1>小役カウンター</h1>

        {/* --- 入力セクション --- */}
        <div style={{ margin: '20px 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '20px' }}>

          {/* --- ゲーム数合計セクション --- */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <label htmlFor="totalGamesInput">ゲーム数合計:</label>
            <input
              id="totalGamesInput"
              type="number"
              value={totalGames}
              onChange={handleTotalGamesChange}
              onBlur={handleInputBlur}
              placeholder="例: 100"
              style={{ padding: '5px', fontSize: '16px', width: '100px', textAlign: 'center' }}
            />
            <div>
              <button onClick={() => handleGameCountIncrement(1000)} style={{ padding: '5px 10px', fontSize: '14px', cursor: 'pointer' }}>+1000</button>
              <button onClick={() => handleGameCountIncrement(100)} style={{ padding: '5px 10px', fontSize: '14px', marginLeft: '5px', cursor: 'pointer' }}>+100</button>
              <button onClick={() => handleGameCountIncrement(10)} style={{ padding: '5px 10px', fontSize: '14px', marginLeft: '5px', cursor: 'pointer' }}>+10</button>
              <button onClick={() => handleGameCountIncrement(1)} style={{ padding: '5px 10px', fontSize: '14px', marginLeft: '5px', cursor: 'pointer' }}>+1</button>
            </div>
          </div>

          {/* --- 開始ゲーム数セクション --- */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <label htmlFor="startGameCountInput">開始ゲーム数:</label>
            <input
              id="startGameCountInput"
              type="number"
              value={startGameCount}
              onChange={handleStartGameCountChange}
              onBlur={handleInputBlur}
              placeholder="例: 0"
              style={{ padding: '5px', fontSize: '16px', width: '100px', textAlign: 'center' }}
            />
            <div>
              <button onClick={() => handleStartGameCountIncrement(1000)} style={{ padding: '5px 10px', fontSize: '14px', cursor: 'pointer' }}>+1000</button>
              <button onClick={() => handleStartGameCountIncrement(100)} style={{ padding: '5px 10px', fontSize: '14px', marginLeft: '5px', cursor: 'pointer' }}>+100</button>
              <button onClick={() => handleStartGameCountIncrement(10)} style={{ padding: '5px 10px', fontSize: '14px', marginLeft: '5px', cursor: 'pointer' }}>+10</button>
              <button onClick={() => handleStartGameCountIncrement(1)} style={{ padding: '5px 10px', fontSize: '14px', marginLeft: '5px', cursor: 'pointer' }}>+1</button>
            </div>
          </div>

          {/* --- リセットボタン --- */}
          <button onClick={handleResetAll} style={{ padding: '8px 15px', fontSize: '16px', cursor: 'pointer', height: 'fit-content' }}>
            全てリセット
          </button>
        </div>

        {/* --- カウンターセクション --- */}
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

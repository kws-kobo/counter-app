import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * Counter コンポーネント
 * - 個別のカウント機能（+/-/リセット）
 * - 出現確率の表示（分数形式）
 * - localStorage による状態の永続化
 * 
 * Props:
 * - color: 表示色（カウント値の背景）
 * - storageKey: localStorage に保存するキー名
 * - totalGames: 総ゲーム数（親コンポーネントから渡される）
 * - startGameCount: 開始ゲーム数（確率計算に使用）
 */
function Counter({ color, storageKey, totalGames, startGameCount }) {

  // --- カウントの状態を初期化 ---
  // 初回レンダリング時に localStorage から保存された値を読み込む
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem(storageKey);
    return savedCount !== null ? parseInt(savedCount, 10) : 0;
  });

  // --- カウントが変更されたら localStorage に保存 ---
  useEffect(() => {
    localStorage.setItem(storageKey, count);
  }, [count, storageKey]);

  // --- カウントを1増やす ---
  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  // --- カウントを1減らす（0未満にならないように制限） ---
  const handleDecrement = () => {
    setCount(prevCount => Math.max(prevCount - 1, 0));
  };

  // --- このカウンターだけをリセットする処理 ---
  const handleIndividualReset = () => {
    setCount(0); // 状態を0に戻す
    localStorage.removeItem(storageKey); // 保存データも削除
  };

  // --- 出現確率の計算 ---
  // 入力されたゲーム数を数値に変換（文字列のままだと計算できないため）
  const total = parseInt(totalGames, 10);
  const start = parseInt(startGameCount, 10);

  // 実際の計算に使うゲーム数（開始ゲーム数が有効なら差分を使う）
  const effectiveTotal = (!isNaN(start) && start > 0 && total > start)
    ? (total - start)
    : total;

  // --- 確率表示のロジック ---
  // 分母を「ゲーム数 ÷ カウント数」で計算し、"1 / ○○" の形式で表示
  let probabilityDisplay;
  if (count > 0 && effectiveTotal > 0) {
    const denominator = effectiveTotal / count;
    probabilityDisplay = `1 / ${denominator.toFixed(1)}`; // 小数1桁に丸める
  } else {
    probabilityDisplay = 'N/A'; // 計算できない場合の表示
  }

  // --- JSXの描画部分 ---
  return (
    <div
      className="counter-container"
      style={{
        margin: '20px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid white',
        padding: '15px',
        borderRadius: '10px'
      }}
    >
      {/* カウント表示 */}
      <span
        className="count-display"
        style={{
          backgroundColor: color,
          padding: '10px 20px',
          borderRadius: '10px',
          color: 'black'
        }}
      >
        {count}
      </span>

      {/* 操作ボタン群 */}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <button
          onClick={handleDecrement}
          className="increment-button"
          style={{ padding: '5px 15px', minWidth: '50px', margin: '5px' }}
        >
          -
        </button>
        <button
          onClick={handleIncrement}
          className="increment-button"
          style={{ padding: '5px 15px', minWidth: '50px', margin: '5px' }}
        >
          +
        </button>
        <button
          onClick={handleIndividualReset}
          style={{ padding: '5px 10px', fontSize: '14px', marginLeft: '10px', cursor: 'pointer' }}
        >
          リセット
        </button>
      </div>

      {/* 出現確率の表示 */}
      <div style={{ marginTop: '15px', fontSize: '14px' }}>
        <span>出現確率: </span>
        <strong>{probabilityDisplay}</strong>
      </div>
    </div>
  );
}

export default Counter;

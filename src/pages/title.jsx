import React, { useState } from "react";
import { useLocation } from "wouter";

export default function Title() {
  const [, setLocation] = useLocation();
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    setLocation("/maze");
  };

  const goToLevel2 = () => {
    setLocation("/level2");
  };

  const goToLevel3 = () => {
    setLocation("/level3");  // レベル3のURLに遷移
  };

  return (
    <div className="title">
      <h1>Vim maze game</h1>
      <div className="info-box">
        <p>基本的なvimコマンドを利用してゴールを目指して進もう！</p>
        <div className="vim-commands">
          <p>上: <span>k</span></p>
          <p>下: <span>j</span></p>
          <p>右: <span>l</span></p>
          <p>左: <span>h</span></p>
        </div>
      </div>
      {!gameStarted && (
        <>
          <button className="start-button" onClick={startGame}>
            Level 1
          </button>
          <button className="start-button" onClick={goToLevel2}>
            Level 2
          </button>
          <button className="start-button" onClick={goToLevel3}>
            Level 3  {/* レベル3の遷移ボタン */}
          </button>
        </>
      )}
      {gameStarted && <p>ゲームが開始されました！</p>}
    </div>
  );
}

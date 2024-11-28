import React, { useState, useEffect } from "react";
import "../styles/maze.css";

// セルのコンポーネント
function Cell({ type, isVisible, isPlayer }) {
  let className = "cell";
  if (isPlayer) {
    className += " player";
  } else if (type === 1) {
    className += isVisible ? " wall" : " dark";
  } else if (type === "S") {
    className += isVisible ? " start" : " dark";
  } else if (type === "G") {
    className += isVisible ? " goal" : " dark";
  } else {
    className += isVisible ? " path" : " dark";
  }
  return <div className={className}></div>;
}

// メッセージ表示コンポーネント（ポップアップ風）
function Message({ text, onClose }) {
  if (!text) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>{text}</h2>
        <button onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
}

export default function Maze() {
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [message, setMessage] = useState("");

  const movePlayer = (dx, dy) => {
    const { x, y } = playerPos;
    const newX = x + dx;
    const newY = y + dy;

    if (mazeData[newX][newY] === 1) return; // 壁は通れない
    if (mazeData[newX][newY] === "G") {
      setMessage("おめでとう！秘密の鍵は「runteq」");
      return;
    }

    setPlayerPos({ x: newX, y: newY });
  };

  const handleKeyDown = (event) => {
    if (event.key === "k") movePlayer(-1, 0); // 上
    if (event.key === "j") movePlayer(1, 0);  // 下
    if (event.key === "h") movePlayer(0, -1); // 左
    if (event.key === "l") movePlayer(0, 1);  // 右
  };

  const handleClosePopup = () => {
    setMessage("");  // ポップアップを閉じる
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerPos]);

  return (
    <div>
      <h1 className="level-heading">Level.1</h1>
      <Message text={message} onClose={handleClosePopup} />
      <div className="maze">
        {mazeData.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => {
              const isVisible =
                Math.abs(rowIndex - playerPos.x) <= 1 &&
                Math.abs(colIndex - playerPos.y) <= 1;
              const isPlayer = rowIndex === playerPos.x && colIndex === playerPos.y;
              return (
                <Cell
                  key={colIndex}
                  type={cell}
                  isVisible={isVisible}
                  isPlayer={isPlayer}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

const mazeData = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, "S", 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
  [1, 0, "G", 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];


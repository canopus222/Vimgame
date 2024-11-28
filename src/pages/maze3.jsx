import React, { useState, useEffect } from "react";
import "../styles/maze3.css"; // 外部CSSファイルをインポートして、スタイルを適用。

// 各マス（セル）の見た目を決めるコンポーネント
function Cell({ type, isVisible, isPlayer }) {
  let className = "cell"; // 基本のクラス名
  let cellStyle = {}; // 追加のスタイル用

  if (isPlayer) {
    className += " player"; // プレイヤーがいるマス
  } else if (type === 1) {
    className += isVisible ? " wall" : " dark"; // 壁マス
  } else if (type === "S") {
    className += isVisible ? " start" : " dark"; // スタート地点
  } else if (type === "G") {
    className += isVisible ? " goal" : " dark"; // ゴール地点
  } else if (type === "Y") {
    className += isVisible ? " yellow" : " dark"; // 黄色の装飾マス
  } else if (type === 2) { 
    className += isVisible ? " tree" : " dark "; // 木のマスに tree クラスを適用
  } else {
    className += isVisible ? " path" : " dark"; // 通路マス
  }

  return <div className={className} style={cellStyle}></div>; // マス目を描画
}

// 質問ポップアップを表示するコンポーネント
function Popup({ question, answer, onSubmit, onClose }) {
  const [input, setInput] = useState(""); // ユーザーの回答を管理

  const handleSubmit = () => {
    if (input === answer) {
      onSubmit(true); // 正解の場合
    } else {
      onSubmit(false); // 不正解の場合
    }
    setInput(""); // 入力フィールドをクリア
  };

  if (!question) return null; // 質問がない場合は何も表示しない

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>{question}</h2> {/* 質問を表示 */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)} // ユーザーの入力を更新
          placeholder="答えを入力してください" // ヒント文
        />
        <button onClick={handleSubmit}>送信</button>
        <button onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
}

// 迷路全体のロジックを管理するコンポーネント
export default function Maze3() {
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 }); // プレイヤーの初期位置
  const [popup, setPopup] = useState({ message: "" }); // 現在のメッセージ状態
  const [message, setMessage] = useState(""); // 状態メッセージ（ゴール到達時など）


  // キーボード操作でプレイヤーを動かす
const handleKeyDown = (event) => {
  if (popup.message) return; // ポップアップ表示中は入力を無効化
  const { x, y } = playerPos;

  let newX = x, newY = y;
  if (event.key === "k") newX--; // 上
  if (event.key === "j") newX++; // 下
  if (event.key === "h") newY--; // 左
  if (event.key === "l") newY++; // 右

  if (mazeData[newX][newY] === 1 || mazeData[newX][newY] === 2) return; // 壁や木は通れない

  if (mazeData[newX][newY] === "Y") {
    alert("モンスターに捕まった！スタート地点に戻ります。");
    setPlayerPos({ x: 1, y: 1 }); // プレイヤーを初期位置に戻す
    return;
  }

  if (mazeData[newX][newY] === "G") {
    alert("おめでとう！ゴールに到達しました！"); // ゴールメッセージ
    return;
  }

  setPlayerPos({ x: newX, y: newY }); // プレイヤーの位置を更新
};

  // ポップアップの回答処理
  const handlePopupSubmit = (correct) => {
    if (correct) {
      const updatedMazeData = [...mazeData];  // 迷路データをコピー
      const { x, y } = playerPos;
      updatedMazeData[x][y] = 0;  // 現在のプレイヤー位置を通路に変更（"a" -> 0）
      mazeData = updatedMazeData;  // mazeDataを更新
      setPopup({ question: null, answer: null }); // ポップアップを閉じる
    } else {
      setPlayerPos({ x: 1, y: 1 }); // スタート地点に戻す
      setPopup({ question: null, answer: null }); // ポップアップを閉じる
    }
  };

  // キーボードイベントを設定
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerPos]);

  return (
    <div>
      <h1 className="level-heading">Level 3</h1>
      <div className="maze">
        {mazeData.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => {
              const isVisible =
                Math.abs(rowIndex - playerPos.x) <= 1 &&
                Math.abs(colIndex - playerPos.y) <= 1; // 周囲1マスのみ表示
              const isPlayer = rowIndex === playerPos.x && colIndex === playerPos.y;
              return (
                <Cell
                  key={`${rowIndex}-${colIndex}`}
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

let mazeData = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, "S", 2, 0, 0, 1, "Y", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, "Y", 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, "Y", 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, "Y", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, "Y", 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, "Y", 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, "Y", 0, 0, 0, 1, "Y", 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, "Y", 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2],  
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2], 
  [1, 0, 0, 0, 0, 1, "Y", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, "Y", 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, "Y", 0, 1],
  [1, 0, 1, 1, 1, 1, 1, "Y", 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, "G", 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, "Y", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, "Y", 1, 1, 1, 0, 1],
  [1, 0, 0, "Y", 0, 1, "Y", 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, "Y", 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, "Y", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "Y", 1, 0, 0, "Y", 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

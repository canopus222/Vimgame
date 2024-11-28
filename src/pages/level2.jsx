import React, { useState } from "react";
import { useLocation } from "wouter";

export default function Level2() {
  const [input, setInput] = useState(""); // 入力フォームの値を管理
  const [, setLocation] = useLocation(); // ページ遷移用

  const handleInputChange = (e) => {
    setInput(e.target.value); // 入力値を更新
  };

  const handleUnlock = () => {
    if (input === "runteq") {
      // 正しい秘密の鍵であればレベル2迷路へ遷移
      setLocation("/maze2");
    } else {
      alert("秘密の鍵が間違っています！"); // 間違った場合のエラーメッセージ
    }
  };

  return (
    <div className="level2">
      <h1>Please enter your secret key</h1>
      <p>正しい鍵を入力するとレベル2に進むことができます。</p>
      <input
        type="text"
        placeholder="秘密の鍵を入力してください"
        value={input}
        onChange={handleInputChange}
      />
      <button onClick={handleUnlock}>解除</button>
    </div>
  );
}


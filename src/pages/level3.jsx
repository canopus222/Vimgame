import React, { useState } from "react";
import { useLocation } from "wouter";

export default function Level3() {
  const [input, setInput] = useState(""); // 入力フォームの値を管理
  const [, setLocation] = useLocation(); // ページ遷移用

  const handleInputChange = (e) => {
    setInput(e.target.value); // 入力値を更新
  };

  const handleUnlock = () => {
    if (input === "Pomo") {
      // 正しい秘密の呪文であればレベル3迷路へ遷移
      setLocation("/maze3");
    } else {
      alert("秘密の呪文が間違っています！"); // 間違った場合のエラーメッセージ
    }
  };

  return (
    <div className="level3">
      <h1>Please enter the secret spell</h1>
      <p>秘密の呪文を入力するとレベル3に進むことができます。</p>
      <input
        type="text"
        placeholder="秘密の呪文を入力してください"
        value={input}
        onChange={handleInputChange}
      />
      <button onClick={handleUnlock}>開けごま</button>
    </div>
  );
}

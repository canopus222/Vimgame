import React from "react";
import { Route } from "wouter";
import Title from "../pages/title.jsx";
import Maze from "../pages/maze.jsx";
import Level2 from "../pages/level2.jsx"; // Level2をインポート
import Maze2 from "../pages/maze2.jsx";   // Maze2をインポート
import Level3 from "../pages/level3.jsx"; // Level3をインポート
import Maze3 from "../pages/maze3.jsx";   // Maze3をインポート

export default function PageRouter() {
  return (
    <>
      <Route path="/" component={Title} />
      <Route path="/maze" component={Maze} />
      <Route path="/level2" component={Level2} />   {/* Level2へのルートを追加 */}
      <Route path="/maze2" component={Maze2} />     {/* Maze2へのルートを追加 */}
      <Route path="/level3" component={Level3} />   {/* Level3へのルートを追加 */}
      <Route path="/maze3" component={Maze3} />     {/* Maze3へのルートを追加 */}
    </>
  );
}

import React from "react";
import "../../css/Board.css";
import BoardHeader from "./BoardHeader";
import BoardRow from "./BoardRow";
import Guess from "../../interfaces/Guess";
import Player from "../../interfaces/Player";

function Board({ player, guesses }: { player: Player; guesses: Guess[] }) {
  return (
    <div className="board">
      <BoardHeader />
      {guesses.map((guess, i) => (
        <BoardRow player={player} guess={guess} key={i} />
      ))}
    </div>
  );
}

export default Board;

import React from "react";
import Player from "../../interfaces/Player";
import Guess from "../../interfaces/Guess";
import Flag from "react-world-flags";
import Countries from "country-list-js";

function BoardRow({ player, guess }: { player: Player; guess: Guess }) {
  function returnArrow(guessedNum: number, correctNum: number) {
    if (guessedNum === correctNum) {
      return "";
    } else if (guessedNum > correctNum) {
      return " ↑";
    } else if (guessedNum < correctNum) {
      return " ↓";
    }
  }

  return (
    <div className="board-row">
      <div className={"gridItem " + (guess.name ? "correct" : "")}>
        <p className="gridContent">{guess.player.name}</p>
      </div>
      <div
        className={
          "gridItem " +
          (guess.nationality.correct
            ? "correct"
            : guess.nationality.close
            ? "close"
            : "")
        }
      >
        <p className="gridContent">
          <Flag
            code={guess.player.flagCode}
            className="flagIcon"
            title={"Flag of " + guess.player.nationality}
          />
        </p>
      </div>
      <div className={"gridItem " + (guess.region ? "correct" : "")}>
        <p className="gridContent">{guess.player.region}</p>
      </div>
      <div className={"gridItem " + (guess.team ? "correct" : "")}>
        <p className="gridContent">{guess.player.team}</p>
      </div>
      <div
        className={
          "gridItem " +
          (guess.age.correct ? "correct" : guess.age.close ? "close" : "")
        }
      >
        <p className="gridContent">
          {guess.player.age} {returnArrow(player.age, guess.player.age)}
        </p>
      </div>
      <div
        className={
          "gridItem " +
          (guess.rlcsLanAppearances.correct
            ? "correct"
            : guess.rlcsLanAppearances.close
            ? "close"
            : "")
        }
      >
        <p className="gridContent">
          {guess.player.rlcsLanAppearances}{" "}
          {returnArrow(
            player.rlcsLanAppearances,
            guess.player.rlcsLanAppearances
          )}
        </p>
      </div>
    </div>
  );
}

export default BoardRow;

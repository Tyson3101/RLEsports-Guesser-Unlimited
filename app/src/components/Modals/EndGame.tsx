import React from "react";
import Player from "../../interfaces/Player";
import { AiFillCloseCircle } from "react-icons/ai";
import PlayerCard from "../PlayerCard/PlayerCard";
import Guess from "../../interfaces/Guess";

function EndGame({
  playAgain,
  showStats,
  close,
  player,
  guesses,
}: {
  playAgain: () => void;
  showStats: () => void;
  close: () => void;
  player: Player;
  guesses: Guess[];
}) {
  const checkCorrect = () => {
    const lastGuess = guesses[guesses.length - 1];
    return lastGuess.player.id === player.id;
  };
  return (
    <div className="modal">
      <div className="endGameModal">
        <div className="closeIcon" onClick={close}>
          <AiFillCloseCircle />
        </div>
        <div className="header">
          {checkCorrect() ? (
            <h1>
              Correct! <span className="emojis">🎉🎉🎉</span>
            </h1>
          ) : (
            <h1>
              Unlucky! <span className="emojis">💩💩💩</span>
            </h1>
          )}
        </div>
        <div className="line"></div>
        <div className="content">
          <h2>You {!checkCorrect() ? "failed to guess" : "guessed"}</h2>
          <PlayerCard player={player} />
          <h2>
            in{" "}
            {guesses.length === 1
              ? `${!checkCorrect() ? "under" : ""} ${guesses.length} guess!`
              : `${!checkCorrect() ? "under" : ""} ${guesses.length} guesses!`}
          </h2>
        </div>
        <div className="line"></div>
        <div className="footer">
          <button className="playAgain" onClick={playAgain}>
            Play Again
          </button>
          <button className="seeStats" onClick={showStats}>
            See Stats
          </button>
        </div>
      </div>
    </div>
  );
}

export default EndGame;

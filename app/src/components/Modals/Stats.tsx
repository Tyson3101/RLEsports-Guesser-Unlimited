import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { loadStats } from "../../util/localStorage";

function Stats({ close }: { close: () => void }) {
  const stats = loadStats();
  const gamesWon = stats?.filter((stat) => stat.winner).length || 0;
  const gamesLost = stats?.filter((stat) => !stat.winner).length || 0;
  const accuracy = Math.round((gamesWon / (gamesWon + gamesLost)) * 100) || 0;
  const averageGuesses =
    Math.floor(
      (stats?.reduce((acc, stat) => acc + stat.guesses, 0) || 0) /
        (gamesWon + gamesLost)
    ) || 0;

  return (
    <div className="modal">
      <div className="statsModal">
        <div className="closeIcon" onClick={close}>
          <AiFillCloseCircle />
        </div>
        <div className="header">
          <h1>
            Stats <span className="emojis">📊📊📊</span>
          </h1>
        </div>
        <div className="line"></div>
        <div className="content">
          <div>
            <h2>Win : Loss</h2>
            <p>
              {gamesWon}/{gamesLost}
            </p>
          </div>{" "}
          <div>
            <h2>Avg Num of Guesses</h2>
            <p>{averageGuesses}</p>
          </div>
          <div>
            <h2>Win Rate</h2>
            <p>{accuracy}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;

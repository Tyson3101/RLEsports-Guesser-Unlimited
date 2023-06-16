import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

function Info({ close }: { close: () => void }) {
  return (
    <div className="modal">
      <div className="infoModal">
        <div className="closeIcon" onClick={close}>
          <AiFillCloseCircle />
        </div>
        <div className="header">
          <h1>
            Information <span className="emojis">🧐🧐🧐</span>
          </h1>
        </div>
        <div className="line"></div>
        <div className="content">
          <div>
            <h2>What?</h2>
            <p>
              This is an unlimited plays version of the{" "}
              <a href="https://rleguessr.app">RLE Guessr</a> game which was
              created by <a href="https://twitter.com/RL_Cal">@RL_Cal</a>.
            </p>
          </div>{" "}
          <div>
            <h2>How?</h2>
            <p>
              Your goal is to guess the RL Esports player in under 6 guesses.
              With the help of the hints from the players provided.
            </p>{" "}
          </div>{" "}
          <div>
            <h2>Why?</h2>
            <p>
              With this unlimited version, you can practise, test and improve
              your RL Esports knowledge and never fail the{" "}
              <a href="https://rleguessr.app">rleguesser.app</a>'s highly-staked
              daily challenge again.
            </p>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;

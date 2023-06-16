import React from "react";

function GuessCounter({ numOfGuesses }: { numOfGuesses: number }) {
  const array = Array.from(Array(6).keys());
  // create blobs for each guess
  return (
    <div className="guessCounter">
      {array.map((guess) => (
        <div
          className={"blob " + (guess < numOfGuesses ? "highlighted" : "")}
          key={guess}
        ></div>
      ))}
    </div>
  );
}

export default GuessCounter;

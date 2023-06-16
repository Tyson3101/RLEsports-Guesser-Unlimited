import React from "react";
import Player from "../../interfaces/Player";
import Flag from "react-world-flags";
import "../../css/PlayerCard.css";

function PlayerCard({ player }: { player: Player }) {
  return (
    <div className="playerCard">
      <div className="flag">
        <Flag className="flagIcon" code={player.flagCode} />
      </div>
      <div className="details">
        <h1 className="name">
          {player.name}
          <span className="fullName">{player.fullName}</span>
        </h1>
      </div>
    </div>
  );
}

export default PlayerCard;

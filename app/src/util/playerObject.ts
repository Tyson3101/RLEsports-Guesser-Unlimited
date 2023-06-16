import Player from "../interfaces/Player";
import Players from "../data/players.json";
import calculateAge from "./ageFromDOB";
import Countries from "country-list-js";

function getPlayerInfo(passedPlayer: { id: number; name?: string }) {
  let player: Player = passedPlayer as Player;
  if (!passedPlayer.name && passedPlayer.id)
    player = Players.find((p) => p.id === passedPlayer.id) as Player;

  return {
    ...player,
    age: calculateAge(player.DOB),
    flagCode:
      Countries.findByName(player.nationality)?.code.iso3 ||
      findFlagCodeUK(player.nationality),
  };
}

function findFlagCodeUK(nationality: string) {
  const UK_CODES = {
    England: "GB-ENG",
    Scotland: "GB-SCT",
    Wales: "GB-WLS",
    "Northern Ireland": "GB-NIR",
  };
  for (let [key, value] of Object.entries(UK_CODES)) {
    if (nationality === key) return value;
  }
  return "";
}

export default getPlayerInfo;

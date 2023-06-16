import Guess from "../interfaces/Guess";
import Player from "../interfaces/Player";
import Countries from "country-list-js";

function evaluateGuess(guess: Player, player: Player): Guess {
  return {
    player: guess,
    name: guess.name === player.name,
    nationality: {
      correct: guess.nationality === player.nationality,
      close: evaluateContinent(guess, player),
    },
    region: guess.region === player.region,
    team: guess.team === player.team,
    age: {
      correct: guess.age === player.age,
      close: evaluateCloseNumber(guess.age, player.age),
    },
    rlcsLanAppearances: {
      correct: guess.rlcsLanAppearances === player.rlcsLanAppearances,
      close: evaluateCloseNumber(
        guess.rlcsLanAppearances,
        player.rlcsLanAppearances
      ),
    },
  };
}

function evaluateCloseNumber(guess: number, player: number): boolean {
  if (guess > player) {
    return guess - player <= 2;
  } else {
    return player - guess <= 2;
  }
}

function evaluateContinent(guess: Player, player: Player): boolean {
  const guessContinent = Countries.findByIso3(guess.flagCode)?.continent;
  const playerContinent = Countries.findByIso3(player.flagCode)?.continent;
  return guessContinent === playerContinent;
}

export default evaluateGuess;

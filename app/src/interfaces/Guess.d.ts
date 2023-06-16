import Player from "./Player";

interface Guess {
  player: Player;
  name: boolean;
  nationality: {
    correct: boolean;
    close: boolean;
  };
  region: boolean;
  team: boolean;
  age: {
    correct: boolean;
    close: boolean;
  };
  rlcsLanAppearances: {
    correct: boolean;
    close: boolean;
  };
}

export default Guess;

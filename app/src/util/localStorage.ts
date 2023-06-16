import gameStat from "../interfaces/GameStat";
import Guess from "../interfaces/Guess";
import Player from "../interfaces/Player";
import Settings from "../interfaces/Settings";
import evaluateGuess from "./evaluateGuess";
import constructPlayerObject from "./playerObject";

function saveGameState(
  currentPlayer: Player,
  guessedPlayers: Guess[],
  gameStat?: gameStat | null
) {
  let stats = JSON.parse(localStorage.getItem("stats")!);
  if (!stats) stats = [];
  if (gameStat) {
    stats.push(gameStat);
  }
  const gameState = {
    currentPlayer: { id: currentPlayer.id },
    guessedPlayers: guessedPlayers.map(({ player: { id } }) => ({ id })),
  };
  localStorage.setItem("stats", JSON.stringify(stats));
  localStorage.setItem("gameState", JSON.stringify(gameState));
}

function loadGameState(): {
  currentPlayer: Player;
  guessedPlayers: Guess[];
  gameFinished: boolean;
} | null {
  const gameState = JSON.parse(localStorage.getItem("gameState")!);
  if (!gameState?.currentPlayer?.id) return null;
  const currentPlayer = constructPlayerObject(gameState.currentPlayer);
  const guessedPlayers = gameState.guessedPlayers.map((plr: Player) => ({
    //@ts-ignore
    player: constructPlayerObject(plr),
    ...evaluateGuess(constructPlayerObject(plr), currentPlayer),
  }));

  const returnGameState = {
    currentPlayer,
    guessedPlayers,
    gameFinished:
      gameState.guessedPlayers?.length === 5 ||
      guessedPlayers?.[guessedPlayers?.length - 1]?.player?.id ===
        currentPlayer?.id,
  };
  return returnGameState;
}

const loadStats = () => {
  const stats = JSON.parse(localStorage.getItem("stats")!);
  return stats as gameStat[] | null;
};

const saveSettings = (settings: Settings) => {
  localStorage.setItem("settings", JSON.stringify(settings));
};

const loadSettings = () => {
  const settings = JSON.parse(localStorage.getItem("settings")!);
  return settings as Settings | null;
};

export { saveGameState, loadGameState, loadStats, loadSettings, saveSettings };

import React, { useEffect, useState } from "react";
import Board from "./components/GuessBoard/Board";
import Players from "./data/players.json";
import "./css/App.css";
import Guess from "./interfaces/Guess";
import evaluateGuess from "./util/evaluateGuess";
import constructPlayerObject from "./util/playerObject";
import Player from "./interfaces/Player";
import SearchBar from "./components/Search/SearchBar";
import Header from "./components/Header/Header";
import GuessCounter from "./components/GuessBoard/GuessCounter";
import { AiFillInfoCircle } from "react-icons/ai";
import { ImStatsDots } from "react-icons/im";
import { FiSettings } from "react-icons/fi";
import {
  loadGameState,
  loadSettings,
  saveGameState,
  saveSettings,
} from "./util/localStorage";
import ModalContainer from "./components/Modals/ModalContainer";
import Settings from "./interfaces/Settings";

function App() {
  const [currentPlayer, setCurrentPlayer] = useState<Player>({} as Player);
  const [guessedPlayers, setGuessedPlayers] = useState<Guess[]>([]);
  const [showEndGameModal, setShowEndGameModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [settings, setSettings] = useState<Settings>({} as Settings);

  const playAgain = () => {
    setShowEndGameModal(false);
    setGameFinished(false);
    const randomPlayer = Players[Math.floor(Math.random() * Players.length)];
    setCurrentPlayer(constructPlayerObject(randomPlayer));
    setGuessedPlayers([]);
    saveGameState(constructPlayerObject(randomPlayer), []);
  };
  const guessSelected = (player: Player) => {
    const guess = evaluateGuess(player, currentPlayer);
    let guesses = [...guessedPlayers, guess];
    setGuessedPlayers(guesses);
    let finished = false;
    let gameStat = { winner: false, guesses: guesses.length + 1 };
    if (player.id === currentPlayer.id) {
      finished = true;
      gameStat.winner = true;
      setShowEndGameModal(true);
    } else if (guessedPlayers.length === 5) {
      finished = true;
      setShowEndGameModal(true);
    }
    setGameFinished(finished);
    saveGameState(currentPlayer, guesses, finished ? gameStat : null);
  };

  const validPlayer = (player: any) => {
    if (settings.excludeRegions?.includes(player.region)) return false;
    if (settings.teamRequired && player.team?.toLowerCase() === "none")
      return false;
    if (settings.rlcsLanAppearancesRequired && player.rlcsLanAppearances === 0)
      return false;
    return true;
  };

  const changePlayer = () => {
    const filteredPlayers = Players.filter(validPlayer);
    const randomPlayer =
      filteredPlayers[Math.floor(Math.random() * filteredPlayers.length)];
    setCurrentPlayer(constructPlayerObject(randomPlayer));
    saveGameState(constructPlayerObject(randomPlayer), []);
    console.log(randomPlayer);
  };

  useEffect(() => {
    const savedGameState = loadGameState();
    let savedSettings = loadSettings();
    if (savedGameState) {
      setCurrentPlayer(savedGameState.currentPlayer);
      setGuessedPlayers(savedGameState.guessedPlayers);
      if (savedGameState.gameFinished) {
        setShowEndGameModal(true);
        setGameFinished(true);
      }
      return;
    } else {
      changePlayer();
    }
    if (!savedSettings) {
      const defaultSettings: Settings = {
        teamRequired: false,
        excludeRegions: [],
        rlcsLanAppearancesRequired: false,
      };
      saveSettings(defaultSettings);
      savedSettings = defaultSettings;
    }
  }, []);

  useEffect(() => {
    if (!settings || validPlayer(currentPlayer)) return;
    if (guessedPlayers.length !== 0 || gameFinished) return;
    changePlayer();
  }, [settings]);

  return (
    <div className="app">
      <div className="modals">
        <ModalContainer
          props={{
            playAgain,
            setShowStatsModal,
            setShowEndGameModal,
            setShowInfoModal,
            setShowSettingsModal,
            setSettings,
            showStatsModal,
            showEndGameModal,
            showInfoModal,
            showSettingsModal,
            currentPlayer,
            guessedPlayers,
            settings,
          }}
        />
      </div>
      <div className="header">
        <Header />
      </div>
      <SearchBar
        playersGuessed={guessedPlayers.map((guess) => guess.player)}
        guessSelected={guessSelected}
      />
      {guessedPlayers.length ? (
        <>
          <Board player={currentPlayer} guesses={guessedPlayers} />
          <GuessCounter numOfGuesses={guessedPlayers.length} />
        </>
      ) : null}
      <div className="button-modals">
        <div className="wrapper">
          <button onClick={() => setShowInfoModal(true)}>
            <AiFillInfoCircle /> Info
          </button>
          <button onClick={() => setShowStatsModal(true)}>
            <ImStatsDots /> Stats
          </button>
          <button onClick={() => setShowSettingsModal(true)}>
            <FiSettings /> Settings
          </button>
        </div>
      </div>
      {gameFinished && !showEndGameModal ? (
        <div className="playAgainContainer">
          <button className="playAgain" onClick={playAgain}>
            Play Again
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default App;

import React from "react";
import EndGame from "./EndGame";
import Info from "./Info";
import Stats from "./Stats";
import "../../css/Modal.css";
import Settings from "./Settings";
import SettingsType from "../../interfaces/Settings";

function ModalContainer({
  props: {
    showEndGameModal,
    setShowEndGameModal,
    setShowInfoModal,
    setShowSettingsModal,
    setShowStatsModal,
    playAgain,
    setSettings,
    showInfoModal,
    showSettingsModal,
    showStatsModal,
    currentPlayer,
    guessedPlayers,
    settings,
  },
}: {
  props: {
    showEndGameModal: boolean;
    playAgain: () => void;
    showInfoModal: boolean;
    showSettingsModal: boolean;
    setSettings: (arg0: any) => void;
    showStatsModal: boolean;
    setShowInfoModal: (arg0: boolean) => void;
    setShowSettingsModal: (arg0: boolean) => void;
    setShowStatsModal: (arg0: boolean) => void;
    setShowEndGameModal: (arg0: boolean) => void;
    currentPlayer: any;
    guessedPlayers: any;
    settings: SettingsType;
  };
}) {
  return (
    <div>
      {showEndGameModal ? (
        <EndGame
          playAgain={playAgain}
          showStats={() => {
            setShowStatsModal(true);
            setShowEndGameModal(false);
          }}
          close={() => setShowEndGameModal(false)}
          player={currentPlayer}
          guesses={guessedPlayers}
        />
      ) : null}
      {showInfoModal ? <Info close={() => setShowInfoModal(false)} /> : null}
      {showStatsModal ? <Stats close={() => setShowStatsModal(false)} /> : null}
      {showSettingsModal ? (
        <Settings
          settings={settings}
          setSettings={setSettings}
          close={() => setShowSettingsModal(false)}
        />
      ) : null}
    </div>
  );
}

export default ModalContainer;

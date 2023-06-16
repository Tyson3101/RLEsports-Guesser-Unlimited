import React, { useEffect, useRef, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Settings from "../../interfaces/Settings";
import { loadSettings, saveSettings } from "../../util/localStorage";

function SettingsModal({
  close,
  settings,
  setSettings,
}: {
  close: () => void;
  settings: Settings;
  setSettings: (arg0: Settings) => void;
}) {
  const [regions, setRegions] = useState([
    "EU",
    "NA",
    "OCE",
    "SAM",
    "SSA",
    "APAC",
    "MENA",
  ]);
  const [chips, setChips] = useState<string[]>([]);
  const regionRef = useRef<HTMLSelectElement>(null);
  const teamRequiredSettingRef = useRef<HTMLSelectElement>(null);
  const rlcsLanSettingRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const savedSettings = loadSettings();
    if (savedSettings) {
      setSettings(savedSettings);
      const newRegions = regions.filter(
        (region) => !savedSettings.excludeRegions.includes(region)
      );
      setRegions(newRegions);
      setChips(savedSettings.excludeRegions);
    } else {
      const defaultSettings: Settings = {
        teamRequired: false,
        excludeRegions: [],
        rlcsLanAppearancesRequired: false,
      };
      setSettings(defaultSettings);
      saveSettings(defaultSettings);
    }
  }, []);

  const handleChipDelete = (chipToDelete: string) => () => {
    const newRegions = [...regions];
    if (!newRegions.includes(chipToDelete)) {
      newRegions.push(chipToDelete);
    }
    setRegions(newRegions);
    const newChips = chips.filter((chip) => chip !== chipToDelete);
    setChips(newChips);
    setSettings({ ...settings, excludeRegions: newChips });
    saveSettings({ ...settings, excludeRegions: newChips });
  };

  const handleChipAdd = () => {
    const chipToAdd = regionRef.current?.value;
    if (!chipToAdd || regions.length === 1) return;
    const newRegions = regions.filter((region) => region !== chipToAdd);
    setRegions(newRegions);
    setChips([...chips, chipToAdd]);
    setSettings({ ...settings, excludeRegions: [...chips, chipToAdd] });
    saveSettings({ ...settings, excludeRegions: [...chips, chipToAdd] });
  };

  const saveSettingsHandler = () => {
    const newSettings: Settings = {
      teamRequired: teamRequiredSettingRef.current?.value === "true",
      excludeRegions: chips,
      rlcsLanAppearancesRequired: rlcsLanSettingRef.current?.value === "true",
    };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleSettingsChange = () => {
    const newSettings: Settings = {
      teamRequired: teamRequiredSettingRef.current?.value === "true",
      excludeRegions: chips,
      rlcsLanAppearancesRequired: rlcsLanSettingRef.current?.value === "true",
    };
    setSettings(newSettings);
  };

  return (
    <div className="modal">
      <div className="settingsModal">
        <div className="closeIcon" onClick={close}>
          <AiFillCloseCircle />
        </div>
        <div className="header">
          <h1>
            Settings <span className="emojis">⚙️⚙️⚙️</span>
          </h1>
        </div>
        <div className="line" />
        <div className="content">
          <h2>Team Required:</h2>
          <div className="wrapper">
            <select
              ref={teamRequiredSettingRef}
              value={settings.teamRequired?.toString()}
              onChange={handleSettingsChange}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
            <button
              className="button"
              type="button"
              onClick={saveSettingsHandler}
            >
              Save
            </button>
          </div>

          <div>
            <h2>Exclude Regions:</h2>
            <div className="excludeRegions wrapper">
              <div className={"chips " + (chips.length ? "hasChip" : "")}>
                {chips.map((region, i) => (
                  <div className="chip" key={i}>
                    {region}
                    <button
                      className="delete"
                      onClick={handleChipDelete(region)}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
              <select ref={regionRef}>
                {regions.map((region, i) => (
                  <option key={i} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <button className="button" type="button" onClick={handleChipAdd}>
                Add
              </button>
            </div>
          </div>
          <div>
            <h2>RLCS Lan Appearances Required:</h2>
            <div className="wrapper">
              <select
                value={settings.rlcsLanAppearancesRequired?.toString()}
                onChange={handleSettingsChange}
                ref={rlcsLanSettingRef}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
              <button
                className="button"
                type="button"
                onClick={saveSettingsHandler}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;

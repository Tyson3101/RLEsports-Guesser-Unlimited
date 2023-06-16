import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import PlayersJSON from "../../data/players.json";
import Player from "../../interfaces/Player";
import constructPlayerObject from "../../util/playerObject";
import "../../css/SearchBar.css";
import { AiOutlineSearch } from "react-icons/ai";

function SearchBar({
  playersGuessed,
  guessSelected,
}: {
  playersGuessed: Player[];
  guessSelected: (player: Player) => any;
}) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([] as Player[]);

  const Players = PlayersJSON.filter(
    ({ name }) => !playersGuessed.map((plyr) => plyr.name).includes(name)
  ) as Player[];

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : Players.filter(
          (player) =>
            player.name.toLowerCase().slice(0, inputLength) === inputValue
        ).map((player) => constructPlayerObject(player));
  };

  const getSuggestionValue = (suggestion: Player) => suggestion.name;

  const renderSuggestion = (suggestion: Player) => (
    <div className="suggestion">
      {suggestion.name} <span className="fullName">{suggestion.fullName}</span>
    </div>
  );

  const onChange = (_: any, { newValue }: { newValue: string }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value as string));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const selectedSuggestion = (
    _: any,
    { suggestion }: { suggestion: Player }
  ) => {
    setValue("");
    guessSelected(constructPlayerObject(suggestion));
  };

  const inputProps = {
    placeholder: "Enter a player's name",
    value,
    onChange: onChange,
  };

  const renderInputComponent = (inputProps: any) => (
    <div className="inputContainer">
      <span className="searchIcon">
        <AiOutlineSearch />
      </span>
      <input
        {...inputProps}
        autoCapitalize="none"
        autoCorrect="off"
        autoComplete="off"
        type="text"
        aria-label="Enter a player's name"
      />
    </div>
  );

  return (
    <div className={"searchBar " + (playersGuessed.length < 1 ? "center" : "")}>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={selectedSuggestion}
        renderInputComponent={renderInputComponent}
      />
    </div>
  );
}

export default SearchBar;

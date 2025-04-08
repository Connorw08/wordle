/**
 * Keyboard component for the Wordle game
 */

import React from "react";
import { TileState } from "./Tile";

type KeyboardProps = {
  target: string;
  guesses: string[];
  onKeyPress: (letter: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
};

export default function Keyboard({
  target,
  guesses,
  onKeyPress,
  onEnter,
  onBackspace,
}: KeyboardProps) {
  // Keyboard layout
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BKSP"],
  ];

  // Determine the state of each key based on past guesses
  const getKeyState = (key: string): TileState => {
    if (key === "ENTER" || key === "BKSP") {
      return TileState.Default;
    }

    let state = TileState.Default;

    for (const guess of guesses) {
      if (!guess) continue;

      for (let i = 0; i < guess.length; i++) {
        if (guess[i] !== key) continue;

        if (target[i] === key) {
          return TileState.Correct;
        } else if (target.includes(key)) {
          state = TileState.PartiallyCorrect;
        } else {
          if (state === TileState.Default) {
            state = TileState.Incorrect;
          }
        }
      }
    }

    return state;
  };

  // Get background color based on key state
  const getBackgroundColor = (key: string) => {
    const state = getKeyState(key);
    switch (state) {
      case TileState.Correct:
        return "bg-lime-600 text-white";
      case TileState.PartiallyCorrect:
        return "bg-yellow-500 text-white";
      case TileState.Incorrect:
        return "bg-slate-500 text-white";
      default:
        return "bg-slate-200";
    }
  };

  // Handle key press
  const handleKeyPress = (key: string) => {
    if (key === "ENTER") {
      onEnter();
    } else if (key === "BKSP") {
      onBackspace();
    } else {
      onKeyPress(key);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      {rows.map((row, i) => (
        <div key={i} className="flex flex-row gap-1">
          {row.map((key) => {
            const isSpecialKey = key === "ENTER" || key === "BKSP";
            return (
              <button
                key={key}
                className={`
                  ${isSpecialKey ? "px-3" : "px-4"} 
                  py-3 
                  rounded 
                  font-bold 
                  cursor-pointer
                  ${getBackgroundColor(key)}
                `}
                onClick={() => handleKeyPress(key)}
              >
                {key === "BKSP" ? "⌫" : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
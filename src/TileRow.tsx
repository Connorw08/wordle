/**
 * This file contains the functionality for a tile row. This will include five tiles and also
 * handle determining the state for each tile in the row.
 */

import Tile, { TileState } from "./Tile";

type TileRowProps = {
  target: string;
  guess: string;
  guessed: boolean;
};

export default function TileRow({ target, guess, guessed }: TileRowProps) {
  return (
    <div className="w-full flex flex-row justify-center gap-2 ">
      {[0, 1, 2, 3, 4].map((i) => (
        <Tile
          key={i}
          letter={i < guess.length ? guess[i] : null}
          state={
            guessed ? stateForTile(target, guess[i], i) : TileState.Default
          }
        />
      ))}
    </div>
  );
}

/**
 * TODO: We need to determine the state for each tile based on the target word, letter in the tile, and the letter's 
 * position in the guessed word. If the letter is in the target word, but not in the correct position, it should be
 * marked as partially correct. If the letter is in the correct position, it should be marked as correct.
 * If the letter is not in the target word, it should be marked as incorrect.
 * 
 * Note that the letter position is 0-indexed, so the first letter in the word is at position 0.
 * 
 * @returns {TileState} The state of the tile.
 */
function stateForTile(target: string, letter: string, letterPosition: number) {
   if (!letter) {
    return TileState.Default;
  }

  if (target[letterPosition] === letter) {
    return TileState.Correct;
  }

  if (target.includes(letter)) {
    return TileState.PartiallyCorrect;
  }

  return TileState.Incorrect;
}

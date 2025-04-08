/**
 * TODO
 * This file specifies the component for a single tile on the Wordle game grid.
 * 
 * You will be implementing this component from scratch. You will also be styling
 * the component using Tailwind CSS based on the provided specifications.
 * 
 * First, note the `TileState` enum below:
 */

export enum TileState {
  Default, // This tile is either empty or contains a letter that has not been guessed yet (white background)
  Incorrect, // This tile contains a letter that is not in the word (dark grey)
  PartiallyCorrect, // This tile contains a letter that is in the word but in the wrong placement (yellow)
  Correct, // This tile contains a letter in the correct placement (green)
}

type TileProps = { letter: string | null; state: TileState };

export default function Tile({ letter, state }: TileProps) {
const baseClasses = "w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold";
  
// State-specific classes
let stateClasses = "";

switch (state) {
  case TileState.Default:
    stateClasses = letter 
      ? "border-slate-500 text-black"
      : "border-slate-300 text-black";
    break;
  case TileState.Incorrect:
    stateClasses = "border-slate-500 bg-slate-500 text-white";
    break;
  case TileState.PartiallyCorrect:
    stateClasses = "border-yellow-500 bg-yellow-500 text-white";
    break;
  case TileState.Correct:
    stateClasses = "border-lime-600 bg-lime-600 text-white";
    break;
}

return (
  <div className={`${baseClasses} ${stateClasses}`}>
    {letter}
  </div>
);
}
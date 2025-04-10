import Tile, { TileState } from "./Tile";

type TileRowProps = {
  target: string;
  guess: string;
  guessed: boolean;
  onTileClick: () => void;
};

export default function TileRow({ target, guess, guessed, onTileClick }: TileRowProps) {
  return (
    <div className="w-full flex flex-row justify-center gap-2">
      {[0, 1, 2, 3, 4].map((i) => (
        <Tile
          key={i}
          letter={i < guess.length ? guess[i] : null}
          state={
            guessed ? stateForTile(target, guess[i], i) : TileState.Default
          }
          onClick={onTileClick}
        />
      ))}
    </div>
  );
}

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
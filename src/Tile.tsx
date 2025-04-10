export enum TileState {
  Default,
  Incorrect,
  PartiallyCorrect,
  Correct,
}

type TileProps = { 
  letter: string | null; 
  state: TileState;
  onClick: () => void;
};

export default function Tile({ letter, state, onClick }: TileProps) {
  const baseClasses = "w-12 h-12 md:w-14 md:h-14 border-2 flex items-center justify-center text-xl md:text-2xl font-bold";
  
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
    <div 
      className={`${baseClasses} ${stateClasses} touch-manipulation`}
      onClick={onClick}
    >
      {letter}
    </div>
  );
}
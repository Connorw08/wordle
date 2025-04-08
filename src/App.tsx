import { useEffect, useState } from "react";
import TileRow from "./TileRow";
import Keyboard from "./Keyboard";
import GameWon from "./GameWon";
import GameOver from "./GameOver";

export default function App() {
  // State variables for the game
  const [targetWord, setTargetWord] = useState<string>("");
  const [pastGuesses, setPastGuesses] = useState<string[]>(["", "", "", "", "", ""]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [activeRow, setActiveRow] = useState<number>(0);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  // Load the target word from the API
  useEffect(() => {
    const fetchWord = async () => {
      try {
        const response = await fetch('https://a04-wordle-api.vercel.app/api/random-word');
        const data = await response.json();
        setTargetWord(data.word.toUpperCase());
      } catch (error) {
        console.error('Error fetching word:', error);
      }
    };
    fetchWord();
  }, []);

  // Add keyboard support for typing letters
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      
      if (key === 'ENTER') {
        makeGuess();
      } else if (key === 'BACKSPACE') {
        onBackspace();
      } else if (/^[A-Z]$/.test(key)) {
        onKeyPress(key);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [currentGuess]);

  // Handle letter key presses
  const onKeyPress = (letter: string) => {
    if (currentGuess.length < 5) {
      setCurrentGuess(prev => prev + letter);
    }
  };

  // Handle backspace key presses
  const onBackspace = () => {
    if (currentGuess.length > 0) {
      setCurrentGuess(prev => prev.slice(0, -1));
    }
  };

  // Check if a guess is a valid word
  const checkGuessValidity = async (guess: string) => {
    try {
      const response = await fetch(`https://a04-wordle-api.vercel.app/api/word-valid/${guess}`);
      const data = await response.json();
      return data.valid;
    } catch (error) {
      console.error('Error checking word validity:', error);
      return false;
    }
  }

  // Process a guess when Enter is pressed
  const makeGuess = async () => {
    if (currentGuess.length !== 5) {
      window.alert("Please enter a 5-letter word");
      return;
    }

    const isValid = await checkGuessValidity(currentGuess);
    if (!isValid) {
      window.alert("This is not a valid word.");
      return;
    }
    
    // Update past guesses
    const newPastGuesses = [...pastGuesses];
    newPastGuesses[activeRow] = currentGuess;
    setPastGuesses(newPastGuesses);
    
    // Clear current guess and increment active row
    setCurrentGuess("");
    setActiveRow(prev => prev + 1);

    // Check if game is won
    if (currentGuess === targetWord) {
      setTimeout(() => setGameWon(true), 100);
      return;
    }

    // Check if game is over (no more guesses)
    if (activeRow >= 5) {
      setTimeout(() => setGameOver(true), 100);
    }
  };

  if (gameWon) {
    return (<GameWon target={targetWord} />);
  }

  if (gameOver) {
    return (<GameOver target={targetWord} />);
  }

  return (
    <div className="w-full h-screen max-h-[-webkit-fill-available] flex flex-col justify-between items-center relative">
      <p className="w-full pl-4 py-2 text-lg font-bold">Wordle</p>
      <div className="w-full flex flex-col gap-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <TileRow
            key={i}
            target={targetWord}
            guess={activeRow === i ? currentGuess : pastGuesses[i]}
            guessed={activeRow > i}
          />
        ))}
      </div>
      <div className="my-12">
        <Keyboard
          target={targetWord}
          guesses={pastGuesses}
          onKeyPress={onKeyPress}
          onEnter={makeGuess}
          onBackspace={onBackspace}
        />
      </div>
      <div className="absolute bottom-2 right-4 text-slate-500 text-sm">
        Made by Connor Whitlow
      </div>
    </div>
  );
}
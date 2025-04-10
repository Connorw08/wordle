type GameWonProps = { target: string };
export default function GameWon({ target }: GameWonProps) {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center px-4">
                <h1 className="text-3xl md:text-4xl font-bold text-lime-600 text-center">Congratulations!</h1>
                <p className="mt-4 text-center text-slate-500">Correct word: <strong className="font-bold">{target}</strong></p>
                <div className="mt-8 w-36 h-10 bg-slate-400 rounded-lg flex items-center justify-center font-bold cursor-pointer text-white" onClick={() => window.location.reload()}>
                    Play Again
                </div>
        </div>
    )
}
import { useState, useRef, useEffect } from "react"

export default function GameBoard() {
    const [tiles, setTiles] = useState<(string | null)[]>(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] =useState<string>("X");
    const [gameMessage, setGameMessage] = useState<string>(`Player ${currentPlayer}'s turn`);

    useEffect(() => {
        setGameMessage(`Player ${currentPlayer}'s turn`);
    }, [currentPlayer]);

    function tileClicked(index: number) {
        setTiles(previousArray => {
            const newArray = [...previousArray];
            newArray[index] = currentPlayer;
            return newArray;
        });

        SwitchPlayer();
    }

    function SwitchPlayer() {
        if (currentPlayer == "X") {
            setCurrentPlayer("O");
        } else {
            setCurrentPlayer("X");
        }
    }

    function StartNewGame() {
        SwitchPlayer();
        const cleanGameGrid: (string | null)[] = (Array(9).fill(null));
        setTiles(cleanGameGrid);
    }

    return (
        <>
            <span className="game-message-span">{gameMessage}</span>
            <div className="game-board-card">
                {tiles.map((value, index) => (
                    <button key={index} className="tile-button" onClick={() => tileClicked(index)}>{value}</button>
                ))}
            </div>
            <button className="start-button" onClick={StartNewGame}>Start new game</button>
        </>
    )
}
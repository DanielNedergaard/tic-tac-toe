import { useState, useRef } from "react"

export default function GameBoard() {
    const [tiles, setTiles] = useState<(string | null)[]>(Array(9).fill(null));
    const currentPlayer =useRef<string>("X");
    const [gameMessage, setGameMessage] = useState<string>(`Player ${currentPlayer.current}'s turn`);

    function tileClicked(index: number) {
        setTiles(previousArray => {
            const newArray = [...previousArray];
            newArray[index] = currentPlayer.current;
            return newArray;
        });

        // Switch player
        if (currentPlayer.current == "X") {
            currentPlayer.current = "O";
            setGameMessage(`Player ${currentPlayer.current}'s turn`);
        } else {
            currentPlayer.current = "X";
            setGameMessage(`Player ${currentPlayer.current}'s turn`);
        }
    }

    return (
        <>
            <span className="game-message-span">{gameMessage}</span>
            <div className="game-board-card">
                {tiles.map((value, index) => (
                    <button key={index} className="tile-button" onClick={() => tileClicked(index)}>{value}</button>
                ))}
            </div>
            <button className="start-button">Start new game</button>
        </>
    )
}
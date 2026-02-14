import { useState, useRef } from "react"

export default function GameBoard() {
    const [gameMessage, setGameMessage] = useState<string>("Player X's turn");
    const [tiles, setTiles] = useState<(string | null)[]>(Array(9).fill(null));
    const tileIndex =useRef<number | null>(null);

    function tileClicked(index: number) {
        setTiles(previousArray => {
            const newArray = [...previousArray];
            newArray[index] = "X";
            return newArray;
        });
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
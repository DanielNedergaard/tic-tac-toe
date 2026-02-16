import { useState, useEffect, useRef } from "react"

export default function GameBoard() {
    const [tiles, setTiles] = useState<(string | null)[]>(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] =useState<string>("X");
    const [gameMessage, setGameMessage] = useState<string>(`Player ${currentPlayer}'s turn`);
    const totalPlacedMarks = useRef<number>(0);
    const maxTotalCurrentMarks: number = 6;
    // const currentMarksOfX = useRef<number>(0);
    // const currentMarksOfO = useRef<number>(0);
    const isPlacingMark = useRef<boolean>(true);

    useEffect(() => {
        setGameMessage(`Player ${currentPlayer}'s turn`);
    }, [currentPlayer]);

    function tileClicked(index: number) {
        if (tiles[index] !== null && totalPlacedMarks.current < maxTotalCurrentMarks)
            return;
        if ((tiles[index] !== currentPlayer || null) && totalPlacedMarks.current >= maxTotalCurrentMarks && isPlacingMark.current)
            return;
        
        if (totalPlacedMarks.current >= maxTotalCurrentMarks) {
            isPlacingMark.current = !isPlacingMark.current;
        }

        setTiles(tiles =>
            tiles.map((t, i) =>
                i === index ? currentPlayer : t
            )
        );

        totalPlacedMarks.current += 1;
        // (currentPlayer == "X") ? currentMarksOfX.current += 1 : currentMarksOfO.current += 1;
        console.log(`totalPlacedMarks: ${totalPlacedMarks.current}`);
        if (isPlacingMark.current) {
            SwitchPlayer();
        }
    }

    function SwitchPlayer() {
        (currentPlayer == "X") ? setCurrentPlayer("O") : setCurrentPlayer("X");
    }

    function StartNewGame() {
        SwitchPlayer();
        const cleanGameGrid: (string | null)[] = (Array(9).fill(null));
        setTiles(cleanGameGrid);
        totalPlacedMarks.current = 0;
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
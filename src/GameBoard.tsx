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
    const lastRemovedMark =useRef<number | null>(null);

    useEffect(() => {
        setGameMessage(`Player ${currentPlayer}'s turn`);
    }, [currentPlayer]);

    function handleTileClick(index: number) {
        const clickedTile = tiles[index];
        // Do nothing when clicking a tile marked by the player when they're placing a mark
        if (clickedTile === currentPlayer && isPlacingMark.current)
            return;
        // Do nothing when clicking a tile marked by the other player
        if (clickedTile !== currentPlayer && tiles[index] !== null)
            return;
        // Do nothing when clicking a tile not marked by the player when removing a mark
        if ((clickedTile !== currentPlayer || null) && !isPlacingMark.current)
            return;
        // do nothing when clicking a tile which the player just removed a mark from
        if (index === lastRemovedMark.current)
            return;
        
        if (isPlacingMark.current) {
            updateTile(index, currentPlayer)
            lastRemovedMark.current = null;
        } else {
            updateTile(index, null);
            lastRemovedMark.current = index;
        }

        totalPlacedMarks.current += 1;

        if (isPlacingMark.current) {
            SwitchPlayer();
        }

        // switch between removing and placing marks after 6 marks are placed
        if (totalPlacedMarks.current >= maxTotalCurrentMarks) {
            isPlacingMark.current = !isPlacingMark.current;
        }
    }

    function updateTile(index: number, value: string | null ) {
        setTiles(tiles =>
            tiles.map((t, i) =>
                i === index ? value : t
            )
        );
    }

    function SwitchPlayer() {
        (currentPlayer == "X") ? setCurrentPlayer("O") : setCurrentPlayer("X");
    }

    function StartNewGame() {
        SwitchPlayer();
        const cleanGameGrid: (string | null)[] = (Array(9).fill(null));
        setTiles(cleanGameGrid);
        totalPlacedMarks.current = 0;
        isPlacingMark.current = true;
        lastRemovedMark.current = null;
    }

    return (
        <>
            <span className="game-message-span">{gameMessage}</span>
            <div className="game-board-card">
                {tiles.map((value, index) => (
                    <button key={index} className="tile-button" onClick={() => handleTileClick(index)}>{value}</button>
                ))}
            </div>
            <button className="start-button" onClick={StartNewGame}>Start new game</button>
        </>
    )
}
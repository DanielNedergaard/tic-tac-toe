import { useState, useEffect, useRef } from "react"
import useSound from "use-sound";
import victoryFanfare from './assets/victory-fanfare.mp3';

export default function GameBoard() {
    const [tiles, setTiles] = useState<(string | null)[]>(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<string>("X");
    const [gameMessage, setGameMessage] = useState<string>(`Player ${currentPlayer}'s turn`);
    const totalPlacedMarks = useRef<number>(0);
    const maxTotalCurrentMarks: number = 6;
    const isPlacingMark = useRef<boolean>(true);
    const lastRemovedMark = useRef<number | null>(null);
    const [playVictoryFanfare] = useSound(victoryFanfare, { volume: 0.5 });
    const isGameOver = useRef<boolean>(false);

    const winnerLines: number[][] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    useEffect(() => {
        setGameMessage(`Player ${currentPlayer}'s turn`);
    }, [currentPlayer]);

    function handleTileClick(index: number) {
        const clickedTile = tiles[index];
        // Do nothing when clicking a tile marked by the player when they're placing a mark
        if (clickedTile === currentPlayer && isPlacingMark.current)
            return;
        // Do nothing when clicking a tile marked by the other player
        if (clickedTile !== currentPlayer && clickedTile !== null)
            return;
        // Do nothing when clicking a tile not marked by the player when removing a mark
        if ((clickedTile !== currentPlayer) && !isPlacingMark.current)
            return;
        // Do nothing when clicking a tile which the player just removed a mark at
        if (index === lastRemovedMark.current)
            return;
        if (isGameOver.current)
            return;
        
        let newTiles: (string | null)[]; 
        if (isPlacingMark.current) {
            newTiles = createNewTiles(index, currentPlayer)
            lastRemovedMark.current = null;
            setTiles(newTiles);
            totalPlacedMarks.current += 1;
            if (hasPlayerWon(newTiles)){
                setGameMessage(`Player ${currentPlayer} has won!`);
                playVictoryFanfare();
                isGameOver.current = true;
                return;
            }
        } else {
            newTiles = createNewTiles(index, null);
            lastRemovedMark.current = index;
            setTiles(newTiles);
        }

        if (isPlacingMark.current) {
            switchPlayer();
        }

        // switch between removing and placing marks after 6 marks are placed
        if (totalPlacedMarks.current >= maxTotalCurrentMarks) {
            isPlacingMark.current = !isPlacingMark.current;
        }
    }

    function createNewTiles(index: number, value: string | null ): (string | null)[] {
        return tiles.map((t, i) =>
            i === index ? value : t
        );
    }

    function switchPlayer() {
        (currentPlayer == "X") ? setCurrentPlayer("O") : setCurrentPlayer("X");
    }

    function hasPlayerWon(newTiles: (string | null)[]): boolean {
        for (let row = 0; row < winnerLines.length; row++) {
            const [a, b, c] = winnerLines[row];
            if (newTiles[a] === currentPlayer && newTiles[b] === currentPlayer && newTiles[c] === currentPlayer )
                return true;
        }
        return false;
    }

    function startNewGame() {
        switchPlayer();
        const cleanGameGrid: (string | null)[] = (Array(9).fill(null));
        setTiles(cleanGameGrid);
        totalPlacedMarks.current = 0;
        isPlacingMark.current = true;
        lastRemovedMark.current = null;
        isGameOver.current = false;
    }

    return (
        <>
            <span className="game-message-span">{gameMessage}</span>
            <div className="game-board-card">
                {tiles.map((value, index) => (
                    <button key={index} className="tile-button" onClick={() => handleTileClick(index)}>{value}</button>
                ))}
            </div>
            <button className="start-button" onClick={startNewGame}>Start new game</button>
        </>
    )
}
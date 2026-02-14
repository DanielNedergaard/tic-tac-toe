export default function GameBoard() {
    return (
        <div className="game-board-card">
            <span className="game-message-span">This is a message to the players</span>
            <div className="tile-row">
                <button className="tile-button"></button>
                <button className="tile-button"></button>
                <button className="tile-button"></button>
            </div>
            <div className="tile-row">
                <button className="tile-button"></button>
                <button className="tile-button"></button>
                <button className="tile-button"></button>
            </div>
            <div className="tile-row">
                <button className="tile-button"></button>
                <button className="tile-button"></button>
                <button className="tile-button"></button>
            </div>
            <button className="start-button">Start new game</button>
        </div>
    )
}
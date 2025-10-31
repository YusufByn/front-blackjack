import { useState } from 'react'

function Blackjack() {

    const [playerScore, setPlayerScore] = useState(0)
    const [computerScore, setComputerScore] = useState(0)
    const [message, setMessage] = useState('')
    const [playerWon, setPlayerWon] = useState(null)
    const [gameOver, setGameOver] = useState(false)
    const [loading, setLoading] = useState(false)
    const [playerDraw, setPlayerDraw] = useState(null)
    const [computerDraw, setComputerDraw] = useState(null)

    const handleHit = async () => {
        setLoading(true)
        setMessage('')
        setPlayerDraw(null)
        setComputerDraw(null)

        try {
            const response = await fetch('http://localhost:3000/Blackjack', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    playerScore: playerScore,
                    computerScore: computerScore
                })
            })

            const data = await response.json()
            console.log(data)
            
            setMessage(data.message)
            setPlayerScore(data.playerNewScore)
            setComputerScore(data.computerNewScore)
            setPlayerDraw(data.playerDraw)
            setComputerDraw(data.computerDraw)
            setPlayerWon(data.playerWon)
            setGameOver(data.gameOver)

        } catch (error) {
            setMessage('Erreur lors de la communication avec le serveur')
            setPlayerWon(false)
            console.error('Erreur:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleStop = async () => {
        setLoading(true)
        setMessage('')

        try {
            const response = await fetch('http://localhost:3000/Stop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    playerScore: playerScore,
                    computerScore: computerScore
                })
            })

            const data = await response.json()
            console.log(data)
            
            setMessage(data.message)
            setPlayerWon(data.playerWon)
            setGameOver(data.gameOver)

        } catch (error) {
            setMessage('Erreur lors de la communication avec le serveur')
            setPlayerWon(false)
            console.error('Erreur:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleReset = () => {
        setPlayerScore(0)
        setComputerScore(0)
        setMessage('')
        setPlayerWon(null)
        setGameOver(false)
        setPlayerDraw(null)
        setComputerDraw(null)
    }

    return (
        <div className="blackjack-container">
            <h2>Blackjack</h2>
            
            <div className="scores">
                <p>Score Joueur: {playerScore}</p>
                <p>Score Ordinateur: {computerScore}</p>
            </div>

            {playerDraw !== null && (
                <div className="card-info">
                    <p>Carte tirée par le joueur: {playerDraw}</p>
                </div>
            )}

            {computerDraw !== null && (
                <div className="card-info">
                    <p>Carte tirée par l'ordinateur: {computerDraw}</p>
                </div>
            )}

            <div className="buttons">
                <button onClick={handleHit} disabled={loading || gameOver}>
                    {loading ? 'Envoi...' : 'Tirer une carte'}
                </button>
                <button onClick={handleStop} disabled={loading || gameOver}>
                    Stop
                </button>
                <button onClick={handleReset}>
                    Nouvelle partie
                </button>
            </div>

            {message && (
                <div className={`message ${playerWon === true ? 'success' : playerWon === false ? 'error' : ''}`}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default Blackjack;


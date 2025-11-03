import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function SecondQcm() {

    const navigate = useNavigate()
    const [question, setQuestion] = useState('')
    const [areaAnswer, setAreaAnswer] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchQuestion()
    }, [])

    const fetchQuestion = async () => {
        setLoading(true)
        try {
            const response = await fetch('http://localhost:3000/Qcm/2')
            const data = await response.json()
            setQuestion(data.question)
            setMessage('')
        } catch (error) {
            setMessage('Erreur lors du chargement de la question')
            console.error('Erreur:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!areaAnswer.trim()) {
            setMessage('Veuillez entrer une réponse')
            return
        }

        setLoading(true)
        setMessage('')

        try {
            // on fetch la question 2 avec la réponse saisie
            const response = await fetch(`http://localhost:3000/Qcm/2?answer=${encodeURIComponent(areaAnswer)}`)
            // on récupère le message de la question 2
            const data = await response.json()
            setMessage(data.message)

            // Si bonne réponse, redirection vers la question 3
            if (data.message === 'Bonne réponse') {
                setTimeout(() => {
                    navigate('/qcm3')
                }, 500) 
            }

        } catch (error) {
            setMessage('Erreur lors de la communication avec le serveur')
            console.error('Erreur:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="qcm-container">
            <h2>Question 2</h2>

            {loading && !question ? (
                <p>Chargement de la question...</p>
            ) : (
                <>
                    <div className="question">
                        <p>{question}</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <textarea
                            className="answer-textarea"
                            placeholder="Entrez votre réponse ici..."
                            value={areaAnswer}
                            onChange={(e) => setAreaAnswer(e.target.value)}
                            rows="5"
                            required
                        />

                        <button type="submit" disabled={loading || !areaAnswer.trim()}>
                            {loading ? 'Envoi...' : 'Valider'}
                        </button>
                    </form>
                </>
            )}

            {message && (
                <div className={`message ${message === 'Bonne réponse' ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default SecondQcm;


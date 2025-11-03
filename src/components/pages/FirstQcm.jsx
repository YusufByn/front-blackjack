import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function FirstQcm() {

    const navigate = useNavigate()
    const [question, setQuestion] = useState('')
    const [reponses, setReponses] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchQuestion()
    }, [])

    // fonction async ou l'on fetch la question 1 et les réponses pour seulement les afficher
    const fetchQuestion = async () => {
        setLoading(true)
        try {
            // on fetch la question 1
            const response = await fetch('http://localhost:3000/Qcm/1')
            const data = await response.json()
            setQuestion(data.question)
            setReponses(data.reponses || [])
            setMessage('')
        } catch (error) {
            setMessage('Erreur lors du chargement de la question')
            console.error('Erreur:', error)
        } finally {
            setLoading(false)
        }
    }

    // fonction async ou l'on fetch la question 1 avec la réponse sélectionnée
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!selectedAnswer) {
            setMessage('Veuillez sélectionner une réponse')
            return
        }

        setLoading(true)
        setMessage('')

        try {
            // on fetch la question 1 avec la réponse sélectionnée
            const response = await fetch(`http://localhost:3000/Qcm/1?answer=${selectedAnswer}`)
            const data = await response.json()
            setMessage(data.message)

            // si le message est "bonne réponse" on redirige vers la question 2
            if (data.message === 'Bonne réponse') {
                setTimeout(() => {
                    navigate('/qcm2')
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
            <h2>Question 1</h2>

            {loading && !question ? (
                <p>Chargement de la question...</p>
            ) : (
                <>
                    <div className="question">
                        <p>{question}</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="answers">
                            {reponses.map((reponse, index) => {
                                const answerLetter = index === 0 ? 'A' : 'B'
                                return (
                                    <label key={index} className="answer-option">
                                        <input
                                            type="radio"
                                            name="answer"
                                            value={answerLetter}
                                            checked={selectedAnswer === answerLetter}
                                            onChange={(e) => setSelectedAnswer(e.target.value)}
                                        />
                                        <span>{answerLetter}. {reponse}</span>
                                    </label>
                                )
                            })}
                        </div>

                        <button type="submit" disabled={loading || !selectedAnswer}>
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

export default FirstQcm;


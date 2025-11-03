import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ThirdQcm() {

    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchResult()
    }, [])

    // fonction async ou l'on fetch le resultat de la question 3
    const fetchResult = async () => {
        try {
            const response = await fetch('http://localhost:3000/Qcm/3')
            const data = await response.json()
            setMessage(data.message)
        } catch (error) {
            setMessage('Erreur lors du chargement du résultat')
            console.error('Erreur:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="qcm-container">
            <h2>Félicitations !</h2>

            {loading ? (
                <p>Chargement...</p>
            ) : (
                <>
                    <div className="question">
                        <p>{message}</p>
                    </div>

                    {/* // bouton pour retourner à l'accueil */}
                    <button onClick={() => navigate('/')} style={{ marginTop: '20px' }}>
                        Retour à l'accueil
                    </button>
                </>
            )}
        </div>
    );
}

export default ThirdQcm;


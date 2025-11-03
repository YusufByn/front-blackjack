// formulaire qui contient les champs suivants : pseudo, text area, age, mdp 6 caractères minimum et un mail valide

import { useState } from 'react'

function Form() {

    const [pseudo, setPseudo] = useState('')
    const [text, setText] = useState('')
    const [age, setAge] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [isValid, setIsValid] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {
            const response = await fetch('http://localhost:3000/CheckForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pseudo: pseudo,
                    text: text,
                    age: age,
                    password: password,
                    email: email
                })
            })

            const data = await response.json()
            console.log(data)
            setMessage(data.message)
            setIsValid(data.isValid)

        } catch (error) {
            setMessage('Erreur lors de la communication avec le serveur')
            setIsValid(false)
            console.error('Erreur:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <input type="text" placeholder="Pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} required />
            <textarea placeholder="Text" value={text} onChange={(e) => setText(e.target.value)} required />
            <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
            <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit" disabled={loading}>
                {loading ? 'Envoi...' : 'Submit'}
            </button>
            {message && (
                <div className={`message ${isValid ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}
        </form>
    );
}

export default Form;
import { Link } from 'react-router-dom'

function HeaderNav() {
    return (
        <nav>
            <Link to="/">Accueil</Link>
            <Link to="/blackjack">Blackjack</Link>
            <Link to="/qcm">QCM</Link>
        </nav>
    );
}

export default HeaderNav;


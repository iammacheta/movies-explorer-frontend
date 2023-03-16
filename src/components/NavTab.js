import { Link } from 'react-router-dom';

export default function NavTab() {
    return (
        <nav className="nav-tab">
            <Link to="/signup" className="nav-tab__signup">Регистрация</Link>
            <Link to="/signin" className="nav-tab__signin">Войти</Link>
        </nav>
    );
}

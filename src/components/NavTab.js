import { Link } from 'react-router-dom';

export default function NavTab() {
    return (
        <nav className="nav-tab">
            <Link to="TODO" className="nav-tab__signup">Регистрация</Link>
            <Link to="TODO" className="nav-tab__signin">Войти</Link>
        </nav>
    );
}

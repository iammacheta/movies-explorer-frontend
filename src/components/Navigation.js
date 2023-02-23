import { NavLink } from 'react-router-dom';
import iconMain from '../images/icon-main.svg';

export default function Navigation() {
    const activeStyle = {
        fontWeight: '500',
    };

    return (
        <nav className="navigation">
            <div className="navigation__films">
                <NavLink to="/movies" className="navigation__movies" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Фильмы</NavLink>
                <NavLink to="/saved-movies" className="navigation__saved-movies" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Сохраненные фильмы</NavLink>
            </div>
            <NavLink to="/profile" className="navigation__account">
                <p className="navigation__account-link">Аккаунт</p>
                <img className="navigation__account-icon" src={iconMain} alt="иконка аккаунта" />
            </NavLink>
        </nav>
    );
}

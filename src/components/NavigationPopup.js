import { NavLink } from 'react-router-dom';
import iconMain from '../images/icon-main.svg';

export default function NavigationPopup({ onClose }) {
    const activeStyle = { // Для стилей активной ссылки NavLink
        borderBottom: '1px solid',
    };

    return (
        <div className="navigation-popup">
            <div className="navigation-popup__cover" />
            <div className="navigation-popup__container">
                <button className="navigation-popup__close-button" type="button" aria-label="Close-icon" onClick={onClose} />
                <nav className="navigation-popup__links-container">
                    <div className="navigation__films navigation__films_popup">
                        <NavLink to="/" className="navigation-popup__homepage" style={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={onClose}>Главная</NavLink>
                        <NavLink to="/movies" className="navigation__movies navigation__movies_popup" style={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={onClose}>Фильмы</NavLink>
                        <NavLink to="/saved-movies" className="navigation__movies navigation__movies_popup" style={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={onClose}>Сохраненные фильмы</NavLink>
                    </div>
                    <div className="navigation__account navigation__account_popup">
                        <NavLink to="/profile" className="navigation__account-link navigation__account-link_popup" style={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={onClose}>Аккаунт</NavLink>
                        <img className="navigation__account-icon" src={iconMain} alt="иконка аккаунта" />
                    </div>
                </nav>
            </div>
        </div>
    );
}

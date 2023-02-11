import { NavLink } from 'react-router-dom';
import iconMain from '../images/icon-main.svg';

export default function NavigationPopup() {
  const activeStyle = { // Для стилей активной ссылки NavLink
    borderBottom: '1px solid',
  };

  const menuIsOpened = !true;

  return (
    <div className={menuIsOpened ? 'navigation-popup' : 'navigation-popup_closed'}>
      <div className="navigation-popup__cover" />
      <div className="navigation-popup__container">
        <button className="navigation-popup__close-button" type="button" aria-label="Close-icon" /* onClick={ TODO} */ />
        <nav className="navigation-popup__links-container">
          <div className="navigation__films navigation__films_popup">
            <NavLink to="TODO" className="navigation-popup__homepage" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Главная</NavLink>
            <NavLink to="TODOM" className="navigation__movies navigation__movies_popup" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Фильмы</NavLink>
            <NavLink to="TODOMM" className="navigation__movies navigation__movies_popup" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Сохраненные фильмы</NavLink>
          </div>
          <div className="navigation__account navigation__account_popup">
            <NavLink to="TODOMMM" className="navigation__account-link navigation__account-link_popup" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Аккаунт</NavLink>
            <img className="navigation__account-icon" src={iconMain} alt="иконка аккаунта" />
          </div>
        </nav>
      </div>
    </div>
  );
}

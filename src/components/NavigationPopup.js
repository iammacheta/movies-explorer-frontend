import { NavLink } from "react-router-dom";
import iconMain from '../images/icon-main.svg'

export default function NavigationPopup() {

    let activeStyle = { // Для стилей активной ссылки NavLink
        borderBottom: "1px solid" 
    };

    let menuIsOpened = !true;

    return (
        <div className={menuIsOpened ? "navigation-popup" : "navigation-popup_closed"}>
            <div className="navigation-popup__cover">
            </div>
            <div className="navigation-popup__container">
                <button className="navigation-popup__close-button" type="button" /* onClick={ TODO} */ />
                <div className="navigation-popup__links-container">
                    <div className="navigation-main__films navigation-main__films_popup">
                        <NavLink to={"TODO"} className="navigation-popup__homepage" style={({ isActive }) =>isActive ? activeStyle : undefined} >Главная</NavLink>
                        <NavLink to={"TODOM"} className="navigation-main__movies navigation-main__movies_popup" style={({ isActive }) =>isActive ? activeStyle : undefined}>Фильмы</NavLink>
                        <NavLink to={"TODOMM"} className="navigation-main__movies navigation-main__movies_popup" style={({ isActive }) =>isActive ? activeStyle : undefined}>Сохраненные фильмы</NavLink>
                    </div>
                    <div className="navigation-main__account navigation-main__account_popup">
                        <NavLink to={"TODOMMM"} className="navigation-main__account-link navigation-main__account-link_popup" style={({ isActive }) =>isActive ? activeStyle : undefined}>Аккаунт</NavLink>
                        <img className="navigation-main__account-icon" src={iconMain} alt="иконка аккаунта" />
                    </div>
                </div>
            </div>
        </div>
    )
}
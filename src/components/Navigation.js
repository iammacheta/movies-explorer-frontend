import { Link } from "react-router-dom";
import iconMain from '../images/icon-main.svg'

export default function Navigation() {

    return (
        <nav className="navigation">
            <div className="navigation__films">
                <Link to={"TODO"} className="navigation__movies">Фильмы</Link>
                <Link to={"TODO"} className="navigation__saved-movies">Сохраненные фильмы</Link>
            </div>
            <div className="navigation__account">
                <Link to={"TODO"} className="navigation__account-link">Аккаунт</Link>
                <img className="navigation__account-icon" src={iconMain} alt="иконка аккаунта" />
            </div>
        </nav>
    )
}
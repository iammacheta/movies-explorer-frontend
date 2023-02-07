import { Link } from "react-router-dom";
import iconMain from '../images/icon-main.svg'

export default function NavigationMain() {

    return (
        <div className="navigation-main">
            <div className="navigation-main__films">
                <Link to={"TODO"} className="navigation-main__movies">Фильмы</Link>
                <Link to={"TODO"} className="navigation-main__saved-movies">Сохраненные фильмы</Link>
            </div>
            <div className="navigation-main__account">
                <Link to={"TODO"} className="navigation-main__account-link">Аккаунт</Link>
                <img className="navigation-main__account-icon" src={iconMain} alt="иконка аккаунта" />
            </div>
        </div>
    )
}
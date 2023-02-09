import { Link } from "react-router-dom";

export default function NavTab() {

    return (
        <div className="nav-tab">
            <Link to={"TODO"} className="nav-tab__signup">Регистрация</Link>
            <Link to={"TODO"} className="nav-tab__signin">Войти</Link>
        </div>
    )
}
import { Link } from "react-router-dom";

export default function NavigationLanding() {

    return (
        <div className="navigation-landing">
            <Link to={"TODO"} className="navigation-landing__signup">Регистрация</Link>
            <Link to={"TODO"} className="navigation-landing__signin">Войти</Link>
        </div>
    )
}
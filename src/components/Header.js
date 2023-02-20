import { Link } from 'react-router-dom';

import NavTab from './NavTab';
import Navigation from './Navigation';
import NavigationPopup from './NavigationPopup';

import logo from '../images/logo.svg';

function Header() {
    const isLanding = !true; // TODO
    const menuIsOpened = !true; // TODO

    return (
        <header className="header">
            <Link to="/"><img className="header__logo" src={logo} alt="логотип" /></Link>
            {isLanding ? <NavTab /> : <Navigation />}
            {isLanding || (<button className={menuIsOpened ? 'header__burger-menu_active' : 'header__burger-menu'} type="button" aria-label="Burger-menu" />)}
            {menuIsOpened && <NavigationPopup />}
        </header>
    );
}

export default Header;

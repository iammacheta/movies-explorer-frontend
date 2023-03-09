import { Link, useLocation } from 'react-router-dom';

import { useContext, useState } from 'react';
import { LoggedInStatus } from '../contexts/LoggedInStatus';

import NavTab from './NavTab';
import Navigation from './Navigation';
import NavigationPopup from './NavigationPopup';

import logo from '../images/logo.svg';

function Header() {
    const location = useLocation();
    const loggedIn = useContext(LoggedInStatus);

    const [menuIsOpened, setMenuIsOpened] = useState(false);

    function handleMenuClick() {
        setMenuIsOpened(!menuIsOpened);
    };

    return (
        <header className={location.pathname === '/' ? "header header_main" : "header"}>
            <Link to="/"><img className="header__logo" src={logo} alt="логотип" /></Link>
            {loggedIn ? <Navigation /> : <NavTab />}
            {!loggedIn || (<button className={menuIsOpened ? 'header__burger-menu_active' : 'header__burger-menu'} type="button" aria-label="Burger-menu" onClick={handleMenuClick} />)}
            {menuIsOpened && <NavigationPopup onClose={handleMenuClick} />}
        </header>
    );
}

export default Header;

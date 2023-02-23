import { Link, useLocation } from 'react-router-dom';

import { useState } from 'react';

import NavTab from './NavTab';
import Navigation from './Navigation';
import NavigationPopup from './NavigationPopup';

import logo from '../images/logo.svg';

function Header() {
    const location = useLocation();

    const [menuIsOpened, setMenuIsOpened] = useState(false);

    function handleMenuClick() {
        setMenuIsOpened(!menuIsOpened);
    };

    return (
        <header className="header">
            <Link to="/"><img className="header__logo" src={logo} alt="логотип" /></Link>
            {location.pathname === '/' ? <NavTab /> : <Navigation />}
            {location.pathname === '/' || (<button className={menuIsOpened ? 'header__burger-menu_active' : 'header__burger-menu'} type="button" aria-label="Burger-menu" onClick={handleMenuClick} />)}
            {menuIsOpened && <NavigationPopup onClose={handleMenuClick} />}
        </header>
    );
}

export default Header;

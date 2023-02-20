/* eslint-disable react/jsx-no-bind */
import { Link } from 'react-router-dom';

import { useState } from 'react';

import NavTab from './NavTab';
import Navigation from './Navigation';
import NavigationPopup from './NavigationPopup';

import logo from '../images/logo.svg';

function Header() {
    const isLanding = !true; // TODO

    const [menuIsOpened, setMenuIsOpened] = useState(false);

    function handleMenuClick() {
        setMenuIsOpened(!menuIsOpened);
    }

    return (
        <header className="header">
            <Link to="/"><img className="header__logo" src={logo} alt="логотип" /></Link>
            {isLanding ? <NavTab /> : <Navigation />}
            {isLanding || (<button className={menuIsOpened ? 'header__burger-menu_active' : 'header__burger-menu'} type="button" aria-label="Burger-menu" onClick={handleMenuClick} />)}
            {menuIsOpened && <NavigationPopup onClose={handleMenuClick} />}
        </header>
    );
}

export default Header;

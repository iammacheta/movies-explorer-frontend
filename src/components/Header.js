import logo from '../images/logo.svg';

import NavTab from './NavTab';
import Navigation from './Navigation';
import NavigationPopup from './NavigationPopup'


function Header() {

    let isLanding = true; // TODO
    let menuIsOpened = !true; // TODO

    return (
        <header className="header">
            <img className='header__logo' src={logo} alt='логотип' />
            {isLanding ? <NavTab /> : <Navigation />}
            {isLanding || (<button className={menuIsOpened ? 'header__burger-menu_active' : 'header__burger-menu'} type='button' />)}
            {menuIsOpened && <NavigationPopup />}
        </header>
    )
}

export default Header;
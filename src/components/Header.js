import logo from '../images/logo.svg';

import NavigationLanding from './NavigationLanding';
import NavigationMain from './NavigationMain';
import NavigationPopup from './NavigationPopup'


function Header() {

    let isLanding = !true; // TODO
    let menuIsOpened = !true; // TODO

    return (
        <header className="header">
            <img className='header__logo' src={logo} alt='логотип' />
            {isLanding ? <NavigationLanding /> : <NavigationMain />}
            {isLanding || (<button className={menuIsOpened ? 'header__burger-menu_active' : 'header__burger-menu'} type='button' />)}
            {menuIsOpened && <NavigationPopup />}

        </header>
    )
}

export default Header;
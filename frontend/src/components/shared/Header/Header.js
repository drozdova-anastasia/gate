import { NavLink } from 'react-router-dom';

import './Header.css';
import { USER_LIST_ROUTE } from '../../../constants/urls';

function Header () {
  return (
    <header className='header'
            aria-label='Секция с шапкой сайта'>
       <nav className='header__links'>
        <NavLink to={USER_LIST_ROUTE}
                 className='link header__link'>Users</NavLink>
      </nav>
    </header>
  );
}

export default Header;
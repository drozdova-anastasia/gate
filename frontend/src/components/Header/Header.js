import { NavLink } from 'react-router-dom';

import './Header.css';
import { USERS_ROUTE } from '../../utils/constans';

function Header () {
  return (
    <header className='header'
            aria-label='Секция с шапкой сайта'>
       <nav className='header__links'>
        <NavLink to={USERS_ROUTE}
                 className='link header__link'>Users</NavLink>
      </nav>
    </header>
  );
}

export default Header;
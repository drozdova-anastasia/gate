import { NavLink } from 'react-router-dom';

import './Header.css';
import {
  USER_LIST_ROUTE,
  ORGANIZATION_LIST_ROUTE
} from '../../../constants/route';

function Header () {
  return (
    <header className='header'
            aria-label='Секция с шапкой сайта'>
       <nav className='header__links'>
        <NavLink to={USER_LIST_ROUTE}
                 className='clickable base-text header__link'>Список пользователей</NavLink>
        <NavLink to={ORGANIZATION_LIST_ROUTE}
                 className='clickable base-text header__link'>Список организаций</NavLink>
      </nav>
    </header>
  );
}

export default Header;
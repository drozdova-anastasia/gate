import { useNavigate } from 'react-router-dom';

import { KEYS } from './constants';
import './Users.css';
import Table from '../Table/Table';
import Header from '../Header/Header';
import { USERS_ROUTE } from '../../utils/constans';

function Users ({users, handleDoubleClick}) {
  const navigate = useNavigate();

  function handleDoubleClick(user) {
    navigate(`${USERS_ROUTE}/${user.id}`);
  }

  return (
    <main className='users'>
      <Header></Header>
      <Table items={users}
             headers={KEYS}
             handleDoubleClick={handleDoubleClick}
             keys={KEYS}/>
    </main>
  );
}

export default Users;
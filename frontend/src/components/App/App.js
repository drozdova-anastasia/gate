import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { USER_ROUTE, USERS_ROUTE } from '../../utils/constans';
import { CURRENT_USER, USERS, ORGANIZATIONS } from '../../utils/mock';

import NotFound from '../NotFound/NotFound';
import User from '../staff/User/User';
import Users from '../staff/Users/Users';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    reloadPageData();
  }, []);

  function getUsers(filters) {
    let users = [...USERS];
    if (filters.search) {
      users = users.filter(user => user.username.includes(filters.search));
    }
    if (filters.organization) {
      users = users.filter(user => user.organization?.id === filters.organization);
    }
    if (filters.isActive) {
      users = users.filter(user => user.isActive === Boolean(filters.isActive));
    }
    setUsers(users);
  }

  function reloadPageData() {
    setCurrentUser(CURRENT_USER);
    getUsers({});
  }

  function handleLoadUser(id) {
    return USERS.filter(user => user.id === id)[0];
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page__container'>
        <Routes>
          <Route path={USER_ROUTE}
                 element={<User handleLoadUser={handleLoadUser}/>}/>
          <Route path={USERS_ROUTE}
                 element={
                   <Users users={users}
                          getUsers={getUsers}
                          organizations={ORGANIZATIONS}/>
                 }/>
          <Route path='*'
                 element={<NotFound/>}/>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;


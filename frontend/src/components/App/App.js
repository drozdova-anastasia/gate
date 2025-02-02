import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {
  USER_DETAIL_ROUTE,
  USER_LIST_ROUTE,
  USER_CREATE_ROUTE
} from '../../utils/urls';
import { CURRENT_USER, USERS, ORGANIZATIONS } from '../../utils/mock';

import NotFound from '../NotFound/NotFound';
import UserDetail from '../staff/UserDetail/UserDetail';
import UserList from '../staff/UserList/UserList';
import UserCreate from '../staff/UserCreate/UserCreate';

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
          <Route path={USER_DETAIL_ROUTE}
                 element={<UserDetail handleLoadUser={handleLoadUser}/>}/>
          <Route path={USER_CREATE_ROUTE}
                 element={<UserCreate/>}/>
          <Route path={USER_LIST_ROUTE}
                 element={
                   <UserList users={users}
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


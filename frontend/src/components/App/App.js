import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { USER_ROUTE, USERS_ROUTE } from '../../utils/constans';
import { CURRENT_USER, USERS } from '../../utils/mock';

//import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import NotFound from '../NotFound/NotFound';
import User from '../User/User';
import Users from '../Users/Users';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    reloadPageData();
  }, []);

  function getUsers(filters) {
    if (filters.search) {
      setUsers(USERS.filter(user => user.username === filters.search));
    }
    setUsers([...USERS]);
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
                          getUsers={getUsers}/>
                 }/>
          <Route path='*'
                 element={<NotFound/>}/>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;


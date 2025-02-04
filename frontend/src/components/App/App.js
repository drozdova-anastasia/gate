import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {
  USER_DETAIL_ROUTE,
  USER_LIST_ROUTE,
  USER_CREATE_ROUTE
} from '../../constants/urls';
import api from '../../utils/Api';

import NotFound from '../NotFound/NotFound';
import UserDetail from '../staff/UserDetail/UserDetail';
import UserList from '../staff/UserList/UserList';
import UserCreate from '../staff/UserCreate/UserCreate';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [userList, setUserList] = useState([]);
  const [userDetail, setUserDetail] = useState({});
  const [organizationList, setOrganizationList] = useState([]);

  useEffect(() => {
    reloadPageData();
  }, []);

  function getUserList(filters) {
    api.getUserList(filters).then(userList => setUserList(userList));
  }

  async function reloadPageData() {
    Promise.all([
      api.getUserCurrent(),
      api.getUserList({}),
      api.getOrganizationList(),
    ]).then(([user, userList, organizationList]) => {
      setCurrentUser(user);
      setUserList(userList);
      setOrganizationList(organizationList);
    });
  }

  async function getUserDetail(id) {
    api.getUserDetail(id).then((user) => setUserDetail(user));
  }

  function refresh(user, func) {
    userList.forEach((item, index) => {
      if(item.id === user.id) {
        userList[index] = user;
        setUserList([...userList]);
        func(user);
      }
    })
  }

  async function blockUser(id, func) {
    return api.blockUser(id).then(user => refresh(user, func));
  }

  async function unblockUser(id, func) {
    return api.unblockUser(id).then(user => refresh(user, func));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page__container'>
        <Routes>
          <Route path={USER_DETAIL_ROUTE}
                 element={<UserDetail handleLoadUser={getUserDetail}
                                      userDetail={userDetail}/>}/>
          <Route path={USER_CREATE_ROUTE}
                 element={<UserCreate/>}/>
          <Route path={USER_LIST_ROUTE}
                 element={
                   <UserList userList={userList}
                             getUserList={getUserList}
                             organizations={organizationList}
                             blockUser={blockUser}
                             unblockUser={unblockUser}/>
                 }/>
          <Route path='*'
                 element={<NotFound/>}/>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

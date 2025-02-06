import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {
  USER_DETAIL_ROUTE,
  USER_LIST_ROUTE,
  USER_CREATE_ROUTE,
  ORGANIZATION_LIST_ROUTE
} from '../../constants/urls';
import api from '../../utils/Api';

import NotFound from '../NotFound/NotFound';
import UserList from '../staff/UserList/UserList';
import UserCreateDetail from '../staff/UserCreateDetail/UserCreateDetail';
import OrganizationList from '../staff/OrganizationList/OrganizationList';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [userList, setUserList] = useState([]);
  const [userDetail, setUserDetail] = useState({});
  const [organizationList, setOrganizationList] = useState([]);
  const [isProcess, setIsProcess] = useState(false);

  useEffect(() => {
    reloadPageData();
  }, []);

  function getUserList(filters) {
    api.getUserList(filters).then(userList => setUserList(userList));
  }

  async function reloadPageData() {
    setIsProcess(true);
    Promise.all([
      api.getUserCurrent(),
      api.getUserList({}),
      api.getOrganizationList(),
    ]).then(([user, userList, organizationList]) => {
      setCurrentUser(user);
      setUserList(userList);
      setOrganizationList(organizationList);
      setIsProcess(false);
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
      <div className='page__container'>{
        !isProcess && <Routes>
          <Route path={USER_DETAIL_ROUTE}
                 element={<UserCreateDetail handleLoadUser={getUserDetail}/>}/>
          <Route path={USER_CREATE_ROUTE}
                 element={<UserCreateDetail/>}/>
          <Route path={USER_LIST_ROUTE}
                 element={
                   <UserList userList={userList}
                             getUserList={getUserList}
                             organizations={organizationList}
                             blockUser={blockUser}
                             unblockUser={unblockUser}/>
                 }/>
          <Route path={ORGANIZATION_LIST_ROUTE}
                 element={<OrganizationList/>}/>
          <Route path='*'
                 element={<NotFound/>}/>
        </Routes>
      }</div>
    </CurrentUserContext.Provider>
  );
}

export default App;

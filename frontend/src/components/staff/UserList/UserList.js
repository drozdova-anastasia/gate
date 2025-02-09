import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './UserList.css';
import { KEYS } from './constants';
import { USER_LIST_ROUTE, USER_CREATE_ROUTE } from '../../../constants/route';

import CustomTable from '../../shared/CustomTable/CustomTable';
import Button from '../../forms/Button/Button';
import Header from '../../shared/Header/Header';
import UserListFilter from '../UserListFilter/UserListFilter';

function UserList ({
  userList,
  getUserList,
  blockUser,
  unblockUser,
  organizationList,
  serviceNameList,
  permissionList
}) {
  const navigate = useNavigate();
  const [selectedList, setSelectedList] = useState([]);
  const [canBlock, setCanBlock] = useState(false);
  const [canUnblock, setCanUnblock] = useState(false);

  useEffect(
    () => {
      setCanBlock(
        selectedList.length > 0
         && selectedList.every(element => element.isActive === true)
      );
      setCanUnblock(
        selectedList.length > 0
        && selectedList.every(element => element.isActive === false)
      );
    },
    [selectedList]
  );

  useEffect(() => setSelectedList([]), [userList]);

  function handleDoubleClick(user) {
    navigate(`${USER_LIST_ROUTE}/${user.id}`);
  }

  function edit() {
    navigate(`${USER_LIST_ROUTE}/${selectedList[0].id}`);
  }

  function refresh(user) {
    userList.forEach((item, index) => {
      if(item.id === user.id) {
        selectedList[index] = user;
        setSelectedList([...selectedList]);
      }
    });
  }

  function block() {
    selectedList.forEach(item => blockUser(item.id, refresh));
  }

  function unblock() {
    selectedList.forEach(item => unblockUser(item.id, refresh));
  }

  return (
    <main className='user-list'>
      <Header/>
      <UserListFilter getUserList={getUserList}
                      organizationList={organizationList}
                      serviceNameList={serviceNameList}
                      permissionList={permissionList}/>
      <div className='default__row user-list__row'>
        <Button handleClick={() => navigate(USER_CREATE_ROUTE)}
                name='Добавить пользователя'/>
        {
          selectedList.length === 1 &&
          <Button handleClick={edit}
                  name='Редактировать'/>
        }
        {
          canBlock &&
          <Button handleClick={block}
                  name='Заблокировать'/>
        }
        {
          canUnblock &&
          <Button handleClick={unblock}
                  name='Разблокировать'/>
        }
      </div>
      <CustomTable items={userList}
                   headers={KEYS}
                   handleDoubleClick={handleDoubleClick}
                   selectedList={selectedList}
                   setSelectedList={setSelectedList}
                   keys={KEYS}/>
    </main>
  );
}

export default UserList;
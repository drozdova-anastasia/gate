import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './UserList.css';
import { KEYS } from './constants';
import { USER_LIST_ROUTE, USER_CREATE_ROUTE } from '../../../constants/urls';
import { COL_3 } from '../../../constants/css';

import CustomTable from '../../shared/CustomTable/CustomTable';
import Button from '../../forms/Button/Button';
import Header from '../../shared/Header/Header';
import Row from '../../forms/Row/Row';
import UserListFilter from '../UserListFilter/UserListFilter';

function UserList ({
  userList,
  getUserList,
  organizations,
  blockUser,
  unblockUser
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
                      organizations={organizations}/>
      <Row>
        <Button size={COL_3}
                handleClick={() => navigate(USER_CREATE_ROUTE)}
                name='Add'/>
        {
          selectedList.length === 1 && 
          <Button size={COL_3}
                  handleClick={edit}
                  name='Edit'/>
        }
        {
          canBlock && 
          <Button size={COL_3}
                  handleClick={block}
                  name='Block'/>
        }
        {
          canUnblock &&
          <Button size={COL_3}
                  handleClick={unblock}
                  name='Unblock'/>
        }
      </Row>
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
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { KEYS } from './constants';
import './Users.css';
import CustomTable from '../CustomTable/CustomTable';
import Header from '../Header/Header';
import Button from '../Button/Button';
import { USERS_ROUTE } from '../../utils/constans';

function Users ({users}) {
  const navigate = useNavigate();
  const [selectedList, setSelectedList] = useState([]);
  const [canBlock, setCanBlock] = useState(false);
  const [canUnblock, setCanUnblock] = useState(false);

  function handleDoubleClick(user) {
    navigate(`${USERS_ROUTE}/${user.id}`);
  }

  function handleEdit() {
    navigate(`${USERS_ROUTE}/${selectedList[0].id}`);
  }

  function handleAdd() {
    navigate('*');
  }

  function handleBlock() {
    setSelectedList([...selectedList]);
    //todo
    selectedList.map(element => element.isActive = false);
  }

  function handleUnblock() {
    setSelectedList([...selectedList]);
    //todo
    selectedList.forEach(element => element.isActive = true);
  }

  function handleChangeSelect() {
    setCanBlock(
      selectedList.length > 0
       && selectedList.every(element => element.isActive === true)
    );
    setCanUnblock(
      selectedList.length > 0
      && selectedList.every(element => element.isActive === false)
    );
  }

  return (
    <main className='users'>
      <Header/>
      <div className='users__actions'>
        <Button handleOnClick={handleAdd}
                name='Add'
                display={true}/>
        <Button handleOnClick={handleEdit}
                name='Edit'
                display={selectedList.length === 1}/>
        <Button handleOnClick={handleBlock}
                name='Block'
                display={canBlock}/>
        <Button handleOnClick={handleUnblock}
                name='Unblock'
                display={canUnblock}/>
      </div>
      <CustomTable items={users}
                   headers={KEYS}
                   handleDoubleClick={handleDoubleClick}
                   handleChangeSelect={handleChangeSelect}
                   selectedList={selectedList}
                   setSelectedList={setSelectedList}
                   keys={KEYS}/>
    </main>
  );
}

export default Users;
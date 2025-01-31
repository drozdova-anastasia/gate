import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { KEYS } from './constants';
import './Users.css';
import CustomTable from '../CustomTable/CustomTable';
import Header from '../Header/Header';
import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';
import { USERS_ROUTE } from '../../utils/constans';

function Users ({users, getUsers}) {
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
  )

  useEffect(
    () => setSelectedList([]),
    [users]
  )

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
    //todo
    setSelectedList([...selectedList]);
    selectedList.map(element => element.isActive = false);
  }

  function handleUnblock() {
    //todo
    setSelectedList([...selectedList]);
    selectedList.forEach(element => element.isActive = true);
  }

  function f(e) {
    getUsers({search: e.target.value});
  }

  return (
    <main className='users'>
      <Header/>
      <div className='users__actions'>
        <TextInput lable='Search'
                   handleChange={f}
                   placeholder='FIO|Login|SNILS'/>
      </div>
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
                   selectedList={selectedList}
                   setSelectedList={setSelectedList}
                   keys={KEYS}/>
    </main>
  );
}

export default Users;
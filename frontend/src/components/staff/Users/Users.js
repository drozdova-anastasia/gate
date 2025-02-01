import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { KEYS } from './constants';
import './Users.css';
import CustomTable from '../../shared/CustomTable/CustomTable';
import Header from '../../shared/Header/Header';
import Button from '../../forms/Button/Button';
import TextInput from '../../forms/TextInput/TextInput';
import Select from '../../forms/Select/Select';
import { USERS_ROUTE } from '../../../utils/constans';

function Users ({users, getUsers, organizations}) {
  const navigate = useNavigate();
  const [selectedList, setSelectedList] = useState([]);
  const [canBlock, setCanBlock] = useState(false);
  const [canUnblock, setCanUnblock] = useState(false);
  const [form, setForm] = useState({});

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

  useEffect(
    () => getUsers(form),
    [form]
  )

  function handleDoubleClick(user) {
    navigate(`${USERS_ROUTE}/${user.id}`);
  }

  function handleEdit() {
    navigate(`${USERS_ROUTE}/${selectedList[0].id}`);
  }

  function handleBlock() {
    setSelectedList([...selectedList]);
    selectedList.map(element => element.isActive = false);
  }

  function handleUnblock() {
    setSelectedList([...selectedList]);
    selectedList.forEach(element => element.isActive = true);
  }

  function resetForm() {
    const result = {};
    Object.keys(form).forEach(item => result[item] = null);
    updateForm(result);
  }

  function updateForm(updates) {
    setForm({...form, ...updates});
  }

  return (
    <main className='users'>
      <Header/>
      <form className=''>
        <div className='users__actions'>
          <TextInput lable='Search'
                     handleChange={(value) => updateForm({search: value})}
                     placeholder='FIO|Login|SNILS'/>
          <Select lable='Organization'
                  choices={organizations}
                  canClear={true}
                  handleSelect={(value) => updateForm({organization: value})}/>
        </div>
        <div className='users__actions'>
          <Button handleOnClick={resetForm}
                  name='Clear filters'
                  display={true}/>
        </div>
      </form>
      <div className='users__actions'>
        <Button handleOnClick={() => navigate('*')}
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
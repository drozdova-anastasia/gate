import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { IS_ACTIVE_TYPES, KEYS } from './constants';
import './Users.css';
import CustomTable from '../../shared/CustomTable/CustomTable';
import Header from '../../shared/Header/Header';
import Button from '../../forms/Button/Button';
import ClearButton from '../../forms/ClearButton/ClearButton';
import Row from '../../forms/Row/Row';
import TextInput from '../../forms/TextInput/TextInput';
import Select from '../../forms/Select/Select';
import DateTimeForm from '../../forms/DateTimeForm/DateTimeForm';
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
      <Row>
        <TextInput label='Search'
                    handleChange={(value) => updateForm({search: value})}
                    placeholder='FIO|Login|SNILS'/>
        <Select label='Organization'
                choices={organizations}
                canClear={true}
                handleSelect={(value) => updateForm({organization: value})}/>
        <DateTimeForm label='Last login'/>
        <DateTimeForm label='Updated'/>
      </Row>
      <Row>
        <Select choices={IS_ACTIVE_TYPES}
                canClear={true}
                placeholder='Is active'
                handleSelect={(value) => updateForm({isActive: value})}/>
        <Select choices={organizations}
                canClear={true}
                placeholder='Services'
                handleSelect={(value) => updateForm({organization: value})}/>
        <Select choices={organizations}
                canClear={true}
                placeholder='Permissions'
                handleSelect={(value) => updateForm({organization: value})}/>
        <ClearButton handleOnClick={resetForm}
                     name='Clear filters'
                     display={true}/>
      </Row>
      <Row>
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
      </Row>
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
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './UserList.css';
import { IS_ACTIVE_TYPES, KEYS } from './constants';
import { USER_LIST_ROUTE, USER_CREATE_ROUTE } from '../../../utils/urls';
import { COL_3 } from '../../../utils/css';

import CustomTable from '../../shared/CustomTable/CustomTable';
import Header from '../../shared/Header/Header';
import Button from '../../forms/Button/Button';
import ClearButton from '../../forms/ClearButton/ClearButton';
import Row from '../../forms/Row/Row';
import TextInputForm from '../../forms/TextInputForm/TextInputForm';
import SelectForm from '../../forms/SelectForm/SelectForm';
import DateTimeForm from '../../forms/DateTimeForm/DateTimeForm';

function UserList ({userList, getUserList, organizations}) {
  const initialValue = {
    'search': '',
    'isActive': '',
    'organization': ''
  }
  const navigate = useNavigate();
  const [selectedList, setSelectedList] = useState([]);
  const [canBlock, setCanBlock] = useState(false);
  const [canUnblock, setCanUnblock] = useState(false);
  const [form, setForm] = useState(initialValue);

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

  useEffect(() => getUserList(form), [form]);

  function handleDoubleClick(user) {
    navigate(`${USER_LIST_ROUTE}/${user.id}`);
  }

  function edit() {
    navigate(`${USER_LIST_ROUTE}/${selectedList[0].id}`);
  }

  function block() {
    setSelectedList([...selectedList]);
    selectedList.map(element => element.isActive = false);
  }

  function unblock() {
    setSelectedList([...selectedList]);
    selectedList.forEach(element => element.isActive = true);
  }

  function reset(event) {
    event.preventDefault();
    update(initialValue);
  }

  function update(updates) {
    setForm({...form, ...updates});
  }

  return (
    <main className='user-list'>
      <Header/>
      <form className='user-list__form'>
        <Row>
          <TextInputForm label='Search'
                         size={COL_3}
                         handleChange={(event) => update({[event.target.name]: event.target.value})}
                         placeholder='FIO|Login|SNILS'
                         value={form['search']}/>
          <SelectForm label='Organization'
                      size={COL_3}
                      choices={organizations}
                      canClear={true}
                      value={form['organization']}
                      handleSelect={(value) => update({organization: value})}/>
          <DateTimeForm size={COL_3}
                        label='Last login'/>
          <DateTimeForm size={COL_3}
                        label='Updated'/>
        </Row>
        <Row>
          <SelectForm choices={IS_ACTIVE_TYPES}
                      size={COL_3}
                      canClear={true}
                      placeholder='Is active'
                      value={form['isActive']}
                      handleSelect={(value) => update({isActive: value})}/>
          <SelectForm choices={organizations}
                      size={COL_3}
                      canClear={true}
                      placeholder='Services'
                      handleSelect={(value) => update({organization: value})}/>
          <SelectForm choices={organizations}
                      size={COL_3}
                      canClear={true}
                      placeholder='Permissions'
                      handleSelect={(value) => update({organization: value})}/>
          <ClearButton size={COL_3}
                       handleClick={reset}
                       name='Clear filters'/>
        </Row>
      </form>
      <Row>
        <Button size={COL_3}
                handleClick={() => navigate(USER_CREATE_ROUTE)}
                name='Add'/>
        <Button size={COL_3}
                handleClick={edit}
                name='Edit'
                display={selectedList.length === 1}/>
        <Button size={COL_3}
                handleClick={block}
                name='Block'
                display={canBlock}/>
        <Button size={COL_3}
                handleClick={unblock}
                name='Unblock'
                display={canUnblock}/>
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
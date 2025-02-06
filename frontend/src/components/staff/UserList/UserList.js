import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './UserList.css';
import { IS_ACTIVE_TYPES, KEYS } from './constants';
import { USER_LIST_ROUTE, USER_CREATE_ROUTE } from '../../../constants/urls';
import { COL_3 } from '../../../constants/css';

import CustomTable from '../../shared/CustomTable/CustomTable';
import Header from '../../shared/Header/Header';
import Button from '../../forms/Button/Button';
import ClearButton from '../../forms/ClearButton/ClearButton';
import Row from '../../forms/Row/Row';
import TextInputForm from '../../forms/TextInputForm/TextInputForm';
import SelectForm from '../../forms/SelectForm/SelectForm';
import FormDate from '../../forms/FormDate/FormDate';

function UserList ({
  userList,
  getUserList,
  organizations,
  blockUser,
  unblockUser
}) {
  const initialValue = {
    'search': '',
    'isActive': '',
    'organization': '',
    'lastLogin': ''
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
                         placeholder='FIO|Login|SNILS'
                         name='search'
                         value={form['search']}
                         handleChange={(event) => update({search: event.target.value})}/>
          <SelectForm label='Organization'
                      size={COL_3}
                      choices={organizations}
                      canClear={true}
                      name='organization'
                      value={form['organization']}
                      handleSelect={(value) => update({organization: value})}/>
          <FormDate size={COL_3}
                    label='Last login'
                    name='lastLogin'
                    value={form['lastLogin']}
                    handleChange={(value) => update({lastLogin: value})}/>
        </Row>
        <Row>
          <SelectForm choices={IS_ACTIVE_TYPES}
                      size={COL_3}
                      canClear={true}
                      placeholder='Is active'
                      name='isActive'
                      value={form['isActive']}
                      handleSelect={(value) => update({isActive: value})}/>
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
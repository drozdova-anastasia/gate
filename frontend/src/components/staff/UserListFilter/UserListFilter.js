import { useEffect, useState } from 'react';

import './UserListFilter.css';
import { INITIAL_VALUE, IS_ACTIVE_TYPES } from './constants';

import ClearButton from '../../forms/ClearButton/ClearButton';
import FormSelect from '../../forms/FormSelect/FormSelect';
import FormTextInput from '../../forms/FormTextInput/FormTextInput';
import FormDateTimeRange from '../../forms/FormDateTimeRange/FormDateTimeRange';

function UserListFilter ({
  getUserList,
  organizationList,
  serviceNameList,
  permissionList
}) {
  const [form, setForm] = useState(INITIAL_VALUE);

  useEffect(() => getUserList(form), [form]);

  return (
    <form className='user-list-filter'>
      <div className='default__row user-list-filter__row'>
        <FormTextInput label='Поиск'
                       placeholder='ФИО|Логин|СНИЛС'
                       name='search'
                       form={form}
                       setForm={setForm}/>
        <FormSelect label='Организация'
                    choices={organizationList}
                    canClear={true}
                    name='organization'
                    form={form}
                    setForm={setForm}/>
        <FormDateTimeRange label='Последний вход'
                           fromName='lastLoginFrom'
                           toName='lastLoginTo'
                           setForm={setForm}
                           form={form}/>
        <FormDateTimeRange label='Изменено'
                           fromName='updatedFrom'
                           toName='updatedTo'
                           setForm={setForm}
                           form={form}/>
        <FormSelect choices={IS_ACTIVE_TYPES}
                    canClear={true}
                    placeholder='Активная УЗ'
                    name='isActive'
                    form={form}
                    setForm={setForm}/>
        <FormSelect choices={serviceNameList}
                    canClear={true}
                    placeholder='Список сервисов'
                    name='serviceName'
                    form={form}
                    setForm={setForm}/>
        <FormSelect choices={permissionList}
                    canClear={true}
                    placeholder='Список прав'
                    name='permission'
                    form={form}
                    setForm={setForm}/>
        <ClearButton handleClick={() => setForm(INITIAL_VALUE)}
                     name='Сбросить фильтры'/>
      </div>
    </form>
  );
}

export default UserListFilter;
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
        <FormTextInput label='Search'
                       placeholder='FIO|Login|SNILS'
                       name='search'
                       form={form}
                       setForm={setForm}/>
        <FormSelect label='Organization'
                    choices={organizationList}
                    canClear={true}
                    name='organization'
                    form={form}
                    setForm={setForm}/>
        <FormDateTimeRange label='Last login'
                           fromName='lastLoginFrom'
                           toName='lastLoginTo'
                           setForm={setForm}
                           form={form}/>
        <FormDateTimeRange label='Updated'
                           fromName='updatedFrom'
                           toName='updatedTo'
                           setForm={setForm}
                           form={form}/>
        <FormSelect choices={IS_ACTIVE_TYPES}
                    canClear={true}
                    placeholder='Is active'
                    name='isActive'
                    form={form}
                    setForm={setForm}/>
        <FormSelect choices={serviceNameList}
                    canClear={true}
                    placeholder='Service name list'
                    name='serviceName'
                    form={form}
                    setForm={setForm}/>
        <FormSelect choices={permissionList}
                    canClear={true}
                    placeholder='Permission list'
                    name='permission'
                    form={form}
                    setForm={setForm}/>
        <ClearButton handleClick={() => setForm(INITIAL_VALUE)}
                     name='Clear filters'/>
      </div>
    </form>
  );
}

export default UserListFilter;
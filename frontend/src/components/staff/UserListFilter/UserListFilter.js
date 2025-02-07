import { useEffect, useState } from 'react';

import './UserListFilter.css';
import { INITIAL_VALUE, IS_ACTIVE_TYPES } from './constants';
import { COL_3 } from '../../../constants/css';

import ClearButton from '../../forms/ClearButton/ClearButton';
import FormDate from '../../forms/FormDate/FormDate';
import FormSelect from '../../forms/FormSelect/FormSelect';
import FormTextInput from '../../forms/FormTextInput/FormTextInput';
import FormDateTime from '../../forms/FormDateTime/FormDateTime';
import FormDateTimeRange from '../../forms/FormDateTimeRange/FormDateTimeRange';
import Row from '../../forms/Row/Row';

function UserListFilter ({ getUserList, organizations }) {
  const [form, setForm] = useState(INITIAL_VALUE);

  useEffect(() => getUserList(form), [form]);

  function update(updates) {
    setForm({...form, ...updates});
  }

  return (
    <form className='user-list-filter'>
      <Row>
        <FormTextInput label='Search'
                       size={COL_3}
                       placeholder='FIO|Login|SNILS'
                       name='search'
                       value={form['search']}
                       handleChange={(event) => update({search: event.target.value})}/>
        <FormSelect label='Organization'
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
        <FormDateTimeRange size={COL_3}
                           label='Updated'
                           name='updated'
                           value={form['updated']}
                           handleChangeValue={(value) => update({updated: value})}/>
      </Row>
      <Row>
        <FormSelect choices={IS_ACTIVE_TYPES}
                    size={COL_3}
                    canClear={true}
                    placeholder='Is active'
                    name='isActive'
                    value={form['isActive']}
                    handleSelect={(value) => update({isActive: value})}/>
        
        <ClearButton size={COL_3}
                     handleClick={() => update(INITIAL_VALUE)}
                     name='Clear filters'/>
      </Row>
    </form>
  );
}

export default UserListFilter;
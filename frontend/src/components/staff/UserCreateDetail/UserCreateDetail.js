import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './UserCreateDetail.css';
import { INITIAL_VALUE } from './constants';
import { SNILS_MASK } from '../../../constants/mask';

import Header from '../../shared/Header/Header';
import FormSelect from '../../forms/FormSelect/FormSelect';
import FormTextInput from '../../forms/FormTextInput/FormTextInput';

function UserCreateDetail ({ handleLoadUser, userDetail, organizationList }) {
  const [form, setForm] = useState(INITIAL_VALUE);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    //handleLoadUser(parseInt(params.id));
    //if (user) {
    //    setUser(user);
    //} else {
    //    navigate('/');
    //}
  }, []);

  function update(updates) {
    setForm({...form, ...updates});
  }

  return (
    <main className='user-create-detail'>
      <Header/>
      <div className='default__row user-create-detail__row'>
        <FormTextInput label='Login'
                       name='login'
                       form={form}
                       setForm={setForm}/>
        <FormTextInput label='Password'
                       name='password'
                       type='password'
                       form={form}
                       setForm={setForm}/>
        <FormSelect label='Organization'
                    choices={organizationList}
                    name='organization'
                    form={form}
                    setForm={setForm}/>
        <FormTextInput label='FirstName'
                       name='firstName'
                       form={form}
                       setForm={setForm}/>
        <FormTextInput label='LastName'
                       name='lastName'
                       form={form}
                       setForm={setForm}/>
        <FormTextInput label='MiddleName'
                       name='middleName'
                       form={form}
                       setForm={setForm}/>
        <FormTextInput label='SNILS'
                       name='snils'
                       placeholder={SNILS_MASK}
                       mask={SNILS_MASK}
                       form={form}
                       setForm={setForm}/>
      </div>
    </main>
  );
}

export default UserCreateDetail;
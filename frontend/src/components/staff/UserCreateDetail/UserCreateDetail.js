import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './UserCreateDetail.css';
import { INITIAL_VALUE } from './constants';
import { SNILS_MASK } from '../../../constants/mask';

import Header from '../../shared/Header/Header';
import FormSelect from '../../forms/FormSelect/FormSelect';
import FormTextInput from '../../forms/FormTextInput/FormTextInput';
import FormDateTime from '../../forms/FormDateTime/FormDateTime';
import FormMiltiselectInput from '../../forms/FormMiltiselectInput/FormMiltiselectInput';
import FromServiceSettings from '../../forms/FromServiceSettings/FromServiceSettings';

function UserCreateDetail ({
  handleLoadUser,
  userDetail,
  organizationList,
  serviceNameList
}) {
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

  return (
    <main className='user-create-detail'>
      <Header/>
      <div className='default__row user-create-detail__row'>
        <FormTextInput label='Логин'
                       name='login'
                       form={form}
                       required={true}
                       setForm={setForm}/>
        <FormTextInput label='Пароль'
                       name='password'
                       type='password'
                       form={form}
                       required={true}
                       setForm={setForm}/>
        <FormSelect label='Организация'
                    choices={organizationList}
                    name='organization'
                    form={form}
                    required={true}
                    setForm={setForm}/>
        <FormTextInput label='Фамилия'
                       name='firstName'
                       form={form}
                       setForm={setForm}/>
        <FormTextInput label='Имя'
                       name='lastName'
                       form={form}
                       setForm={setForm}/>
        <FormTextInput label='Отчество'
                       name='middleName'
                       form={form}
                       setForm={setForm}/>
        <FormTextInput label='CНИЛС'
                       name='snils'
                       placeholder={SNILS_MASK}
                       mask={SNILS_MASK}
                       form={form}
                       required={true}
                       setForm={setForm}/>
        {
          form['lastLogin'] &&
          <FormDateTime label='Last login'
                        name='lastLogin'
                        form={form}
                        setForm={setForm}/>
        }
      </div>
      <FormMiltiselectInput choices={serviceNameList}
                            labelLeft='Список доступных сервисов'
                            labelRight='Список выбранных сервисов'
                            name='serviceNameList'
                            form={form}
                            setForm={setForm}/>
      <FormMiltiselectInput choices={serviceNameList}
                            labelLeft='Список прав'
                            labelRight='Список выбранных прав'
                            name='serviceNameList'
                            form={form}
                            setForm={setForm}/>
      <FromServiceSettings/>
    </main>
  );
}

export default UserCreateDetail;
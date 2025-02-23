import moment from 'moment/moment';
import { useEffect, useState, useRef } from 'react';

import './FormDateTimeRange.css';
import { handleClosePopup } from '../../../utils/functools';
import { DATE_FORMAT } from '../../../constants/calendar';

import Button from '../Button/Button';
import FormDateTime from '../FormDateTime/FormDateTime';

function FormDateTimeRange ({ label, form, setForm, fromName, toName }) {
  const TODAY = moment().format(DATE_FORMAT);
  const INIT_FROM = `${TODAY}T00:00:00Z`;
  const INIT_TO = `${TODAY}T23:59:59Z`;
  const [show, setShow] = useState(false);
  const [localForm, setLocalForm] = useState({[fromName]: '', [toName]: ''});
  const [range, setRange] = useState('');
  const ref = useRef();
  const inputRef = useRef();

  useEffect(() => handleClosePopup(ref, () => setShow(false)), []);

  useEffect(() => clean(), []);

  useEffect(() => {
    if (!form[fromName] && !form[toName]) {
      clean();
    }
  }, [form[fromName], form[toName]]);

  function clean() {
    setRange('');
    setLocalForm({[fromName]: INIT_FROM, [toName]: INIT_TO});
  }

  function handleCancel(event) {
    event.stopPropagation();
    setForm({...form, [fromName]: '', [toName]: ''});
    clean();
  }

  function handleConfirm() {
    setForm({
      ...form,
      [fromName]: localForm[fromName],
      [toName]: localForm[toName]
    });
    setRange(
      `from ${localForm[fromName].split('T')[0] || ''} to ${localForm[toName].split('T')[0] || ''}`
    );
    setShow(false);
  }

  return (
    <div className='form-datetime-range'
         ref={ref}>
      <label className='base-text form-datetime-range__label'
             htmlFor='range'>{label}</label>
      <input ref={inputRef}
             className='clickable base-text form-datetime-range__input'
             onChange={(event) => setRange(event.target.value)}
             name='range'
             id='range'
             value={range}
             onClick={() => setShow(!show)}
             readOnly/>
      {
        inputRef.current?.defaultValue &&
        <span className='clickable form-datetime-range__cancel'
              onClick={handleCancel}>✕</span>
      }
      <span className='clickable form-datetime-range__arrow'
            onClick={() => setShow(!show)}>▾</span>
      {
        show &&
        <div className='form-datetime-range__window'>
          <FormDateTime label='Date and time, from'
                        name={fromName}
                        form={localForm}
                        setForm={setLocalForm}/>
          <FormDateTime label='Date and time, to'
                        name={toName}
                        form={localForm}
                        setForm={setLocalForm}/>
          <Button handleClick={handleConfirm}
                  name='Confirm'/>
        </div>
      }
    </div>
  );
}

export default FormDateTimeRange;
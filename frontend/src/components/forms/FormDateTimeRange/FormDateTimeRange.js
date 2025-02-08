import { useEffect, useState, useRef } from 'react';

import './FormDateTimeRange.css';
import { handleClosePopup } from '../../../utils/functools';

import Button from '../Button/Button';
import FormDateTime from '../FormDateTime/FormDateTime';


function FormDateTimeRange ({ label, size, form, setForm, fromName, toName }) {
  const [show, setShow] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [range, setRange] = useState('');
  const ref = useRef();
  const inputRef = useRef();

  useEffect(() => handleClosePopup(ref, () => setShow(false)), []);

  useEffect(() => {
    if (!form[fromName] && !form[toName]) {
      clean();
    }
  }, [form[fromName], form[toName]]);

  function clean() {
    setRange('');
    setFrom('');
    setTo('');
  }

  function handleCancel(event) {
    event.stopPropagation();
    setForm({...form, [fromName]: '', [toName]: ''});
    clean();
  }

  function handleConfirm() {
    setForm({...form, [fromName]: from, [toName]: to});
    setRange(`from ${from.split('T')[0] || ''} to ${to.split('T')[0] || ''}`);
    setShow(false);
  }

  return (
    <div className={`form-datetime-range${size ? ` ${size}` : ''}`}
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
                        value={from}
                        handleChange={setFrom}/>
          <FormDateTime label='Date and time, to'
                        name={toName}
                        value={to}
                        handleChange={setTo}/>
          <Button handleClick={handleConfirm}
                  name='Confirm'/>
        </div>
      }
    </div>
  );
}

export default FormDateTimeRange;
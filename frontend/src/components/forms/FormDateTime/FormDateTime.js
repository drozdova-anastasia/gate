import { useEffect, useState, useRef } from 'react';

import './FormDateTime.css';
import DateTime from './DateTime';
import { handleClosePopup } from '../../../utils/functools';

import FormCalendar from '../FormCalendar/FormCalendar';

function FormDateTime ({ label, handleChange, name, value, errors }) {
  const [dateTimeObj, setDateTimeObj] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [show, setShow] = useState(false);
  const ref = useRef();
  const inputRef = useRef();

  useEffect(() => handleClosePopup(ref, () => setShow(false)), []);

  useEffect(
    () => {
     const dateTimeObj = new DateTime(setDate, setTime, handleChange);
     setDateTimeObj(dateTimeObj);
     dateTimeObj.applyDateTime(value);
    },
    []
  );

  useEffect(() => dateTimeObj?.applyDateTime(value), [value]);

  function handleClick(value) {
    setShow(false);
    dateTimeObj.applyDate(value);
  }

  function handleChangeDate(event) {
    setShow(false);
    dateTimeObj.applyDate(event.target.value);
  }

  function handleChangeTime(event) {
    dateTimeObj.applyTime(event.target.value);
  }

  return (
    <div className='form-date-time'
         ref={ref}>
      <label className='base-text form-date-time__label'
             htmlFor={name}>{label}</label>
      <div className='form-date-time__input-block'>
        <input ref={inputRef}
               className='clickable base-text form-date-time__date-input'
               onChange={handleChangeDate}
               name={name}
               id={name}
               value={date}
               placeholder='____-__-__'
               onClick={() => setShow(!show)}/>
        <input className='base-text form-date-time__time-input'
               onChange={handleChangeTime}
               value={time}
               placeholder='__:__:__'/>
        <span className='clickable form-date-time__arrow'
              onClick={() => setShow(!show)}>▾</span>
        {
          show &&
          <div className='form-date-time__window'>
            <FormCalendar handleClick={handleClick}
                          value={date}/>
          </div>
        }
      </div>
      <span className='error-message'>{(errors || []).join(', ')}</span>
    </div>
  );
}

export default FormDateTime;
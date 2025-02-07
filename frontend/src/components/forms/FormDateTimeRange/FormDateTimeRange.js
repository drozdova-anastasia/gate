import { useEffect, useState, useRef } from 'react';

import './FormDateTimeRange.css';

import Button from '../Button/Button';
import FormDateTime from '../FormDateTime/FormDateTime';


function FormDateTimeRange ({ label, handleChangeValue, size, name, value }) {
  const [show, setShow] = useState(false);
  const ref = useRef();
  const inputRef = useRef();

  useEffect(() => {

    function handleClose(event) {
      if (!ref.current.contains(event.target)) {
        setShow(false);
      }
    }

    window.addEventListener('click', handleClose, {capture: true});
    return () => window.removeEventListener(
      'click',
      handleClose,
      {capture: true}
    );
  }, []);

  function handleCancel(event) {
    event.stopPropagation();
    handleChangeValue('');
  }

  return (
    <div className={`form-datetime-range${size ? ` ${size}` : ''}`}
         ref={ref}>
      <label className='base-text form-datetime-range__label'
             htmlFor={name}>{label}</label>
      <input ref={inputRef}
             className='clickable base-text form-datetime-range__input'
             onChange={handleChangeValue}
             name={name}
             id={name}
             value={value}
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
          <FormDateTime/>
          <FormDateTime/>
          <Button handleClick={() => {}}
                  name='Confirm'/>
        </div>
      }
    </div>
  );
}

export default FormDateTimeRange;
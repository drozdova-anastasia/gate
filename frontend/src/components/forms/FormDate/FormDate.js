import { useEffect, useState, useRef } from 'react';

import './FormDate.css';

import FormCalendar from '../FormCalendar/FormCalendar';

function FormDate ({ label, handleChange, size, name, value }) {
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

  function handleClick(value) {
    setShow(false);
    handleChange(value);
  }

  function handleChangeValue(event) {
    setShow(false);
    handleChange(event.target.value);
  }

  return (
    <div className={`form-date${size ? ` ${size}` : ''}`}
         ref={ref}>
      <label className='base-text form-date__label'
             htmlFor={name}>{label}</label>
      <input ref={inputRef}
             className='clickable base-text form-date__input'
             onChange={handleChangeValue}
             name={name}
             id={name}
             value={value}
             maxLength={10}
             placeholder='____-__-__'
             onClick={() => setShow(!show)}/>
      <span className='clickable form-date__arrow'
            onClick={() => setShow(!show)}>▾</span>
      {
        show &&
        <div className='form-date__window'>
          <FormCalendar handleClick={handleClick}
                        value={value}/>
        </div>
      }
    </div>
  );
}

export default FormDate;
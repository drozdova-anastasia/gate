import { useEffect, useState, useRef } from 'react';

import './FormDate.css';
import Mask from '../../../utils/Mask';
import { handleClosePopup } from '../../../utils/functools';
import { DATE_MASK } from '../../../constants/mask';

import FormCalendar from '../FormCalendar/FormCalendar';

function FormDate ({ label, handleChange, size, name, value }) {
  const [mask, setMask] = useState(null);
  const [show, setShow] = useState(false);
  const ref = useRef();
  const inputRef = useRef();

  useEffect(() => handleClosePopup(ref, () => setShow(false)), []);

  useEffect(() => setMask(new Mask(DATE_MASK)), []);

  function handleClick(value) {
    setShow(false);
    handleChange(value);
  }

  function handleChangeValue(event) {
    setShow(false);
    mask.apply(event.target.value, handleChange);
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
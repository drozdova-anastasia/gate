import { useEffect, useState, useRef } from 'react';

import './FormSelect.css';
import { getTitleByOptions } from '../../../utils/functools';

function FormSelect ({
  label,
  choices,
  canClear,
  handleSelect,
  placeholder,
  size,
  name,
  value
}) {
  const [selectedItems, setSelectedItems] = useState(choices);
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

  function handleChange(event) {
    const value = event.target.value;
    setSelectedItems(
      !value
      ? choices
      : choices.filter(item => item.title.includes(value))
    );
  }

  function handleSelectItem(item) {
    setShow(false);
    handleSelect(item.value);
  }

  function handleCancel(event) {
    event.stopPropagation();
    handleSelect('');
  }


  return (
    <div className={`form-select${size ? ` ${size}` : ''}`}
         ref={ref}>
      <label className='base-text form-select__label'
             htmlFor={name}>{label}</label>
      <input ref={inputRef}
             className='base-text form-select__input'
             onChange={handleSelect}
             name={name}
             id={name}
             value={value}/>
      <div className='clickable form-select__display'
           onClick={() => setShow(!show)}>
        <p className={`base-text form-select__${!value ? 'placeholder' : 'title'}`}
           onClick={() => setShow(!show)}>{!value ? placeholder : getTitleByOptions(value, choices)}</p>
      </div>
      {
        canClear && inputRef.current?.defaultValue &&
        <span className='clickable form-select__cancel'
              onClick={handleCancel}>✕</span>
      }
      <span className='clickable form-select__arrow'
            onClick={() => setShow(!show)}>▾</span>
      {
        show &&
        <div className='form-select__window'>
          <input className='base-text form-select__window-input'
                 placeholder='Search...'
                 onChange={handleChange}/> 
          <ul className='form-select__items'>
           {
              selectedItems.map((item, index) => 
                <li className='clickable base-text form-select__item'
                    key={index}
                    onClick={() => handleSelectItem(item)}>{item.title}</li>
              )
            }
          </ul>
        </div>
      }
    </div>
  );
}

export default FormSelect;
import { useEffect, useState, useRef } from 'react';

import './FormSelect.css';
import { getTitleByOptions } from '../../../utils/functools';
import { handleClosePopup } from '../../../utils/functools';

function FormSelect ({
  label,
  choices,
  canClear,
  placeholder,
  errors,
  name,
  setForm,
  form,
  required,
}) {
  const [selectedItems, setSelectedItems] = useState(choices);
  const [show, setShow] = useState(false);
  const ref = useRef();
  const inputRef = useRef();

  useEffect(() => handleClosePopup(ref, () => setShow(false)), []);

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
    setForm({...form, [name]: item.value})
  }

  function handleCancel(event) {
    event.stopPropagation();
    setForm({...form, [name]: ''})
  }

  return (
    <div className='form-select'
         ref={ref}>
      <div className='form-select__block'>
        <label className='base-text form-select__label'
               htmlFor={name}>{`${[label, required ? '*' : ''].join('')}`}</label>
        <input ref={inputRef}
               className='base-text form-select__input'
               onChange={() => {}}
               name={name}
               id={name}
               value={form[name]}/>
        <div className='clickable form-select__display'
             onClick={() => setShow(!show)}>
          <p className={`base-text form-select__${!form[name] ? 'placeholder' : 'title'}`}
             onClick={() => setShow(!show)}>{!form[name] ? placeholder : getTitleByOptions(form[name], choices)}</p>
        </div>
        {
          canClear && form[name] &&
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
      <span className='error-message'>{(errors || []).join(', ')}</span>
    </div>
  );
}

export default FormSelect;
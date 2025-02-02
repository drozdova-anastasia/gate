import { useEffect, useState, useRef } from 'react';

import './SelectForm.css';
import TextInputForm from '../TextInputForm/TextInputForm';

function SelectForm ({
  label,
  choices,
  canClear,
  handleSelect,
  placeholder,
  size,
  name,
  value
}) {
  const [items, setItems] = useState(choices);
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
    setItems(
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
    <div className={`select-input${size ? ` ${size}` : ''}`}
         ref={ref}>
      <label className='clickable select-input__label'
             onClick={() => setShow(!show)}>{label}
        <input ref={inputRef}
               className='clickable select-input__input'
               placeholder={placeholder}
               readOnly onChange={handleSelect}
               name={name}
               value={value}/>
        {
          (canClear && inputRef.current?.defaultValue)
          && <span className='select-input__cancel'
                   onClick={handleCancel}>✕</span>
        }
        <span className='select-input__arrow'>▾</span>
      </label>
      {
        show
        && <div className='select-input__window'>
          <TextInputForm placeholder='Search...'
                         handleChange={handleChange}/>
          <div className='select-input__wrap'>
            <div className='select-input__items'>
              {
                items.map((item, index) => 
                  <div className='clickable select-input__item'
                       key={index}
                       onClick={() => handleSelectItem(item)}>{item.title}</div>
                )
              }
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default SelectForm;
import { useState } from 'react';

import './Select.css';

function Select ({lable, choices, canClear, handleSelect}) {
  const [items, setItems] = useState(choices);
  const [title, setTitle] = useState('');
  const [show, setShow] = useState(false);

  function handleChange(event) {
    const value = event.target.value;
    setItems(
      !value
      ? choices
      : choices.filter(item => item.title.includes(value))
    );
  }

  function handleSelectItem(item) {
    setTitle(item.title);
    setShow(false);
    handleSelect(item.value);
  }

  function handleCancel(event) {
    event.stopPropagation();
    setTitle('');
    handleSelect(null);
  }

  return (
    <label className='select-input'>{lable}
      <div className='clickable select-input__select'
           onClick={() => setShow(!show)}>
        <div className='select-input__select-text'>{title}</div>
        {
          (canClear && title)
          && <span className='select-input__cancel'
                   onClick={handleCancel}>×</span>
        }
        <span className='select-input__arrow'>▾</span>
      </div>
      {
        show
        && <div className='select-input__window'>
          <input type='text'
                 className='select-input__input'
                 placeholder='Search...'
                 onChange={handleChange}/>
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
    </label>
  );
}

export default Select;
import { useState } from 'react';

import './Select.css';

function Select ({lable, choices, handleChange}) {
  const [show, setShow] = useState(false);

  return (
    <label className='select-input'>{lable}
      <div className='clickable select-input__select'></div>
      <div className='select-input__window'>
        <input type='text'
               className='select-input__input'
               placeholder='Search...'
               onChange={handleChange}/>
        <div className='select-input__wrap'>
          <div className='select-input__items'>
            {choices.map(item => <div className='clickable select-input__item'>{item.title}</div>)}
          </div>
        </div>
      </div>
    </label>
  );
}

export default Select;
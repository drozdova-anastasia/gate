import { useEffect, useState, useRef } from 'react';

import './Select.css';

function Select ({
  label,
  choices,
  canClear,
  handleSelect,
  placeholder
}) {
  const [items, setItems] = useState(choices);
  const [title, setTitle] = useState('');
  const [show, setShow] = useState(false);
  const ref = useRef();

  useEffect(() => {

    function handleClose(event) {
      if (ref.current.contains(event.target)) return;
      setShow(false);
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
    <label ref={ref}
           className='select-input'>{label}
      <div className='clickable select-input__select'
           onClick={() => setShow(!show)}>
        {
          title
          && <div className='select-input__title'>{title}</div>
        }
        {
          !title
          && <div className='select-input__placeholder'>{placeholder}</div>
        }
        {
          (canClear && title)
          && <span className='select-input__cancel'
                   onClick={handleCancel}>✕</span>
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
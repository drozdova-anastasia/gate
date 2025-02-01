import { useEffect, useState, useRef } from 'react';

import './DateTimeForm.css';
import Button from '../Button/Button';

function DateTimeForm ({label, canClear, handleSelect}) {
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

  function handleCancel(event) {
    event.stopPropagation();
    setTitle('');
    handleSelect(null);
  }

  return (
    <label className='date-time-form'
           ref={ref}>{label}
      <div className='clickable date-time-form__select'
           onClick={() => setShow(!show)}>
        {
          title
          && <div className='date-time-form__title'>{title}</div>
        }
        {
          (canClear && title)
          && <span className='date-time-form__cancel'
                   onClick={handleCancel}>✕</span>
        }
        <span className='date-time-form__arrow'>▾</span>
      </div>
      {
        show
        && <div className='date-time-form__window'>
          <label className='date-time-form__input-label'>Date and time, from
            <input type='text'
                  className='date-time-form__input'
                  placeholder='HH:mm:ss'/>
          </label>
          <label className='date-time-form__input-label'>Date and time, to
            <input type='text'
                  className='date-time-form__input'
                  placeholder='HH:mm:ss'/>
          </label>
          <Button display={true}
                  name='Confirm'></Button>
        </div>
      }
    </label>
  );
}

export default DateTimeForm;
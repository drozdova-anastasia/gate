import { useEffect, useState, useRef } from 'react';

import './FormDateTimeRange.css';
import { COL_6, COL_12, EMPTY } from '../../../constants/css';

import Button from '../Button/Button';

function FormDateTimeRange ({label, canClear, handleSelect, size}) {
  const [title, setTitle] = useState('');
  const [show, setShow] = useState(false);
  const ref = useRef();

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
    setTitle('');
    handleSelect(null);
  }

  return (
    <label className={`datetime-range-form${size ? ` ${size}` : ''}`}
           ref={ref}>{label}
      <div className='clickable datetime-range-form__select'
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
        && <div className='datetime-range-form__calendar'>
        </div>
      }
    </label>
  );
}

export default FormDateTimeRange;
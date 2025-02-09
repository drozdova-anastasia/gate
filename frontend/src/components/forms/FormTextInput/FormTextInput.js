import { useEffect, useState } from 'react';

import './FormTextInput.css';
import Mask from '../../../utils/Mask';

function FormTextInput ({
  label,
  placeholder,
  ellipsis,
  errors,
  mask,
  type,
  setForm,
  form,
  name,
}) {
  const [maskObj, setMaskObj] = useState(null);

  useEffect(() => {
    if (mask) {
      setMaskObj(new Mask(mask));
    }
  }, []);

  function handleChange(event) {
    if (mask) {
      maskObj.apply(
        event.target.value,
        (value) => setForm({...form, [name]: value})
      );
    } else {
      setForm({...form, [name]: event.target.value});
    }
  }

  return (
    <div className='form-text-input'>
      <label className={`base-text form-text-input__label${ellipsis && ' form-text-input__label_ellipsis'}`}
             htmlFor={name}>{label}</label>
      <input type={type || 'text'}
             id={name}
             name={name}
             className='form-text-input__input'
             placeholder={placeholder}
             onChange={handleChange}
             value={form[name]}/>
      <span className='error-message'>{(errors || []).join(', ')}</span>
    </div>
  );
}

export default FormTextInput;
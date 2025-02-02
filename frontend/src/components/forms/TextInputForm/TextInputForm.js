import './TextInputForm.css';

import { EMPTY } from '../../../utils/css';

function TextInputForm ({label, handleChange, placeholder, size}) {

  function getClassName() {
    return [
      'text-input',
      size,
      label === EMPTY && 'text-input_white-text'
    ].filter(item => item).join(' ');
  }

  return (
    <label className={getClassName()}>{label}
      <input type='text'
             className='text-input__input'
             placeholder={placeholder}
             onChange={(event) => handleChange(event.target.value)}/>
    </label>
  );
}

export default TextInputForm;
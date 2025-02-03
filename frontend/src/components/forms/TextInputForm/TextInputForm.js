import './TextInputForm.css';

import { EMPTY } from '../../../constants/css';

function TextInputForm ({
  label,
  handleChange,
  placeholder,
  ellipsis,
  size,
  name,
  value
}) {

  function getClassName() {
    return [
      'text-input',
      size,
      label === EMPTY && 'text-input_white-text',
      ellipsis && 'text-input_ellipsis'
    ].filter(item => item).join(' ');
  }

  return (
    <label className={getClassName()}>{label}
      <input type='text'
             name={name}
             className='text-input__input'
             placeholder={placeholder}
             onChange={handleChange}
             value={value}/>
    </label>
  );
}

export default TextInputForm;
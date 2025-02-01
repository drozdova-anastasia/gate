import './TextInput.css';

function TextInput ({label, handleChange, placeholder}) {

  return (
    <label className='text-input'>{label}
      <input type='text'
             className='text-input__input'
             placeholder={placeholder}
             onChange={(event) => handleChange(event.target.value)}/>
    </label>
  );
}

export default TextInput;
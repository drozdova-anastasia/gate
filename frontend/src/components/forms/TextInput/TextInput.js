import './TextInput.css';

function TextInput ({lable, handleChange, placeholder}) {

  return (
    <label className='text-input'>{lable}
      <input type='text'
             className='text-input__input'
             placeholder={placeholder}
             onChange={(event) => handleChange(event.target.value)}/>
    </label>
  );
}

export default TextInput;
import './TextInput.css';

function TextInput ({lable, handleChange, placeholder}) {
  return (
    <label className='text-input'>{lable}
      <input type='text'
             className='text-input__input'
             placeholder={placeholder}
             onChange={handleChange}/>
    </label>
  );
}

export default TextInput;
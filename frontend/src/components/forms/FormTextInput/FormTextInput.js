import './FormTextInput.css';

function FormTextInput ({
  label,
  handleChange,
  placeholder,
  ellipsis,
  size,
  name,
  value
}) {
  return (
    <div className={`form-text-input${ size && ` ${size}`}`}>
      <label className={`base-text form-text-input__label${ellipsis && ' form-text-input__label_ellipsis'}`}
             htmlFor={name}>{label}</label>
      <input type='text'
             id={name}
             name={name}
             className='form-text-input__input'
             placeholder={placeholder}
             onChange={handleChange}
             value={value}/>
    </div>
  );
}

export default FormTextInput;
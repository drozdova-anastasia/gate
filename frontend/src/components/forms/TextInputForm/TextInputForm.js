import './TextInputForm.css';

function TextInputForm ({
  label,
  handleChange,
  placeholder,
  ellipsis,
  size,
  name,
  value
}) {
  return (
    <div className={`text-input${ size && ` ${size}`}`}>
      <label className={`base-text text-input__label${ellipsis && ' text-input__label_ellipsis'}`}
             htmlFor={name}>{label}</label>
      <input type='text'
             id={name}
             name={name}
             className='text-input__input'
             placeholder={placeholder}
             onChange={handleChange}
             value={value}/>
    </div>
  );
}

export default TextInputForm;
import './Button.css';

function Button ({name, handleOnClick, display, children, size}) {
  return (
    display
    && <label className={`button${size ? ` ${size}` : ''}`}>
         <button className='clickable button__key'
                 onClick={handleOnClick}>{name}</button>
         {children}
       </label>
  );
}

export default Button;
import './Button.css';

function Button ({name, handleOnClick, display, children}) {
  return (
    display
    && <label className='button'>
         <button className='clickable button__key'
                 onClick={handleOnClick}>{name}</button>
         {children}
       </label>
  );
}

export default Button;
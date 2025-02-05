import './Button.css';

function Button ({
  name,
  handleClick,
  display = true,
  children,
  size
}) {

  //function handleClickButton(event) {
  //  event.preventDefault();
 //   handleClick();
  //}

  return (
    display
    && <label className={`base-text button${size ? ` ${size}` : ''}`}>
         <button className='clickable base-text button__key'
                 onClick={handleClick}>{name}</button>
         {children}
       </label>
  );
}

export default Button;
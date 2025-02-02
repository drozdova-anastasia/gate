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
    && <label className={`button${size ? ` ${size}` : ''}`}>
         <button className='clickable button__key'
                 onClick={handleClick}>{name}</button>
         {children}
       </label>
  );
}

export default Button;
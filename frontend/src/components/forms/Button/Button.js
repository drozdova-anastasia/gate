import './Button.css';

function Button ({ name, handleClick, children, size }) {

  function handleClickButton(event) {
    event.preventDefault();
    handleClick();
  }

  return (
    <div className={`base-text button${size && ` ${size}`}`}>
      <button className='clickable base-text button__key'
              onClick={handleClickButton}>{name}</button>
      {children}
    </div>
  );
}

export default Button;
import './Button.css';

function Button ({name, handleOnClick, display}) {
  return (
    display && <button className='clickable button'
                       onClick={handleOnClick}>{name}</button>
  );
}

export default Button;
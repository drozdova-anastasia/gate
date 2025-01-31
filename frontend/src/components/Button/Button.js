import './Button.css';

function Button ({name, handleOnClick, display}) {
  return (
    display && <button className='btn button'
                       onClick={handleOnClick}>{name}</button>
  );
}

export default Button;
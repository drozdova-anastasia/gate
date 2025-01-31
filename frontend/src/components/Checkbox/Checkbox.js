import './Checkbox.css';

function Checkbox ({checked, handleChecked}) {
  return (
    <label className='clickable checkbox'>
      <input type='checkbox'
             name='checkbox'
             className='checkbox__input'
             checked={checked}
             onChange={handleChecked}/>
      <span className='btn checkbox__span'/>
    </label>
  );
}

export default Checkbox;
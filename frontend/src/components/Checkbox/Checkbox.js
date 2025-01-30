import './Checkbox.css';

function Checkbox ({checked, handleCheck}) {
  return (
    <label className='checkbox'>
      <input type='checkbox'
             name='checkbox'
             className='checkbox__input'
             checked={checked}
             onChange={handleCheck}/>
      <span className='btn checkbox__span'/>
    </label>
  );
}

export default Checkbox;
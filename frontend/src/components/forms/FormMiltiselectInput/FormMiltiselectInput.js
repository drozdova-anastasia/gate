import { useEffect, useState, useReducer } from 'react';

import './FormMiltiselectInput.css';

function FormMiltiselectInput ({
  labelLeft,
  labelRight,
  choices,
  name,
  setForm,
  form
}) {
  const [avaliableList, setAvaliableList] = useState([]);
  const [dispalyAvaliableList, setDispalyAvaliableList] = useState([]);
  const [dispalySelectedList, setDispalySelectedList] = useState([]);
  const [handbook, setHandbook] = useState({});

  useEffect(
    () => {
      const handbook = {};
      const avaliableList = [];
      for (const item of choices) {
        handbook[item.value] = item.title;
        avaliableList.push(item.value);
      }
      setHandbook(handbook);
      setAvaliableList(avaliableList);
    },
    []
  );

  function handleSelect(value) {
    setAvaliableList(avaliableList.filter(item => item !== value));
    setForm({...form, [name]: [...form[name], value]});
  }

  function handleSelectAll() {
    setForm({...form, [name]: [...avaliableList, ...form[name]]});
    setAvaliableList([]);
  }

  function handleRemove(value) {
    setAvaliableList([...avaliableList, value]);
    setForm({...form, [name]: form[name].filter(item => item !== value)});
  }

  function handleRemoveAll() {
    setAvaliableList([...avaliableList, ...form[name]]);
    setForm({...form, [name]: []});
  }

  return (
    <div className='form-miltiselect-input'>
      <div className='form-miltiselect-input__block'>
        <label className='base-text form-miltiselect-input__label'
               htmlFor=''>{labelLeft}</label>
        <input className='base-text form-miltiselect-input__input'
               placeholder='Поиск...'
               onChange={() => {}}/>
        <ul className='form-miltiselect-input__items'>
          {
            avaliableList.map((item, index) =>
              <li className='clickable base-text form-miltiselect-input__item'
                  key={index}
                  onClick={() => handleSelect(item)}>{handbook[item]}</li>
            )
          }
        </ul>
        <span className='clickable base-text form-miltiselect-input__all-action'
              onClick={handleSelectAll}>Выбрать всё</span>
      </div>
      <div className='form-miltiselect-input__block'>
        <label className='base-text form-miltiselect-input__label'
               htmlFor=''>{labelRight}</label>
        <input className='base-text form-miltiselect-input__input'
               placeholder='Поиск...'
               onChange={() => {}}/>
        <ul className='form-miltiselect-input__items'>
          {
            form[name].map((item, index) =>
              <li className='clickable base-text form-miltiselect-input__item'
                  key={index}
                  onClick={() => handleRemove(item)}>{handbook[item]}</li>
            )
          }
        </ul>
        <span className='clickable base-text form-miltiselect-input__all-action'
              onClick={handleRemoveAll}>Удалить всё</span>
      </div>
    </div>
  );
}

export default FormMiltiselectInput;
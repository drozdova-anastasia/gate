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
  const [avaliableInput, setAvaliableInput] = useState('');
  const [selectedInput, setSelectedInput] = useState('');
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

  useEffect(
    () => setDispalyAvaliableList(
      avaliableList.filter(item => handbook[item].includes(avaliableInput))
    ),
    [avaliableList, avaliableInput]
  );

  useEffect(
    () => setDispalySelectedList(
      form[name].filter(item => handbook[item].includes(selectedInput))
    ),
    [form[name], selectedInput]
  );

  function update(value) {
    setForm({...form, [name]: value});
  }

  function handleSelect(value) {
    const data = avaliableList.filter(item => item !== value);
    setAvaliableList(data);
    update([...form[name], value]);
  }

  function handleSelectAll() {
    update([...avaliableList, ...form[name]]);
    setAvaliableList([]);
  }

  function handleRemove(value) {
    setAvaliableList([...avaliableList, value]);
    update(form[name].filter(item => item !== value));
  }

  function handleRemoveAll() {
    setAvaliableList([...avaliableList, ...form[name]]);
    update([]);
  }

  return (
    <div className='form-miltiselect-input'>
      <div className='form-miltiselect-input__block'>
        <label className='base-text form-miltiselect-input__label'
               htmlFor=''>{labelLeft}</label>
        <input className='base-text form-miltiselect-input__input'
               placeholder='Поиск...'
               onChange={(event) => setAvaliableInput(event.target.value)}
               value={avaliableInput}/>
        <ul className='form-miltiselect-input__items'>
          {
            dispalyAvaliableList.map((item, index) =>
              <li className='clickable base-text form-miltiselect-input__item'
                  key={index}
                  onDoubleClick={() => handleSelect(item)}>{handbook[item]}</li>
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
               onChange={(event) => setSelectedInput(event.target.value)}
               value={selectedInput}/>
        <ul className='form-miltiselect-input__items'>
          {
            dispalySelectedList.map((item, index) =>
              <li className='clickable base-text form-miltiselect-input__item'
                  key={index}
                  onDoubleClick={() => handleRemove(item)}>{handbook[item]}</li>
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
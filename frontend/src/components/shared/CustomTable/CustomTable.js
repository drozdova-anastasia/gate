import React from 'react';

import './CustomTable.css';
import TableRow from '../TableRow/TableRow';
import CheckboxForm from '../../forms/CheckboxForm/CheckboxForm';

function CustomTable ({
  items,
  keys,
  headers,
  handleDoubleClick,
  setSelectedList,
  selectedList,
}) {

  function handleSelectAll() {
    setSelectedList(selectedList.length > 0 ? [] : [...items]);
  }

  function handleSelect(item) {
    if (selectedList.includes(item)) {
      selectedList.splice(selectedList.indexOf(item), 1);
    } else {
      selectedList.push(item);
    }
    // not rerender without call setSelectedList
    setSelectedList([...selectedList]);
  }

  return (
    <section className=''
             aria-label='Секция со списком'>
      <table className='custom-table'>      
        <thead className='custom-table__thead'>
          <tr className='custom-table__tr '>
            <th className='custom-table__th custom-table__select-th'>
              <CheckboxForm checked={selectedList.length > 0}
                            handleChecked={handleSelectAll}/>
            </th>
            { 
              headers.map((header, index) =>
                <th className='custom-table__th'
                    key={index}>{header.label}</th>
              ) 
            }
          </tr>
        </thead>
        <tbody>
          {
            items.map((item, index) =>
              <TableRow key={index}
                        item={item}
                        keys={keys}
                        handleDoubleClick={handleDoubleClick}
                        handleSelect={handleSelect}
                        checked={selectedList.includes(item)}/>
            )
          }
        </tbody>
      </table>       
    </section>
  );
}

export default CustomTable;
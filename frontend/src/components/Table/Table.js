import React from 'react';

import './Table.css';
import Row from '../Row/Row';

function Table ({items, keys, headers, handleDoubleClick}) {
  return (
    <section className=''
             aria-label='Секция со списком'>
      <table className='list-items'>      
        <thead>
          <tr>
            <th/>
            { headers.map(header =><th>{header.label}</th>) }
          </tr>
        </thead>
        <tbody>
          {
            items.map(item =>
              <Row item={item}
                   keys={keys}
                   handleDoubleClick={handleDoubleClick}
                   key={item.id}/>
            )
          }
        </tbody>
      </table>       
    </section>
  );
}

export default Table;
import { useState } from 'react';

import './Row.css';
import Checkbox from '../Checkbox/Checkbox';
import { achain } from '../../utils/functools';

function Row ({item, keys, handleDoubleClick}) {
  const [checked, setChecked] = useState(false);

  function onDoubleClick() {
    handleDoubleClick(item);
  }

  function getValue(data) {
    if (data.calcValue) {
      return data.calcValue(item);
    }
    if (data.formatFunc) {
      return data.formatFunc(achain(item, data.key));
    }
    return achain(item, data.key);
  }

  return (
    <tr className='list-item'>
      <td>
        <Checkbox checked={checked}
                  handleCheck={() => setChecked(!checked)}/>
      </td>
      {
        keys.map(key =><td onDoubleClick={onDoubleClick}>{getValue(key)}</td>)
      }
    </tr>
  );
}

export default Row;
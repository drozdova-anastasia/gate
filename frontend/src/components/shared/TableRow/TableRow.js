import './TableRow.css';
import { getValue } from '../../../utils/functools';

import CheckboxForm from '../../forms/CheckboxForm/CheckboxForm';

function TableRow ({
  item,
  keys,
  handleDoubleClick,
  checked,
  handleSelect,
}) {
  return (
    <tr className='table-row'>
      <td className='clickable table-row__column table-row__checkbox'
          key='0'>
        <CheckboxForm checked={checked}
                      handleChecked={() => handleSelect(item)}/>
      </td>
      {
        keys.map((key, index) =>
          <td className='clickable base-text table-row__column'
              key={index + 1}
              onClick={() => handleSelect(item)}
              onDoubleClick={() => handleDoubleClick(item)}>{getValue(item, key)}</td>
        )
      }
    </tr>
  );
}

export default TableRow;
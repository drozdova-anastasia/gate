import './TableRow.css';
import CheckboxForm from '../../forms/CheckboxForm/CheckboxForm';
import { getValue } from '../../../utils/functools';

function TableRow ({
  item,
  keys,
  handleDoubleClick,
  checked,
  handleSelect,
}) {
  return (
    <tr className='table-row'>
      <td key='0' className='clickable table-row__td table-row__select-td'>
        <CheckboxForm checked={checked}
                      handleChecked={() => handleSelect(item)}/>
      </td>
      {
        keys.map((key, index) =>
          <td className='clickable table-row__td'
              key={index + 1}
              onClick={() => handleSelect(item)}
              onDoubleClick={() => handleDoubleClick(item)}>{getValue(item, key)}</td>
        )
      }
    </tr>
  );
}

export default TableRow;
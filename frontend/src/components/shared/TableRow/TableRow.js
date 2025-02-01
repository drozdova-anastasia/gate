import './Row.css';
import Checkbox from '../../forms/Checkbox/Checkbox';
import { getValue } from '../../../utils/functools';

function Row ({
  item,
  keys,
  handleDoubleClick,
  checked,
  handleSelect,
}) {
  return (
    <tr className='row'>
      <td key='0' className='clickable row__td row__select-td'>
        <Checkbox checked={checked}
                  handleChecked={() => handleSelect(item)}/>
      </td>
      {
        keys.map((key, index) =>
          <td className='clickable row__td'
              key={index + 1}
              onClick={() => handleSelect(item)}
              onDoubleClick={() => handleDoubleClick(item)}>{getValue(item, key)}</td>
        )
      }
    </tr>
  );
}

export default Row;
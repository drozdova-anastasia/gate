import { useMemo } from 'react';
import moment from 'moment/moment';

import './FormCalendar.css';

import { WEEK_DAYS } from '../../../constants/calendar';
import { numberRange } from '../../../utils/functools';
import { Calendar } from '../../../utils/Calendar';

function FormCalendar ({

}) {
  const calendar = new Calendar();
  const years = useMemo(numberRange(1900, moment().year() + 1));
  const currentDate = `${calendar.currentMonth}, ${calendar.currentYear}`;

  return (
    <>
      <div className='calendar__title'>
        { currentDate }
        <span className='clickable calendar__left-arrow'>◂</span>
        <span className='clickable calendar__down-arrow'>▾</span>
        <span className='clickable calendar__right-arrow'>▸</span>
        <div className='calendar__items'>
          {
            years.map(
              item => <div className='clickable calendar__items'>{ item }</div>
            )
          }
        </div>
      </div>
      <table className='calendar__table'>
        <thead className='calendar__thead'>
          <tr>
            {
              WEEK_DAYS.map(item => <td>{ item }</td>)
            }
          </tr>
        </thead>
        <tbody className='calendar__tbody'>
          {
            calendar.dayRange.map(
              week => <tr>{
                week.map(item => <th>{ item.format('D') }</th>)
              }</tr>
            )
          }
        </tbody>
      </table>
    </>
  );
}

export default FormCalendar;
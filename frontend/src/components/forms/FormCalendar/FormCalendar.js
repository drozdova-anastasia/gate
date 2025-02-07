import { useEffect, useReducer, useState } from 'react';

import './FormCalendar.css';
import { WEEK_DAYS, DATE_FORMAT } from '../../../constants/calendar';
import Calendar from '../../../utils/Calendar';

function FormCalendar ({ handleClick, value }) {
  const [calendar, setCalendar] = useState(null);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [showYears, setShowYears] = useState(false);
  const [day, setDay] = useState(null);

  useEffect(() => {
    const _calendar = new Calendar(value);
    setCalendar(_calendar);
    setDay(_calendar.current);
  }, []);

  function getDayClassName(item) {
    let className = 'clickable calendar__table-day';
    if (calendar.compareDates(item, day)) {
      className = `${className} calendar__table-day_selected`;
    }
    if (calendar.compareDates(item, calendar.today)) {
      className = `${className} calendar__table-day_today`;
    }
    if (
      item.month() !== calendar.currentMonth
      || item.year() !== calendar.currentYear
    ) {
      className = `${className} calendar__table-day_not-current`;
    }
    return className;
  }

  function getTableRow(week) {
    return week.map((item, index) => 
      <th className={ getDayClassName(item) }
          onClick={() => handleSelectDayClick(item)}
          key={index}>{ item.format('D') }</th>
    );
  }

  function reload(year, month) {
    calendar.reloadToFirstDay(year, month);
    forceUpdate();
  }

  function handleSelectYearClick(event) {
    reload(event.target.textContent, calendar.currentMonth);
    setShowYears(false);
  }

  function handleLeftArrowClick() {
    reload(calendar.prevYear, calendar.prevMonth);
  }

  function handleRightArrowClick() {
    reload(calendar.nextYear, calendar.nextMonth);
  }

  function handleCircleClick() {
    reload(calendar.today.year(), calendar.today.month());
  }

  function handleSelectDayClick(day) {
    setDay(day);
    handleClick(day.format(DATE_FORMAT));
  }

  return (
  <>{
    calendar && <div className='calendar'>
      <div className='calendar__title'>
        <span className='clickable calendar__left-arrow'
              onClick={handleLeftArrowClick}>◂</span>
        <p className='clickable calendar__month-year'>{ calendar.currentDisplay }</p>
        <span className='clickable calendar__down-arrow'
              onClick={() => setShowYears(!showYears)}>▾</span>
        <span className='clickable calendar__circle'
              onClick={handleCircleClick}>⏺︎</span>
        <span className='clickable calendar__right-arrow'
              onClick={handleRightArrowClick}>▸</span>
        {
          showYears &&
          <ul className='calendar__years'>
            {
              calendar.years.map((item, index) => 
                <li className='clickable calendar__year'
                     onClick={handleSelectYearClick}
                     key ={index}>{ item }</li>
              )
            }
          </ul>
        }
      </div>
      <table className='calendar__table'>
        <thead className='calendar__table-thead'>
          <tr className='calendar__table-header'>
            {
              WEEK_DAYS.map((item, index) => 
                <td className='calendar__table-week-day'
                    key={index}>{ item }</td>
              )
            }
          </tr>
        </thead>
        <tbody className='calendar__table-body'>
          {
            calendar.dayRange.map((week, index) =>
              <tr className='calendar__table-row'
                  key={index}>{ getTableRow(week) }</tr>
            )
          }
        </tbody>
      </table>
    </div>
  }</>
  );
}

export default FormCalendar;
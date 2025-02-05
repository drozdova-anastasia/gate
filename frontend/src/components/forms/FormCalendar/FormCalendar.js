import { useState } from 'react';
import moment from 'moment/moment';

import './FormCalendar.css';

import { WEEK_DAYS } from '../../../constants/calendar';
import { numberRange } from '../../../utils/functools';
import { Calendar } from '../../../utils/Calendar';

function FormCalendar () {
  const calendar = new Calendar();
  const years = numberRange(1900, moment().year() + 1).reverse();
  const [showYears, setShowYears] = useState(false);
  const [currentDisplay, setCurrentDisplay] = useState(calendar.currentDisplay);
  const [dayRange, setDayRange] = useState(calendar.dayRange);
  const [day, setDay] = useState(null);
  
  function handleShowYearsClick() {
    setShowYears(!showYears);
  }

  function handleSelectDayClick(day) {
    setDay(day);
  }

  function getDayClassName(item) {
    let className = 'clickable calendar__table-day';
    if (item === day) {
      className = `${className} calendar__table-day_selected`;
    }
    if (item === calendar.today) {
      return `${className} calendar__table-day_today`;
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

  function reloadCurrent(year, month) {
    calendar.reloadCurrent(calendar.getFirstDay(year, month));
    setCurrentDisplay(calendar.currentDisplay);
    setDayRange(calendar.dayRange);
  }

  function handleSelectYearClick(event) {
    //reloadCurrent(event.target.textContent, calendar.currentMonth);
    setShowYears(false);
  }

  function handleLeftArrowClick() {
    reloadCurrent(calendar.prevYear, calendar.prevMonth);
  }

  function handleRightArrowClick() {
    //reloadCurrent(calendar.nextYear, calendar.nextMonth);
  }

  return (
    <div className='calendar'>
      <div className='calendar__title'>
        <span className='clickable calendar__left-arrow'
              onClick={handleLeftArrowClick}>◂</span>
        <p className='clickable calendar__month-year'>{ currentDisplay }</p>
        <span className='clickable calendar__down-arrow'
              onClick={handleShowYearsClick}>▾</span>
        <span className='clickable calendar__right-arrow'
              onClick={handleRightArrowClick}>▸</span>
        {
          showYears && <ul className='calendar__years'>
            {
              years.map((item, index) => 
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
            dayRange.map((week, index) =>
              <tr className='calendar__table-row'
                  key={index}>{ getTableRow(week) }</tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default FormCalendar;
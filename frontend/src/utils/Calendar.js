import moment from 'moment/moment';

import { DAYS_IN_MONTH } from '../constants/calendar';

export const DATE_FORMAT = 'YYYY-MM-DD';

export class Calendar {

  constructor(date) {
    if (date) {
      this.reloadCurrent(date);
    } else {
      this.reloadCurrent(moment());
    }
    this.mouseIn = false;
    this.showYearRange = false;
  }

  reloadCurrent(data) {
    this.currentMonth = data.month();
    this.currentYear = data.year();
    const prevMonth = this.currentMonth > 0 ? this.currentMonth - 1 : 11;
    const prevYear = (
      this.currentMonth > 0 ? this.currentYear : this.currentYear - 1
    );
    const nextMonth = this.currentMonth === 11 ? 0 : this.currentMonth + 1;
    const nextYear = (
      this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear
    );
    this.dayRange = [];
    const dayRange = [];
    let day = data.day();
    if (day === 0) {
      day = 7;
    }
    for (
      let i = this.getDaysInMonth(prevMonth, prevYear) - day + 1;
      i < this.getDaysInMonth(prevMonth, prevYear);
      i++
    ) {
      dayRange.push(moment(
        `${this.currentYear}-${this.currentMonth + 1}-${i + 1}`,
        DATE_FORMAT
      ));
    }
    for (
      let i = 0;
      this.getDaysInMonth(this.currentMonth, this.currentYear);
      i++
    ) {
      dayRange.push(moment(
        `${prevYear}-${prevMonth + 1}-${i + 1}`,
        DATE_FORMAT
      ));
    }
    const rigthOffset = 7 - dayRange.length % 7;
    if (rigthOffset < 7) {
      for (let i = 0; i < rigthOffset; i++) {
        dayRange.push(moment(
          `${nextYear}-${nextMonth + 1}-${i + 1}`,
          DATE_FORMAT
        ));
      }
    }
    let weekNumber = 0;
    for (let i = 1; i < dayRange.length; i++) {
      if (i % 7 === 1) {
        this.dayRange([]);
      }
      this.dayRange[weekNumber].push(dayRange[i - 1]);
      if (i % 7 === 0) {
        weekNumber++;
      }
    }
  }

  getDaysInMonth(month, year) {
    if (month === 1 && year % 4 === 0) {
      return 29;
    }
    return DAYS_IN_MONTH[month];
  }
}
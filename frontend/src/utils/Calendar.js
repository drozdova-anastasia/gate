import moment from 'moment/moment';

import { DAYS_IN_MONTH, DATE_FORMAT, MONTHS } from '../constants/calendar';
import { numberRange } from '../utils/functools';

export default class Calendar {
  years = numberRange(1900, moment().year() + 1).reverse();

  constructor(date) {
    if (!date) {
      this.current =  moment();
    } else {
      const current =  moment(date, DATE_FORMAT, true);
      this.current =  current.isValid() ? current : moment();
    }
    this.today =  moment();
    this.reload(this.current);
  }

  compareDates(first, second) {
    return first?.format(DATE_FORMAT) === second?.format(DATE_FORMAT)
  }

  getFirstDay(year, month) {
    return moment(`${year}-${month + 1}-01`, DATE_FORMAT);
  }

  reloadToFirstDay(year, month) {
    this.reload(this.getFirstDay(year, month));
  }

  reload(data) {
    this.currentMonth = data.month();
    this.currentYear = data.year();
    this.currentDisplay = `${MONTHS[this.currentMonth]}, ${this.currentYear}`;
    this.prevMonth = this.currentMonth > 0 ? this.currentMonth - 1 : 11;
    this.prevYear = (
      this.currentMonth > 0 ? this.currentYear : this.currentYear - 1
    );
    this.nextMonth = this.currentMonth === 11 ? 0 : this.currentMonth + 1;
    this.nextYear = (
      this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear
    );
    this.dayRange = [];
    const dayRange = [];
    const firstDay = this.getFirstDay(this.currentYear, this.currentMonth);
    let day = firstDay.day();
    if (day === 0) {
      day = 7;
    }
    for (
      let i = this.getDaysInMonth(this.prevMonth, this.prevYear) - day + 1;
      i < this.getDaysInMonth(this.prevMonth, this.prevYear);
      i++
    ) {
      dayRange.push(moment(
        `${this.prevYear}-${this.prevMonth + 1}-${i + 1}`,
        DATE_FORMAT
      ));
    }
    for (
      let i = 0;
      i < this.getDaysInMonth(this.currentMonth, this.currentYear);
      i++
    ) {
      dayRange.push(moment(
        `${this.currentYear}-${this.currentMonth + 1}-${i + 1}`,
        DATE_FORMAT
      ));
    }
    const rigthOffset = 7 - dayRange.length % 7;
    if (rigthOffset < 7) {
      for (let i = 0; i < rigthOffset; i++) {
        dayRange.push(moment(
          `${this.nextYear}-${this.nextMonth + 1}-${i + 1}`,
          DATE_FORMAT
        ));
      }
    }
    let weekNumber = 0;
    for (let i = 1; i <= dayRange.length; i++) {
      if (i % 7 === 1) {
        this.dayRange.push([]);
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
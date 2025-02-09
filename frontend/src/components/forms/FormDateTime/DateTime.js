import Mask from '../../../utils/Mask';
import { DATE_MASK, TIME_MASK } from '../../../constants/mask';

export default class DateTime {

  constructor(setDate, setTime, handleChange) {
    this.dateMask = new Mask(DATE_MASK);
    this.timeMask = new Mask(TIME_MASK);
    this.setDate = setDate;
    this.setTime = setTime;
    this.handleChange = handleChange;
    this.date = '';
    this.time = '';
    this.dateTime = '';
  }

  saveDateTime() {
    if (!this.date && !this.time) {
      this.dateTime = '';
    } else {
      this.dateTime = `${this.date}T${this.time}Z`;
    }
  }

  applyDateTime(value) {
    if (value === this.dateTime) {
      return;
    }
    const splitted = (value || '').split('T');
    if (splitted.length === 0) {
      this.setDate('');
      this.setTime('');
    }
    if (splitted.length > 1) {
      this.applyTime(splitted[1], false);
    }
    this.applyDate(splitted[0], false);
  }

  applyDate(date, handleChange = true) {
    this.dateMask.apply(
      date,
      (value) => {
        this.date = value;
        this.setDate(value);
        this.saveDateTime();
        if (handleChange) {
          this.handleChange(this.dateTime);
        }
      }
    );
  }

  applyTime(time, handleChange = true) {
    this.timeMask.apply(
      time,
      (value) => {
        this.time = value;
        this.setTime(value);
        this.saveDateTime();
        if (handleChange) {
          this.handleChange(this.dateTime);
        }
      }
    );
  }
}
import * as moment from 'moment/moment';

export function formatFio(value, full) {
  if (!value) {
    return '';
  }
  return [
    value.lastName,
    value.firstName,
    value.middleName
  ].map((item, index) => {
    if (!item) {
      return item;
    }
    return full || index === 0 ? item : `${item.substr(0, 1)}.`;
  }).filter(item => item).join(' ');
}

export function formatDateToSave(value, pattern) {
  if (!value) {
    return value;
  }
  const momentObj = moment(value);
  return momentObj.isValid() ? momentObj.format(pattern) : value;
}

export function getTitleByOptions(value, options) {
  if (!value) {
    return '';
  }
  return options.filter(item => item.value === value)[0]?.title;
}

export function last(val) {
  return val[val.length - 1];
}

export function achain(value, path) {
  return path.split('.').reduce(
    (prev, curr) => prev && prev.hasOwnProperty(curr) ? prev[curr] : null, value
  );
}

export function getValue(item, data) {
  if (data.calcValue) {
    return data.calcValue(item);
  }
  if (data.formatFunc) {
    return data.formatFunc(achain(item, data.key));
  }
  return achain(item, data.key);
}

export function numberRange(start, end) {
  return new Array(end - start).fill().map((j, i) => i + start);
}

export function handleClosePopup(ref, func) {
  function handleClose(event) {
    if (!ref.current.contains(event.target)) {
      func();
    }
  }
  window.addEventListener('click', handleClose, {capture: true});
  return () => window.removeEventListener(
    'click',
    handleClose,
    {capture: true}
  );
}

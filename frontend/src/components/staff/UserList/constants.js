import { formatFio, formatDateToSave } from '../../../utils/functools';
import { DATETIME_FORMAT } from '../../../constants/calendar';

const ROLE_TYPES = {
  admin: 'Админ',
  agent: 'Оператор',
  personal: 'Персонал',
};

export const KEYS = [
  {
    label: 'Логин',
    key: 'username',
  },
  {
    label: 'ФИО',
    calcValue: item => formatFio(item)
  },
  {
    label: 'Роль',
    key: 'roleType',
    formatFunc: item => ROLE_TYPES[item] || item
  },
  {
    label: 'Дата последнего входа',
    key: 'lastLogin',
    formatFunc: item => formatDateToSave(item, DATETIME_FORMAT)
  },
  {
    label: 'Активная УЗ',
    key: 'isActive',
    formatFunc: item => item ? 'Да' : 'Нет'
  },
  {
    label: 'Организация',
    key: 'organization.title'
  },
  {
    label: 'Дата изменения',
    key: 'updated',
    formatFunc: item => formatDateToSave(item, DATETIME_FORMAT)
  }
];

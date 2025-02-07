import { formatFio, formatDateToSave } from '../../../utils/functools';
import { DATETIME_FORMAT } from '../../../constants/calendar';

const ROLE_TYPES = {
  admin: 'admin1',
  agent: 'agent1',
  personal: 'personal1',
};

export const KEYS = [
  {
    label: 'username',
    key: 'username',
  },
  {
    label: 'firstName',
    calcValue: item => formatFio(item)
  },
  {
    label: 'roleType',
    key: 'roleType',
    formatFunc: item => ROLE_TYPES[item] || item
  },
  {
    label: 'lastLogin',
    key: 'lastLogin',
    formatFunc: item => formatDateToSave(item, DATETIME_FORMAT)
  },
  {
    label: 'isActive',
    key: 'isActive',
    formatFunc: item => item ? 'Yes' : 'No'
  },
  {
    label: 'organization',
    key: 'organization.title'
  },
  {
    label: 'updated',
    key: 'updated',
    formatFunc: item => formatDateToSave(item, DATETIME_FORMAT)
  }
];

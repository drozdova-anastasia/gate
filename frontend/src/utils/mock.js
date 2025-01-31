export const USERS = [
  {
    id: 1,
    username: 'admin',
    roleType: 'admin',
    isActive: true,
    lastLogin: '2025-01-29T20:55:00.123456Z',
    updated: '2024-01-29T20:55:00.123456Z'
  },
  {
    id: 2,
    username: 'personal',
    roleType: 'personal',
    firstName: 'firstName',
    isActive: true,
    lastLogin: '2025-01-30T20:55:00.123456Z',
    updated: '2024-01-29T20:55:00.123456Z'
  },
  {
    id: 3,
    username: 'operator',
    roleType: 'agent',
    lastName: 'lastName',
    firstName: 'firstName',
    middleName: 'middleName',
    isActive: true,
    lastLogin: '2025-01-31T20:55:00.123456Z',
    updated: '2024-01-29T20:55:00.123456Z',
    organization: {
      id: 1,
      title: 'title'
    }
  },
  {
    id: 4,
    username: 'operator2',
    roleType: 'agent',
    lastName: 'lastName',
    isActive: false,
    updated: '2024-01-29T20:55:00.123456Z'
  },
  {
    id: 5,
    username: 'admin',
    roleType: 'admin',
    isActive: true,
    lastLogin: '2025-01-29T20:55:00.123456Z',
    updated: '2024-01-29T20:55:00.123456Z'
  },
  {
    id: 6,
    username: 'admin',
    roleType: 'admin',
    isActive: true,
    lastLogin: '2025-01-29T20:55:00.123456Z',
    updated: '2024-01-29T20:55:00.123456Z'
  },
  {
    id: 7,
    username: 'admin',
    roleType: 'admin',
    isActive: true,
    lastLogin: '2025-01-29T20:55:00.123456Z',
    updated: '2024-01-29T20:55:00.123456Z'
  },
];

export const CURRENT_USER = {
  username: 'name',
  email: 'email@mail.com',
}

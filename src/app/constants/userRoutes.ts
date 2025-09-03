import { USER_TYPES } from './userTypes';

export interface NavItem {
  name: string;
  iconName: string;
  path: string;
}

export const getNavItems = (userType: string): NavItem[] => {
  switch (userType) {
    case USER_TYPES.MASTER:
      return [
        { name: 'Accueil', iconName: 'FiHome', path: '/master' },
        { name: 'Événements', iconName: 'FiCalendar', path: '/master/programmes' },
        { name: 'Sermons', iconName: 'FiBook', path: '/master/sermons' },
        { name: 'Prédications', iconName: 'FiMic', path: '/master/preachings' },
        { name: 'Annonces', iconName: 'FiBell', path: '/master/announcements' },
        { name: 'Membres', iconName: 'FiUsers', path: '/master/members' },
        { name: 'Finances', iconName: 'FiDollarSign', path: '/master/finances' },
        { name: 'Paramètres', iconName: 'FiSettings', path: '/master/settings' },
      ];
    case USER_TYPES.DEACONS:
      return [
        { name: 'Accueil', iconName: 'FiHome', path: '/deacons' },
        { name: 'Membres', iconName: 'FiUsers', path: '/deacons/members' },
      ];
    case USER_TYPES.SUPPORT:
      return [
        { name: 'Accueil', iconName: 'FiHome', path: '/support' },
        { name: 'Utilisateurs', iconName: 'FiUsers', path: '/support/users' },
        { name: 'Paramètres', iconName: 'FiSettings', path: '/support/settings' },
      ];
    case USER_TYPES.SUPERADMIN:
      return [
        { name: 'Accueil', iconName: 'FiHome', path: '/superadmin' },
      ];
    default:
      return [];
  }
};
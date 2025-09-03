export const USER_TYPES = {
    MASTER: 'master',
    DEACONS: 'deacons',
    SUPPORT: 'support',
    SUPERADMIN: 'superadmin',
  } as const;
  
  export type UserType = keyof typeof USER_TYPES;
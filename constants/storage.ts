export const STORAGE_KEYS = {
  // Key under which the user's name is saved
  name: 'profile_name',

  // Key under which the user's city is saved
  city: 'profile_city',
} as const; // Const makes the values not to change even by mistake 
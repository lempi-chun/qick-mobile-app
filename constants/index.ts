/**
 * Central export file for all constants
 * Import any constants from here for consistency
 */

export * from './Colors';
export * from './Fonts';

// Common spacing values
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Common border radius values
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  full: 999,
};

// Common shadow styles
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
};

// Sports-related constants
export const sports = {
  SOCCER: 'soccer',
  BASKETBALL: 'basketball',
  TENNIS: 'tennis',
  VOLLEYBALL: 'volleyball',
  FUTSAL: 'futsal',
} as const;

// Booking status constants
export const bookingStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const;

// Player limits for different sports
export const playerLimits = {
  [sports.SOCCER]: { min: 18, max: 22 },
  [sports.BASKETBALL]: { min: 8, max: 12 },
  [sports.TENNIS]: { min: 2, max: 4 },
  [sports.VOLLEYBALL]: { min: 10, max: 12 },
  [sports.FUTSAL]: { min: 8, max: 10 },
};

export type SportType = typeof sports[keyof typeof sports];
export type BookingStatus = typeof bookingStatus[keyof typeof bookingStatus]; 
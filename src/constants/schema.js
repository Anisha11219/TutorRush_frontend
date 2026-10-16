// Enums mirrored from the TutorRush database schema (PRD v3.1 + v4.0).
// Keep in sync with the backend Mongoose models.

export const ROLES = Object.freeze({
  STUDENT: 'STUDENT',
  TUTOR: 'TUTOR',
  ADMIN: 'ADMIN',
});

export const ACCOUNT_STATUS = ['ACTIVE', 'SUSPENDED', 'DEACTIVATED'];

export const EDUCATION_LEVELS = ['SCHOOL', 'UNDERGRADUATE', 'POSTGRADUATE', 'OTHER'];

export const TEACHING_MODES = ['ONLINE', 'OFFLINE'];

export const REQUIREMENT_TEACHING_MODES = ['ONLINE', 'OFFLINE', 'EITHER'];

export const DIFFICULTY_LEVELS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

export const REQUIREMENT_STATUS = ['ACTIVE', 'MATCHED', 'CLOSED', 'CANCELLED'];

export const VERIFICATION_STATUS = ['PENDING', 'APPROVED', 'REJECTED'];

export const PROFILE_STATUS = ['DRAFT', 'ACTIVE', 'INACTIVE'];

export const BOOKING_STATUS = [
  'PENDING',
  'ACCEPTED',
  'CONFIRMED',
  'IN_PROGRESS',
  'COMPLETED',
  'REJECTED',
  'CANCELLED',
];

export const PAYMENT_STATUS = [
  'NOT_REQUIRED',
  'PENDING',
  'PAID',
  'FAILED',
  'REFUND_PENDING',
  'REFUNDED',
];

export const SESSION_STATUS = ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

export const NOTIFICATION_TYPES = [
  'BOOKING_REQUEST',
  'BOOKING_ACCEPTED',
  'BOOKING_REJECTED',
  'BOOKING_CONFIRMED',
  'BOOKING_CANCELLED',
  'SESSION_EVENT',
  'PAYMENT_EVENT',
  'TUTOR_VERIFICATION',
  'SYSTEM',
];

export const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// Money is stored as integer paise (INR). Convert only for display.
export const paiseToRupees = (paise) => Math.round(Number(paise) || 0) / 100;

export const rupeesToPaise = (rupees) => Math.round((Number(rupees) || 0) * 100);

export const formatINR = (paise) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(paiseToRupees(paise));

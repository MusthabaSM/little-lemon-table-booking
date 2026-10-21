/**
 * Form validation utilities for Little Lemon table reservations.
 */

import { getTodayDateString } from './bookingUtils';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;

/**
 * Validates whether an email address adheres to standard formatting.
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = function (email) {
  if (!email || typeof email !== 'string') return false;
  return EMAIL_REGEX.test(email.trim());
};

/**
 * Validates whether a date string is in valid YYYY-MM-DD format.
 * @param {string} dateString
 * @returns {boolean}
 */
export const isValidDate = function (dateString) {
  if (!dateString || typeof dateString !== 'string') return false;
  const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return false;

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);

  if (month < 1 || month > 12 || day < 1 || day > 31) return false;

  const dateObj = new Date(year, month - 1, day);
  return (
    dateObj.getFullYear() === year &&
    dateObj.getMonth() === month - 1 &&
    dateObj.getDate() === day
  );
};

/**
 * Checks whether a given YYYY-MM-DD date is in the past compared to today.
 * @param {string} dateString
 * @returns {boolean}
 */
export const isPastDate = function (dateString) {
  if (!isValidDate(dateString)) return true;
  const todayStr = getTodayDateString();
  return dateString < todayStr;
};

/**
 * Validates whether guest count is a positive integer between min (1) and max (10).
 * @param {number|string} count
 * @param {number} [min=1]
 * @param {number} [max=10]
 * @returns {boolean}
 */
export const isValidGuestCount = function (count, min = 1, max = 10) {
  const num = Number(count);
  return Number.isInteger(num) && num >= min && num <= max;
};

/**
 * Validates a name string (trimmed length >= 2, non-empty, letters/spaces/hyphens).
 * @param {string} name
 * @returns {boolean}
 */
export const isValidName = function (name) {
  if (!name || typeof name !== 'string') return false;
  const trimmed = name.trim();
  return trimmed.length >= 2 && trimmed.length <= 50;
};

/**
 * Validates optional phone numbers. If empty, considered valid unless required.
 * @param {string} phone
 * @returns {boolean}
 */
export const isValidPhone = function (phone) {
  if (!phone || typeof phone !== 'string') return true;
  const trimmed = phone.trim();
  if (trimmed === '') return true;
  return PHONE_REGEX.test(trimmed);
};

/**
 * Validates an individual form field and returns a descriptive error message or empty string.
 * @param {string} name
 * @param {*} value
 * @param {object} allValues
 * @param {string[]} availableTimes
 * @returns {string}
 */
export const validateField = function (name, value, allValues = {}, availableTimes = []) {
  const strVal = typeof value === 'string' ? value.trim() : value;

  switch (name) {
    case 'date': {
      if (!strVal) {
        return 'Please select a reservation date.';
      }
      if (!isValidDate(strVal)) {
        return 'Please enter a valid calendar date (YYYY-MM-DD).';
      }
      if (isPastDate(strVal)) {
        return 'Reservations cannot be booked for past dates.';
      }
      return '';
    }

    case 'time': {
      if (!strVal) {
        return 'Please choose a dining time.';
      }
      if (availableTimes.length > 0 && !availableTimes.includes(strVal)) {
        return 'The selected time is not available for this date.';
      }
      return '';
    }

    case 'guests': {
      if (value === '' || value === undefined || value === null) {
        return 'Please enter the number of guests.';
      }
      const num = Number(value);
      if (!Number.isInteger(num) || num < 1) {
        return 'Party size must be at least 1 guest.';
      }
      if (num > 10) {
        return 'Online reservations are limited to 10 guests. For larger parties, please call us.';
      }
      return '';
    }

    case 'firstName': {
      if (!strVal) {
        return 'First name is required.';
      }
      if (strVal.length < 2) {
        return 'First name must contain at least 2 characters.';
      }
      if (strVal.length > 50) {
        return 'First name cannot exceed 50 characters.';
      }
      return '';
    }

    case 'lastName': {
      if (!strVal) {
        return 'Last name is required.';
      }
      if (strVal.length < 2) {
        return 'Last name must contain at least 2 characters.';
      }
      if (strVal.length > 50) {
        return 'Last name cannot exceed 50 characters.';
      }
      return '';
    }

    case 'email': {
      if (!strVal) {
        return 'Email address is required.';
      }
      if (!isValidEmail(strVal)) {
        return 'Please enter a valid email address (e.g. name@example.com).';
      }
      return '';
    }

    case 'phone': {
      if (strVal && !isValidPhone(strVal)) {
        return 'Please enter a valid phone number (e.g. (312) 555-0199).';
      }
      return '';
    }

    default:
      return '';
  }
};

/**
 * Validates the complete booking form state.
 * @param {object} formData
 * @param {string[]} availableTimes
 * @returns {{isValid: boolean, errors: Record<string, string>}}
 */
export const validateBookingForm = function (formData, availableTimes = []) {
  const errors = {};

  const fieldsToValidate = [
    'date',
    'time',
    'guests',
    'firstName',
    'lastName',
    'email',
    'phone',
  ];

  fieldsToValidate.forEach((field) => {
    const error = validateField(field, formData[field], formData, availableTimes);
    if (error) {
      errors[field] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

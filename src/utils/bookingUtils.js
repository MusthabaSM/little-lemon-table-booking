/**
 * Little Lemon reservation business logic, date/time calculation,
 * seeded random availability generator, and local submission simulation.
 */

import { DEFAULT_TIMES } from '../constants/occasions';

/**
 * Seeded pseudo-random number generator used in the Meta Front-End Capstone course.
 * @param {number} seed
 * @returns {() => number}
 */
export const seededRandom = function (seed) {
  const m = 2 ** 35 - 31;
  const a = 185852;
  let s = (Math.abs(seed) || 1) % m;
  return function () {
    s = (s * a) % m;
    return s / m;
  };
};

/**
 * Calculates a stable numeric seed from any Date object or ISO date string (YYYY-MM-DD).
 * Incorporates year, month, and day to ensure deterministic slots per day.
 * @param {Date|string} dateInput
 * @returns {number}
 */
export const getDateSeed = function (dateInput) {
  const d = typeof dateInput === 'string' ? new Date(`${dateInput}T00:00:00`) : new Date(dateInput);
  if (Number.isNaN(d.getTime())) {
    return 42;
  }
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
};

/**
 * Generates available dining times for a given date.
 * Complies with the Meta Capstone seeded random algorithm.
 * @param {Date|string} date
 * @returns {string[]} List of available 24-hour time strings (e.g. ['17:00', '18:30'])
 */
export const fetchAPI = function (date) {
  const seed = getDateSeed(date);
  const random = seededRandom(seed);
  const availableSlots = [];

  for (let hour = 17; hour <= 22; hour++) {
    if (random() < 0.6) {
      availableSlots.push(`${hour}:00`);
    }
    if (random() < 0.6) {
      availableSlots.push(`${hour}:30`);
    }
  }

  // Safety guarantee: If random generates an empty slot list, return default evening times
  if (availableSlots.length === 0) {
    return [...DEFAULT_TIMES];
  }

  return availableSlots;
};

/**
 * Simulates the restaurant reservation submission API.
 * Performs simulated network latency and persists confirmed bookings to localStorage.
 * @param {object} formData
 * @returns {Promise<{success: boolean, confirmationNumber: string, booking: object}>}
 */
export const submitAPI = function (formData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!formData || !formData.date || !formData.time || !formData.firstName || !formData.email) {
        reject(new Error('Incomplete reservation details provided.'));
        return;
      }

      const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
      const confirmationNumber = `LL-${new Date().getFullYear()}-${randomSuffix}`;

      const bookingRecord = {
        ...formData,
        id: confirmationNumber,
        createdAt: new Date().toISOString(),
      };

      try {
        saveReservationToStorage(bookingRecord);
      } catch (storageErr) {
        // Continue even if localStorage is blocked by private browsing mode
        console.warn('Could not persist reservation to localStorage:', storageErr);
      }

      resolve({
        success: true,
        confirmationNumber,
        booking: bookingRecord,
      });
    }, 400);
  });
};

/**
 * Initializes available reservation times for today's date.
 * Specifically evaluated in the Meta Capstone unit testing rubric.
 * @returns {string[]}
 */
export const initializeTimes = function (initialDate = new Date()) {
  return fetchAPI(initialDate);
};

/**
 * Reducer function for managing available dining times based on selected reservation date.
 * Evaluated in the Meta Capstone unit testing rubric.
 * @param {string[]} state - Current list of available times
 * @param {{type: string, payload?: string, date?: string}|string} action
 * @returns {string[]} New list of available times
 */
export const updateTimes = function (state, action) {
  if (!action) return state;

  let selectedDate;

  // Support both flux standard action `{ type, payload }`, `{ type, date }`, or direct string/Date
  if (typeof action === 'object') {
    if (action.type === 'UPDATE_TIMES') {
      selectedDate = action.payload || action.date;
    } else {
      return state;
    }
  } else if (typeof action === 'string') {
    selectedDate = action;
  }

  if (!selectedDate) {
    return state;
  }

  return fetchAPI(selectedDate);
};

/**
 * Returns today's date in local YYYY-MM-DD format for HTML5 min attribute.
 * @returns {string}
 */
export const getTodayDateString = function () {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Formats a 24h time string like "18:30" into readable "6:30 PM".
 * @param {string} timeStr
 * @returns {string}
 */
export const formatDisplayTime = function (timeStr) {
  if (!timeStr) return '';
  const [hourStr, minuteStr] = timeStr.split(':');
  const hour = parseInt(hourStr, 10);
  if (Number.isNaN(hour)) return timeStr;

  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${minuteStr || '00'} ${ampm}`;
};

/**
 * Formats an ISO date string "YYYY-MM-DD" into "Tuesday, Oct 21, 2026".
 * @param {string} dateStr
 * @returns {string}
 */
export const formatDisplayDate = function (dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  if (!year || !month || !day) return dateStr;

  const dateObj = new Date(year, month - 1, day);
  return dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const STORAGE_KEY = 'little_lemon_reservations';

/**
 * Persists a confirmed reservation into localStorage.
 * @param {object} reservation
 */
export const saveReservationToStorage = function (reservation) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  const existing = getStoredReservations();
  const updated = [reservation, ...existing];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

/**
 * Retrieves persisted reservations from localStorage.
 * @returns {object[]}
 */
export const getStoredReservations = function () {
  if (typeof window === 'undefined' || !window.localStorage) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Error reading from localStorage', err);
    return [];
  }
};

/**
 * Clears stored reservations (useful for test resets).
 */
export const clearStoredReservations = function () {
  if (typeof window === 'undefined' || !window.localStorage) return;
  window.localStorage.removeItem(STORAGE_KEY);
};

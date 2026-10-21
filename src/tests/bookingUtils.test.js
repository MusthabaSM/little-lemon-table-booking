import { describe, it, expect, beforeEach } from 'vitest';
import {
  initializeTimes,
  updateTimes,
  fetchAPI,
  submitAPI,
  seededRandom,
  getDateSeed,
  formatDisplayTime,
  formatDisplayDate,
  getTodayDateString,
  saveReservationToStorage,
  getStoredReservations,
  clearStoredReservations,
} from '../utils/bookingUtils';

describe('Meta Capstone - bookingUtils Reducer & Time Functions', () => {
  beforeEach(() => {
    clearStoredReservations();
  });

  describe('initializeTimes', () => {
    it('returns a non-empty array of available dining times for today', () => {
      const times = initializeTimes();
      expect(Array.isArray(times)).toBe(true);
      expect(times.length).toBeGreaterThan(0);
      // Verify time format (e.g. "17:00", "18:30")
      times.forEach((slot) => {
        expect(slot).toMatch(/^\d{2}:\d{2}$/);
      });
    });

    it('returns consistent slots for a specific initial date', () => {
      const date1 = new Date(2026, 9, 21);
      const timesA = initializeTimes(date1);
      const timesB = initializeTimes(date1);
      expect(timesA).toEqual(timesB);
    });
  });

  describe('updateTimes', () => {
    it('updates available times when receiving an action object with payload', () => {
      const initialState = ['17:00', '18:00'];
      const action = { type: 'UPDATE_TIMES', payload: '2026-11-15' };
      const updated = updateTimes(initialState, action);

      expect(Array.isArray(updated)).toBe(true);
      expect(updated.length).toBeGreaterThan(0);
      expect(updated).toEqual(fetchAPI('2026-11-15'));
    });

    it('updates available times when receiving an action object with date property', () => {
      const initialState = ['17:00'];
      const action = { type: 'UPDATE_TIMES', date: '2026-12-25' };
      const updated = updateTimes(initialState, action);

      expect(Array.isArray(updated)).toBe(true);
      expect(updated).toEqual(fetchAPI('2026-12-25'));
    });

    it('updates available times when receiving date string directly as action', () => {
      const initialState = ['17:00'];
      const updated = updateTimes(initialState, '2026-10-31');

      expect(Array.isArray(updated)).toBe(true);
      expect(updated).toEqual(fetchAPI('2026-10-31'));
    });

    it('returns current state when action type is unknown', () => {
      const initialState = ['17:00', '18:00', '19:00'];
      const action = { type: 'UNKNOWN_ACTION', payload: '2026-11-15' };
      const result = updateTimes(initialState, action);
      expect(result).toBe(initialState);
    });

    it('returns current state when action is null or undefined', () => {
      const initialState = ['17:00', '18:00'];
      expect(updateTimes(initialState, null)).toBe(initialState);
      expect(updateTimes(initialState, undefined)).toBe(initialState);
    });
  });

  describe('seededRandom & getDateSeed', () => {
    it('produces deterministic output for a given seed', () => {
      const rand1 = seededRandom(12345);
      const rand2 = seededRandom(12345);
      expect(rand1()).toBe(rand2());
      expect(rand1()).toBe(rand2());
    });

    it('produces stable date seeds from date strings', () => {
      const seed1 = getDateSeed('2026-10-21');
      const seed2 = getDateSeed('2026-10-21');
      expect(seed1).toBe(seed2);
      expect(seed1).toBe(20261021);
    });
  });

  describe('Time and Date formatting', () => {
    it('formats 24-hour time to 12-hour AM/PM string', () => {
      expect(formatDisplayTime('17:00')).toBe('5:00 PM');
      expect(formatDisplayTime('18:30')).toBe('6:30 PM');
      expect(formatDisplayTime('12:00')).toBe('12:00 PM');
      expect(formatDisplayTime('21:45')).toBe('9:45 PM');
    });

    it('formats ISO date to human readable format', () => {
      const formatted = formatDisplayDate('2026-10-21');
      expect(formatted).toContain('2026');
      expect(formatted).toContain('Oct');
    });

    it('returns local date in YYYY-MM-DD format for getTodayDateString', () => {
      const todayStr = getTodayDateString();
      expect(todayStr).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('submitAPI and LocalStorage persistence', () => {
    it('successfully submits valid reservation data and saves to storage', async () => {
      const sampleReservation = {
        date: '2026-10-25',
        time: '19:00',
        guests: '4',
        occasion: 'birthday',
        seating: 'outdoor',
        firstName: 'Mario',
        lastName: 'Rossi',
        email: 'mario@littlelemon.com',
        phone: '3125550199',
        specialRequests: 'Window seat please',
      };

      const result = await submitAPI(sampleReservation);
      expect(result.success).toBe(true);
      expect(result.confirmationNumber).toMatch(/^LL-\d{4}-[A-Z0-9]+$/);
      expect(result.booking.firstName).toBe('Mario');

      const stored = getStoredReservations();
      expect(stored.length).toBe(1);
      expect(stored[0].id).toBe(result.confirmationNumber);
    });

    it('directly saves and retrieves reservations via saveReservationToStorage', () => {
      const mockBooking = { id: 'LL-TEST-1', firstName: 'Luigi' };
      saveReservationToStorage(mockBooking);
      const stored = getStoredReservations();
      expect(stored).toContainEqual(mockBooking);
    });

    it('rejects incomplete reservation data', async () => {
      await expect(submitAPI({})).rejects.toThrow('Incomplete reservation details');
    });
  });
});

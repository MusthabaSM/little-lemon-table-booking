import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import BookingForm from '../components/BookingForm';
import { getTodayDateString } from '../utils/bookingUtils';
import { validateField, validateBookingForm } from '../utils/validation';

describe('Meta Capstone - BookingForm Component', () => {
  const mockTimes = ['17:00', '18:00', '19:00', '20:00', '21:00'];
  const mockDispatch = vi.fn();
  const mockSubmit = vi.fn();

  // Test 1: Static text & labels rendering
  describe('Static Text & Field Labels', () => {
    it('renders the expected form headings, field labels and submit button text', () => {
      render(
        <BookingForm
          availableTimes={mockTimes}
          dispatchDateChange={mockDispatch}
          onSubmitForm={mockSubmit}
        />
      );

      // Verify legend headings
      expect(screen.getByText(/1\.\s*Reservation Details/i)).toBeInTheDocument();
      expect(screen.getByText(/2\.\s*Guest Information/i)).toBeInTheDocument();

      // Verify required Meta Capstone field labels
      expect(screen.getByLabelText(/Choose date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Choose time/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Number of guests/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();

      // Verify contact field labels
      expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();

      // Verify submit button
      const submitButton = screen.getByRole('button', { name: /On Click/i });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveTextContent(/Make Your Reservation/i);
    });
  });

  // Test 2: HTML5 Validation Attributes
  describe('HTML5 Form Validation Attributes', () => {
    it('applies correct HTML5 validation attributes to all required fields', () => {
      render(
        <BookingForm
          availableTimes={mockTimes}
          dispatchDateChange={mockDispatch}
          onSubmitForm={mockSubmit}
        />
      );

      // 1. Date input attributes
      const dateInput = screen.getByLabelText(/Choose date/i);
      expect(dateInput).toHaveAttribute('type', 'date');
      expect(dateInput).toHaveAttribute('required');
      expect(dateInput).toHaveAttribute('min', getTodayDateString());

      // 2. Time select attributes
      const timeSelect = screen.getByLabelText(/Choose time/i);
      expect(timeSelect).toHaveAttribute('required');

      // 3. Guests input attributes
      const guestsInput = screen.getByLabelText(/Number of guests/i);
      expect(guestsInput).toHaveAttribute('type', 'number');
      expect(guestsInput).toHaveAttribute('required');
      expect(guestsInput).toHaveAttribute('min', '1');
      expect(guestsInput).toHaveAttribute('max', '10');

      // 4. Contact fields
      const firstNameInput = screen.getByLabelText(/First Name/i);
      expect(firstNameInput).toHaveAttribute('type', 'text');
      expect(firstNameInput).toHaveAttribute('required');

      const lastNameInput = screen.getByLabelText(/Last Name/i);
      expect(lastNameInput).toHaveAttribute('type', 'text');
      expect(lastNameInput).toHaveAttribute('required');

      const emailInput = screen.getByLabelText(/Email Address/i);
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('required');

      // 5. Submit button
      const submitBtn = screen.getByRole('button', { name: /On Click/i });
      expect(submitBtn).toHaveAttribute('type', 'submit');
    });
  });

  // Test 3: JavaScript Validation Functions
  describe('JavaScript Validation Functions', () => {
    it('validates fields correctly with validateField', () => {
      // Date validation
      expect(validateField('date', '')).toMatch(/Please select a reservation date/i);
      expect(validateField('date', '2020-01-01')).toMatch(/past dates/i);
      expect(validateField('date', getTodayDateString())).toBe('');

      // Guests validation
      expect(validateField('guests', '0')).toMatch(/at least 1 guest/i);
      expect(validateField('guests', '15')).toMatch(/limited to 10 guests/i);
      expect(validateField('guests', '')).toMatch(/enter the number of guests/i);
      expect(validateField('guests', '4')).toBe('');

      // Email validation
      expect(validateField('email', 'not-an-email')).toMatch(/valid email address/i);
      expect(validateField('email', 'mario@example.com')).toBe('');

      // First Name validation
      expect(validateField('firstName', 'A')).toMatch(/at least 2 characters/i);
      expect(validateField('firstName', 'Mario')).toBe('');
    });

    it('returns isValid: false when required fields are missing', () => {
      const invalidData = {
        date: '',
        time: '',
        guests: '0',
        firstName: '',
        lastName: '',
        email: '',
      };
      const result = validateBookingForm(invalidData, mockTimes);
      expect(result.isValid).toBe(false);
      expect(Object.keys(result.errors).length).toBeGreaterThan(0);
    });

    it('returns isValid: true when all details are properly filled', () => {
      const validData = {
        date: getTodayDateString(),
        time: '18:00',
        guests: '4',
        occasion: 'birthday',
        seating: 'standard',
        firstName: 'Mario',
        lastName: 'Rossi',
        email: 'mario@example.com',
        phone: '3125550199',
        specialRequests: '',
      };
      const result = validateBookingForm(validData, mockTimes);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors).length).toBe(0);
    });
  });

  // Test 4: Form Interaction & Submission
  describe('Form Interaction & Submission', () => {
    it('calls dispatchDateChange when the date field changes', async () => {
      const user = userEvent.setup();
      render(
        <BookingForm
          availableTimes={mockTimes}
          dispatchDateChange={mockDispatch}
          onSubmitForm={mockSubmit}
        />
      );

      const dateInput = screen.getByLabelText(/Choose date/i);
      await user.clear(dateInput);
      await user.type(dateInput, '2026-11-20');

      expect(mockDispatch).toHaveBeenCalledWith('2026-11-20');
    });

    it('shows validation errors and does not submit when required fields are empty', async () => {
      render(
        <BookingForm
          availableTimes={mockTimes}
          dispatchDateChange={mockDispatch}
          onSubmitForm={mockSubmit}
        />
      );

      const submitBtn = screen.getByRole('button', { name: /On Click/i });
      fireEvent.click(submitBtn);

      // Should display error banner and field alerts
      await waitFor(() => {
        const alerts = screen.getAllByRole('alert');
        expect(alerts.length).toBeGreaterThan(0);
        expect(screen.getByText(/Please correct the following errors/i)).toBeInTheDocument();
      });
      expect(mockSubmit).not.toHaveBeenCalled();
    });

    it('successfully calls onSubmitForm with valid inputs', async () => {
      const user = userEvent.setup();
      render(
        <BookingForm
          availableTimes={mockTimes}
          dispatchDateChange={mockDispatch}
          onSubmitForm={mockSubmit}
        />
      );

      // Fill in all required fields
      await user.type(screen.getByLabelText(/First Name/i), 'Mario');
      await user.type(screen.getByLabelText(/Last Name/i), 'Rossi');
      await user.type(screen.getByLabelText(/Email Address/i), 'mario@littlelemon.com');
      await user.type(screen.getByLabelText(/Phone Number/i), '3125550199');

      const submitBtn = screen.getByRole('button', { name: /On Click/i });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledTimes(1);
      });

      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: 'Mario',
          lastName: 'Rossi',
          email: 'mario@littlelemon.com',
          phone: '3125550199',
          guests: '2',
        })
      );
    });
  });
});

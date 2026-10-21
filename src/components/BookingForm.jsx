import { useState } from 'react';
import FormField from './FormField';
import { OCCASIONS, SEATING_OPTIONS } from '../constants/occasions';
import {
  getTodayDateString,
  formatDisplayTime,
} from '../utils/bookingUtils';
import { validateField, validateBookingForm } from '../utils/validation';

export default function BookingForm({
  availableTimes = [],
  dispatchDateChange,
  onSubmitForm,
  isSubmitting = false,
  submitError = '',
}) {
  const today = getTodayDateString();

  const [formData, setFormData] = useState({
    date: today,
    time: availableTimes[0] || '17:00',
    guests: '2',
    occasion: 'none',
    seating: 'standard',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formAttempted, setFormAttempted] = useState(false);

  // Derive active time slot: fallback to first slot if selected time is not available
  const selectedTime =
    availableTimes.length > 0 && !availableTimes.includes(formData.time)
      ? availableTimes[0]
      : formData.time;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    // If date changed, notify parent/reducer to update available times
    if (name === 'date') {
      if (dispatchDateChange) {
        dispatchDateChange(value);
      }
    }

    // Live validation for already touched field or after submit attempt
    if (touched[name] || formAttempted) {
      const errorMsg = validateField(name, value, updatedForm, availableTimes);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, value, formData, availableTimes);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate submissions

    setFormAttempted(true);

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, curr) => {
      acc[curr] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    const trimmedData = {
      ...formData,
      time: selectedTime,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      specialRequests: formData.specialRequests.trim(),
    };

    const validation = validateBookingForm(trimmedData, availableTimes);

    if (!validation.isValid) {
      setErrors(validation.errors);

      // Focus first invalid element for accessibility
      const firstInvalidKey = Object.keys(validation.errors)[0];
      const elementIdMap = {
        date: 'res-date',
        time: 'res-time',
        guests: 'guests',
        firstName: 'first-name',
        lastName: 'last-name',
        email: 'email',
        phone: 'phone',
      };
      const elementId = elementIdMap[firstInvalidKey];
      if (elementId) {
        const el = document.getElementById(elementId);
        if (el) {
          el.focus();
        }
      }
      return;
    }

    // Clear errors and submit
    setErrors({});
    if (onSubmitForm) {
      onSubmitForm(trimmedData);
    }
  };

  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Table reservation form"
      id="booking-form"
    >
      {/* Global error banner if submission failed or errors exist upon submit attempt */}
      {(submitError || (formAttempted && Object.values(errors).some(Boolean))) && (
        <div
          className="error-summary-banner"
          role="alert"
          aria-live="assertive"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div>
            <strong>Please correct the following errors before submitting:</strong>
            <p style={{ marginTop: '4px', fontSize: '0.9rem' }}>
              {submitError || 'One or more required fields contain invalid details.'}
            </p>
          </div>
        </div>
      )}

      {/* Fieldset 1: Reservation Date, Time, Guests & Occasion */}
      <fieldset className="form-fieldset">
        <legend className="fieldset-legend">1. Reservation Details</legend>

        <div className="form-grid-2">
          {/* Reservation Date */}
          <FormField
            id="res-date"
            label="Choose date"
            required
            error={errors.date}
            hint="Reservations open up to 60 days in advance"
          >
            {(a11yProps) => (
              <input
                type="date"
                name="date"
                min={today}
                value={formData.date}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-input"
                required
                disabled={isSubmitting}
                {...a11yProps}
              />
            )}
          </FormField>

          {/* Reservation Time */}
          <FormField
            id="res-time"
            label="Choose time"
            required
            error={errors.time}
            hint="Available dining slots for selected date"
          >
            {(a11yProps) => (
              <select
                name="time"
                value={selectedTime}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-select"
                required
                disabled={isSubmitting || availableTimes.length === 0}
                {...a11yProps}
              >
                {availableTimes.length === 0 ? (
                  <option value="">No times available for this date</option>
                ) : (
                  availableTimes.map((timeSlot) => (
                    <option key={timeSlot} value={timeSlot}>
                      {formatDisplayTime(timeSlot)}
                    </option>
                  ))
                )}
              </select>
            )}
          </FormField>
        </div>

        <div className="form-grid-2">
          {/* Number of Guests */}
          <FormField
            id="guests"
            label="Number of guests"
            required
            error={errors.guests}
            hint="Between 1 and 10 guests"
          >
            {(a11yProps) => (
              <input
                type="number"
                name="guests"
                min="1"
                max="10"
                placeholder="2"
                value={formData.guests}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-input"
                required
                disabled={isSubmitting}
                {...a11yProps}
              />
            )}
          </FormField>

          {/* Occasion */}
          <FormField
            id="occasion"
            label="Occasion"
            error={errors.occasion}
            hint="Optional celebration note"
          >
            {(a11yProps) => (
              <select
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-select"
                disabled={isSubmitting}
                {...a11yProps}
              >
                {OCCASIONS.map((occ) => (
                  <option key={occ.value} value={occ.value}>
                    {occ.label}
                  </option>
                ))}
              </select>
            )}
          </FormField>
        </div>

        {/* Seating Preference */}
        <div className="form-field" role="radiogroup" aria-labelledby="seating-group-label">
          <span id="seating-group-label" className="form-label">
            Seating Preference
          </span>
          <div className="seating-radio-group">
            {SEATING_OPTIONS.map((opt) => (
              <label key={opt.id} htmlFor={opt.id} className="seating-option-label">
                <input
                  type="radio"
                  id={opt.id}
                  name="seating"
                  value={opt.value}
                  checked={formData.seating === opt.value}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      {/* Fieldset 2: Customer Contact Information */}
      <fieldset className="form-fieldset">
        <legend className="fieldset-legend">2. Guest Information</legend>

        <div className="form-grid-2">
          {/* First Name */}
          <FormField
            id="first-name"
            label="First Name"
            required
            error={errors.firstName}
          >
            {(a11yProps) => (
              <input
                type="text"
                name="firstName"
                placeholder="Mario"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-input"
                required
                autoComplete="given-name"
                disabled={isSubmitting}
                {...a11yProps}
              />
            )}
          </FormField>

          {/* Last Name */}
          <FormField
            id="last-name"
            label="Last Name"
            required
            error={errors.lastName}
          >
            {(a11yProps) => (
              <input
                type="text"
                name="lastName"
                placeholder="Rossi"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-input"
                required
                autoComplete="family-name"
                disabled={isSubmitting}
                {...a11yProps}
              />
            )}
          </FormField>
        </div>

        <div className="form-grid-2">
          {/* Email Address */}
          <FormField
            id="email"
            label="Email Address"
            required
            error={errors.email}
            hint="Confirmation receipt will be sent here"
          >
            {(a11yProps) => (
              <input
                type="email"
                name="email"
                placeholder="mario@example.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-input"
                required
                autoComplete="email"
                disabled={isSubmitting}
                {...a11yProps}
              />
            )}
          </FormField>

          {/* Phone Number */}
          <FormField
            id="phone"
            label="Phone Number"
            error={errors.phone}
            hint="Optional for SMS arrival updates"
          >
            {(a11yProps) => (
              <input
                type="tel"
                name="phone"
                placeholder="(312) 555-0199"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-input"
                autoComplete="tel"
                disabled={isSubmitting}
                {...a11yProps}
              />
            )}
          </FormField>
        </div>

        {/* Special Requests */}
        <FormField
          id="special-requests"
          label="Special Requests / Dietary Notes"
          hint="Gluten-free, high chair, wheelchair accessible table, etc."
        >
          {(a11yProps) => (
            <textarea
              name="specialRequests"
              rows="3"
              placeholder="Let us know if anyone has dietary restrictions or celebrating a milestone..."
              value={formData.specialRequests}
              onChange={handleChange}
              className="form-textarea"
              disabled={isSubmitting}
              {...a11yProps}
            />
          )}
        </FormField>
      </fieldset>

      {/* Form Submission Actions */}
      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary form-submit-btn"
          disabled={isSubmitting}
          aria-label="On Click"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                style={{ animation: 'spin 1s linear infinite' }}
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
              <span>Confirming Reservation...</span>
            </span>
          ) : (
            'Make Your Reservation'
          )}
        </button>

        <p className="form-disclaimer">
          By reserving a table, you agree to Little Lemon&apos;s dining policies.
          Table reservations are held for 15 minutes past scheduled time.
        </p>
      </div>
    </form>
  );
}

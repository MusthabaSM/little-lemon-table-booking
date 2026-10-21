import { useReducer, useState } from 'react';
import BookingForm from './BookingForm';
import ConfirmedBooking from './ConfirmedBooking';
import {
  initializeTimes,
  updateTimes,
  submitAPI,
} from '../utils/bookingUtils';

export default function BookingSection() {
  const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const handleDateChange = (newDate) => {
    dispatch({ type: 'UPDATE_TIMES', payload: newDate });
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await submitAPI(formData);
      if (response && response.success) {
        setConfirmedBooking(response.booking);
      } else {
        setSubmitError('Unable to process your reservation. Please try again.');
      }
    } catch (err) {
      setSubmitError(
        err.message || 'A network error occurred while submitting. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setSubmitError('');
  };

  return (
    <section
      className="reservations-section"
      id="reservations"
      aria-labelledby="reservations-heading"
    >
      <div className="container reservation-container">
        <div className="reservation-header">
          <h2 id="reservations-heading" className="section-title">
            Reserve a Table
          </h2>
          <p className="reservation-intro">
            Experience authentic Mediterranean cuisine crafted with passion. Select
            your preferred dining date, party size, and table setting below.
          </p>
        </div>

        <div className="booking-card">
          {confirmedBooking ? (
            <ConfirmedBooking
              booking={confirmedBooking}
              onReset={handleReset}
            />
          ) : (
            <BookingForm
              availableTimes={availableTimes}
              dispatchDateChange={handleDateChange}
              onSubmitForm={handleFormSubmit}
              isSubmitting={isSubmitting}
              submitError={submitError}
            />
          )}
        </div>
      </div>
    </section>
  );
}

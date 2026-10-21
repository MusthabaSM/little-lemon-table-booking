import {
  formatDisplayDate,
  formatDisplayTime,
} from '../utils/bookingUtils';
import { OCCASIONS, SEATING_OPTIONS } from '../constants/occasions';

export default function ConfirmedBooking({ booking, onReset }) {
  if (!booking) return null;

  const occasionLabel =
    OCCASIONS.find((o) => o.value === booking.occasion)?.label || 'None';
  const seatingLabel =
    SEATING_OPTIONS.find((s) => s.value === booking.seating)?.label ||
    'Standard Indoor';

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <article
      className="confirmation-card"
      aria-live="polite"
      aria-labelledby="confirmation-heading"
    >
      <div className="confirmation-badge-icon" aria-hidden="true">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>

      <h3 id="confirmation-heading" className="confirmation-title">
        Reservation Confirmed!
      </h3>
      <p className="confirmation-subtitle">
        We look forward to welcoming you to Little Lemon, {booking.firstName}!
        A confirmation receipt has been sent to <strong>{booking.email}</strong>.
      </p>

      <div className="confirmation-details-box">
        <div className="detail-row">
          <span className="detail-label">Confirmation Code</span>
          <span className="detail-value highlight">{booking.id || 'LL-2026-CONF'}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Dining Date</span>
          <span className="detail-value">{formatDisplayDate(booking.date)}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Reservation Time</span>
          <span className="detail-value">{formatDisplayTime(booking.time)}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Number of Guests</span>
          <span className="detail-value">{booking.guests} {Number(booking.guests) === 1 ? 'Guest' : 'Guests'}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Seating Preference</span>
          <span className="detail-value">{seatingLabel}</span>
        </div>

        {booking.occasion && booking.occasion !== 'none' && (
          <div className="detail-row">
            <span className="detail-label">Occasion</span>
            <span className="detail-value">{occasionLabel}</span>
          </div>
        )}

        <div className="detail-row">
          <span className="detail-label">Primary Guest</span>
          <span className="detail-value">
            {booking.firstName} {booking.lastName}
          </span>
        </div>

        {booking.phone && (
          <div className="detail-row">
            <span className="detail-label">Phone Contact</span>
            <span className="detail-value">{booking.phone}</span>
          </div>
        )}

        {booking.specialRequests && (
          <div className="detail-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
            <span className="detail-label">Special Requests</span>
            <span className="detail-value" style={{ textAlign: 'left', fontWeight: '500' }}>
              {booking.specialRequests}
            </span>
          </div>
        )}
      </div>

      <div className="confirmation-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={onReset}
          aria-label="Make another table reservation"
        >
          Book Another Table
        </button>

        <button
          type="button"
          className="btn btn-outline"
          onClick={handlePrint}
          aria-label="Print reservation confirmation details"
        >
          Print Confirmation
        </button>
      </div>
    </article>
  );
}

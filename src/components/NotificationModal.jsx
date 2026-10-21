import { useEffect, useRef } from 'react';

export default function NotificationModal({ isOpen, title, message, onClose, actionLabel, onAction }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          &times;
        </button>

        <h3 id="modal-title" className="section-title" style={{ fontSize: '2rem', marginBottom: '8px' }}>
          {title}
        </h3>

        <p style={{ color: '#666666', marginBottom: '24px', fontSize: '1rem', lineHeight: '1.6' }}>
          {message}
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          {actionLabel && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (onAction) onAction();
                onClose();
              }}
            >
              {actionLabel}
            </button>
          )}
          <button
            type="button"
            className="btn btn-outline"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

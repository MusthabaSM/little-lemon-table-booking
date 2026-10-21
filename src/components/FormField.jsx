export default function FormField({
  id,
  label,
  required = false,
  error = '',
  hint = '',
  children,
}) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        <span>
          {label}
          {required && <span className="required-star" aria-hidden="true">*</span>}
        </span>
        {required && <span className="sr-only">(required)</span>}
      </label>

      {children({
        id,
        'aria-required': required ? 'true' : undefined,
        'aria-invalid': error ? 'true' : 'false',
        'aria-describedby': error ? errorId : hint ? hintId : undefined,
      })}

      {hint && !error && (
        <span id={hintId} className="field-hint">
          {hint}
        </span>
      )}

      {error && (
        <span id={errorId} className="field-error" role="alert">
          <svg
            width="14"
            height="14"
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
          {error}
        </span>
      )}
    </div>
  );
}

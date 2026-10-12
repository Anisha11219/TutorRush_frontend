import { LoaderCircle } from 'lucide-react';

function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  className = '',
  icon = null
}) {
  const buttonClasses = [
    'custom-button',
    `custom-button-${variant}`,
    `custom-button-${size}`,
    fullWidth ? 'custom-button-full' : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <LoaderCircle className="button-spinner" size={18} />
      ) : (
        icon
      )}

      <span>{loading ? 'Please wait...' : children}</span>
    </button>
  );
}

export default Button;
import { LoaderCircle } from 'lucide-react';

function Loader({
  message = 'Loading...',
  fullScreen = false,
  size = 36
}) {
  return (
    <div
      className={`loader-container ${fullScreen ? 'loader-fullscreen' : ''}`}
      role="status"
      aria-live="polite"
    >
      <LoaderCircle
        className="loader-spinner"
        size={size}
        aria-hidden="true"
      />

      <p className="loader-message">{message}</p>
      <span className="sr-only">Please wait</span>
    </div>
  );
}

export default Loader;
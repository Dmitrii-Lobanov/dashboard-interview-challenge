import './ErrorState.css';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({ message = 'Something went wrong.', onRetry }: ErrorStateProps) => {
  return (
    <div className="error-container">
      <div className="error-icon-wrapper">
        <svg 
          className="error-icon" 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <h2 className="error-title">Oops!</h2>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button className="error-retry-button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

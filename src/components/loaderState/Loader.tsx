import './Loader.css';

export const Loader = ({ message = 'Loading...' }: { message?: string }) => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p className="loader-text">{message}</p>
    </div>
  );
};

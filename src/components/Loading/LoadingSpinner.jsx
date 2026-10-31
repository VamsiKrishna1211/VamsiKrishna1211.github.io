import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-container" role="status" aria-label="Loading">
      <span className="loading-mark" />
    </div>
  );
};

export default LoadingSpinner;

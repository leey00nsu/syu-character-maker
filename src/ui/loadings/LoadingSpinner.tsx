const LoadingSpinner = () => {
  return (
    <div className="absolute left-0 top-0 flex h-[100svh] w-[100svw] items-center justify-center">
      <span className="loading loading-bars loading-lg" />
    </div>
  );
};

export default LoadingSpinner;

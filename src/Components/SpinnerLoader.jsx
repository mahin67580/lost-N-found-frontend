import { useEffect, useState } from "react";

const SpinnerLoader = ({ children }) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 600); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <span className="loading loading-bars loading-xl text-blue-600"></span>
      </div>
    );
  }

  return <>{children}</>; // Render the actual content after 1 second
};

export default SpinnerLoader;

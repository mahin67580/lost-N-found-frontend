// components/LottieLoader.jsx
import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/search.json'

const LottieLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen   min-w-screen ">
      <Lottie animationData={animationData}      style={{ width: '300px', height: '300px' }}    loop={true} />
    </div>
  );
};

export default LottieLoader;

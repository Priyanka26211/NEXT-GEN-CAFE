import React, { useEffect } from 'react';

const IntroAnimation = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="text-center space-y-8 animate-pulse">
        {/* Logo Animation */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
            <div className="text-4xl font-bold text-white"><img src="coffee-cup.png" alt="" /></div>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-300 rounded-full animate-ping"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-orange-400 rounded-full animate-ping delay-300"></div>
        </div>
        
        {/* Brand Name */}
        <div className="space-y-2">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent animate-fade-in">
            NextGen Café
          </h1>
          <p className="text-xl text-orange-700 font-medium animate-fade-in delay-500">
            Premium Dining Experience
          </p>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center space-x-2 mt-8">
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;
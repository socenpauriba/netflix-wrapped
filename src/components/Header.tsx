import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="w-full py-8 bg-gradient-to-r from-[#E50914] to-[#831010]">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="relative">
            <div className="flex items-center gap-2 sm:gap-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
                alt="Netflix Logo" 
                className="h-8 sm:h-12 w-auto brightness-0 invert"
              />
              <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-wide">
                Wrapped
              </h1>
            </div>
            <p className="font-caveat text-white/80 text-xl sm:text-2xl rotate-[-8deg] transform
                         absolute -bottom-4 sm:-bottom-6 -right-2 sm:-right-4">
              No oficial
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
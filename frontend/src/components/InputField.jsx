import React from 'react';

const Input = ({style ,icon: Icon, ...props }) => {
  return (
    <div className="relative mb-6 flex justify-center items-center">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        {Icon && <Icon className="size-5 text-green-500" />}
      </div>
      <input {...props} className={`input focus:outline-none focus:shadow-2xl focus:border-[2px] sm:text-sm bg-white input-bordered input-secondary w-full max-w-xs pl-10 ${style} `} />
    </div>
  );
};
export default Input;
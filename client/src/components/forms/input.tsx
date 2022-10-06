import React from 'react';

const Input = () => {
  return (
    <div className="mb-4 relative">
      <input id="email" className="w-full rounded px-3 border border-gray-500 pt-5 pb-2 focus:outline-none input active:outline-none" type="text" />
      <label htmlFor="email" className="label absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-500 text-base mt-2 cursor-text">
        Email or Phone
      </label>
    </div>
  );
};

export default Input;

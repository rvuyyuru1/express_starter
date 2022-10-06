import React, { memo } from 'react';
import cn from 'classnames';
type modeType = 'fill' | 'outline' | 'text';
type buttonType = 'button' | 'submit' | 'reset' | undefined;
// mode fill outline text
const Button = ({ children, mode = 'fill', className, onClick, buttonType = 'button' }: { mode?: modeType; children: any; className?: string; onClick?: any; buttonType?: buttonType }) => {
  return (
    <>
      {mode === 'outline' && (
        <button onClick={onClick} type={buttonType} className={cn('text-primary outline border-gray-300 font-extrabold  text-md px-4 py-2 text-center  focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800', className)}>
          {children}
        </button>
      )}
      {mode === 'text' && (
        <button type={buttonType} onClick={onClick} className={cn('text-coolGray-500  font-bold  text-md px-4 py-2 text-center hover:bg-gray-100 ', className)}>
          {children}
        </button>
      )}
      {mode === 'fill' && (
        <button type={buttonType} onClick={onClick} className={cn('text-white  bg-primary bg-gradient-to-r from-primary-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-extrabold  text-md px-4 py-2 text-center ', className)}>
          {children}
        </button>
      )}
    </>
  );
};

export default memo(Button);

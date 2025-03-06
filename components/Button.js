import React from "react";

const Button = ({ name, icon, onButtonClick, isButtonDisabled }) => {
  return (
    <button
      disabled={isButtonDisabled}
      onClick={onButtonClick}
      className={`
        transition-all duration-200 ease-in-out
        font-semibold text-sm rounded-md
        flex items-center justify-center gap-2
        focus:outline-none cursor-pointer
        disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
        shadow-sm hover:shadow-lg
        bg-gradient-to-tr from-slate-800 to-slate-700 text-white
        hover:bg-slate-700 active:bg-slate-700 active:shadow-none
        focus:bg-slate-700 focus:shadow-none
        px-4 py-2
      `}
    >
      {icon}
      {name}
    </button>
  );
};

export default Button;

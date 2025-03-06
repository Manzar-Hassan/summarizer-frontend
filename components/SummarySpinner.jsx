import React from "react";

const SummarySpinner = () => {
  return (
    <div className="flex justify-center items-center w-12 h-12">
      <div className="w-8 h-8 border-2 border-gray-700 animate-rotate-cube"></div>

      <style>
        {`
          @keyframes rotate-cube {
            0% { transform: rotate(0deg); }
            50% { transform: rotate(90deg) scale(1.3); }
            100% { transform: rotate(180deg); }
          }

          .animate-rotate-cube {
            animation: rotate-cube 1.5s infinite linear;
          }
        `}
      </style>
    </div>
  );
};

export default SummarySpinner;

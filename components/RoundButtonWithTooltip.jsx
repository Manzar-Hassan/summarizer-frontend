import React from "react";
import { Tooltip } from "react-tooltip";

const RoundButtonWithTooltip = ({ icon, onClick, tooltipFor, tooltipMsg='default msg!!' }) => {
  return (
    <>
      <Tooltip id={tooltipFor} />
      <button
        data-tooltip-id={tooltipFor}
        data-tooltip-content={tooltipMsg}
        onClick={onClick}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold mb-4 cursor-pointer w-6 h-6 rounded-full flex items-center justify-center"
      >
        {icon}
      </button>
    </>
  );
};

export default RoundButtonWithTooltip;

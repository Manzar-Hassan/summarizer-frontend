import React from "react";
import { Tooltip } from "react-tooltip";

const RoundButtonWithTooltip = ({
  icon,
  onClick,
  tooltipFor,
  tooltipMsg = "default msg!!",
  hoverColor,
}) => {
  return (
    <>
      <Tooltip id={tooltipFor} className="custom-tooltip-style" />
      <button
        data-tooltip-id={tooltipFor}
        data-tooltip-content={tooltipMsg}
        onClick={onClick}
        className={`${
          hoverColor || " hover:bg-gray-300"
        } bg-gray-200 font-bold mb-4 cursor-pointer w-6 h-6 rounded-full flex items-center justify-center`}
      >
        {icon}
      </button>
    </>
  );
};

export default RoundButtonWithTooltip;

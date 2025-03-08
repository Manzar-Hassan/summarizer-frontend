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
          hoverColor || "hover:bg-slate-300 dark:hover:bg-slate-600"
        } bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold mb-4 cursor-pointer w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200`}
      >
        {icon}
      </button>
    </>
  );
};

export default RoundButtonWithTooltip;

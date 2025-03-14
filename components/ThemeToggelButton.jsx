import React from "react";
import { motion as m } from "motion/react";
import { useTheme } from "../context/ThemeContext.jsx";

const sunPath =
  "M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C60 29 69.5 38 70 49.5Z";
const moonPath =
  "M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C39 45 49.5 59.5 70 49.5Z";

const raysVariants = {
  hidden: {
    strokeOpacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  visible: {
    strokeOpacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const rayVariant = {
  hidden: {
    pathLength: 0,
    opacity: 0,
    scale: 0,
    transition: { duration: 0.25, ease: "easeInOut" },
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      pathLength: { duration: 0.3 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.3 },
    },
  },
};

const shineVariant = {
  hidden: {
    opacity: 0,
    scale: 2,
    strokeDasharray: "20, 1000",
    strokeDashoffset: 0,
    filter: "blur(0px)",
  },
  visible: {
    opacity: [0, 1, 0],
    strokeDashoffset: [0, -50, -100],
    filter: ["blur(2px)", "blur(2px)", "blur(0px)"],
    transition: {
      duration: 0.75,
      ease: "linear",
    },
  },
};

const ThemeToggelButton = ({ height = 24, width = 24 }) => {
  const { mode, setMode } = useTheme();

  const handleClick = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <button onClick={handleClick}>
      <m.svg
        strokeWidth="4"
        strokeLinecap="round"
        width={height}
        height={width}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative cursor-pointer"
      >
        <m.path
          d={moonPath}
          variants={shineVariant}
          className="absolute top-0 left-0 stroke-blue-400"
          initial="hidden"
          animate={mode === "dark" ? "visible" : "hidden"}
        />

        <m.g
          variants={raysVariants}
          initial="hidden"
          animate={mode === "light" ? "visible" : "hidden"}
          className="stroke-red-700"
          style={{ strokeLinecap: "round" }}
        >
          <m.path
            className="origin-center"
            variants={rayVariant}
            d="M50 2V11"
          />
          <m.path variants={rayVariant} d="M85 15L78 22" />
          <m.path variants={rayVariant} d="M98 50H89" />
          <m.path variants={rayVariant} d="M85 85L78 78" />
          <m.path variants={rayVariant} d="M50 98V89" />
          <m.path variants={rayVariant} d="M23 78L16 84" />
          <m.path variants={rayVariant} d="M11 50H2" />
          <m.path variants={rayVariant} d="M23 23L16 16" />
        </m.g>

        <m.path
          initial={false}
          animate={{
            d: mode === "dark" ? moonPath : sunPath,
            rotate: mode === "dark" ? -360 : 0,
            scale: mode === "dark" ? 2 : 1,
            stroke: mode === "dark" ? "#60a5fa" : "#b91c1c",
            fill: mode === "dark" ? "#60a5fa" : "#b91c1c",
            fillOpacity: 0.35,
            strokeOpacity: 1,
          }}
          transition={{ duration: 1, type: "spring" }}
        />
      </m.svg>
    </button>
  );
};

export default ThemeToggelButton;

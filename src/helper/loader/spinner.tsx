"use client";

import { useTheme } from "next-themes";
import { RotatingLines } from "react-loader-spinner";

export function Spinner() {
  const { theme } = useTheme();
  const strokeColor = theme === "dark" ? "black" : "white";
  return (
    <>
      <RotatingLines
        visible={true}
        height="30"
        width="30"
        strokeColor={strokeColor}
        strokeWidth="2"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </>
  );
}

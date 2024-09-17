"use client";

import { useTheme } from "next-themes";
import "./loader.css";
import { useEffect, useMemo, useState } from "react";

interface Props {
  size?: "sm" | "lg";
}

export function Spinner({ size = "sm" }: Props) {
  const { theme } = useTheme();
  function color(): "white" | "black" {
    if (theme === "dark") {
      if (size == "lg") {
        return "white";
      } else {
        return "black";
      }
    } else {
      if (size == "lg") {
        return "black";
      } else {
        return "white";
      }
    }
  }

  //in dark mode buttons background is white, if loader used in button size will not provided as loader size will small
  const [strokeColor, setStrokeColor] = useState<"white" | "black">(color());

  useEffect(() => {
    setStrokeColor(color());
  }, [theme]);

  return (
    <>
      <div
        className={`animate-spin rounded-full border-4  ${
          size == "lg" ? "h-12 w-12" : "h-6 w-6"
        }`}
        style={{ borderColor: strokeColor, borderTopColor: "transparent" }}
      ></div>
    </>
  );
}

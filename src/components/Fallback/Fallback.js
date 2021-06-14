import React from "react";
import "./Fallback.scss";
import { DualRing } from "react-css-spinners";

export default function Fallback() {
  return <DualRing color="#9d3551" size={100} className="fallback" />;
}

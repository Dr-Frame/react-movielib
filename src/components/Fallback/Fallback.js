import React from "react";
/* import "./Fallback.scss";
import { DualRing } from "react-css-spinners";

export default function Fallback() {
  return <DualRing color="#9d3551" size={100} className="fallback" />;
} */

import { css } from "@emotion/react";
import MoonLoader from "react-spinners/MoonLoader";

const override = css`
  display: block;
  margin: auto;
  margin-top: 100px;
`;

export default function Spinner() {
  return <MoonLoader color="#cd204e" size="60px" css={override}></MoonLoader>;
}

import React from "react";
import numeral from "numeral";

const ChannelStatCount = ({ name, count, style }) => {
  // Format data
  const formattedCount =
    parseInt(count) === 0 ? "No" : numeral(count).format("0,0");
  const text =
    parseInt(count) === 1 ? `1 ${name}` : `${formattedCount} ${name}s`;

  return <p style={style}>{text}</p>;
};

export default ChannelStatCount;

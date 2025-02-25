import React, { HTMLAttributes } from "react";
import { useEffect, useState } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  big?: boolean;
}

const Loading: React.FC<IProps> = ({ big, ...rest }) => {
  const [length, setLength] = useState(3);
  useEffect(() => {
    const interval = setInterval(() => {
      setLength(length === 3 ? 1 : length + 1);
    }, 200);
    return () => clearInterval(interval);
  });
  return (
    <span {...rest}>
      {big
        ? Array.from({ length }, () => "●").join("")
        : Array.from({ length }, () => ".").join("")}
    </span>
  );
};
export default Loading;

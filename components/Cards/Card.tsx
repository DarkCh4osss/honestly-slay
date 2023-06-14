import React, { ReactNode } from "react";

interface Props {
  children: ReactNode | ReactNode[];
}

const Card: React.FC<Props> = ({ children }) => {
  return <div className="bg-white shadow-md rounded-md">{children}</div>;
};

export default Card;

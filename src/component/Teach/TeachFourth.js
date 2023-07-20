import React from "react";
import { FaHandPaper } from "react-icons/fa";
import classes from "./teachfourth.module.scss";
const TeachFourth = ({ handPosition }) => {
  const top = handPosition.topPosition;
  const left = handPosition.leftPosition;

  return (
    <div
      className={classes["teach-fourth"]}
      style={{ top: `${top}px`, left: `${left}px` }}
    >
      <FaHandPaper color="white" fontSize={80} />
    </div>
  );
};

export default TeachFourth;

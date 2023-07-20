import React from "react";
import { FiArrowDown } from "react-icons/fi";
import classes from "./teachfirst.module.scss";
const TeachFirst = ({ toggleLeft, firstImgPosition }) => {
  const firstImgLeft = firstImgPosition?.left;
  const firstImgTop = firstImgPosition?.top;
  const offsetWidth = firstImgPosition?.offsetWidth;
  const offsetHeight = firstImgPosition?.offsetHeight;
  return (
    <div
      className={
        toggleLeft ? classes["teach-first-display"] : classes["teach-first"]
      }
      style={
        toggleLeft
          ? {
              left: `${firstImgLeft}px`,
              top: `${firstImgTop}px`,
              width: `${offsetWidth}px`,
              height: `${offsetHeight}px`,
            }
          : {
              left: `${firstImgLeft}px`,
              top: `${firstImgTop}px`,
              width: `${offsetWidth}px`,
              height: `${offsetHeight}px`,
            }
      }
    >
      <div className={classes["teach-drag"]}>
        <p>抓取</p>
      </div>
      <div>
        <FiArrowDown color="white" fontSize={80} />
      </div>
    </div>
  );
};

export default TeachFirst;

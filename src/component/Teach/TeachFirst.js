import React from "react";
import { FiArrowDown } from "react-icons/fi";
import classes from "./teachfirst.module.scss";
const TeachFirst = ({ toggleDisplay, imgPosition }) => {
  const firstImgLeft = imgPosition?.left;
  const firstImgTop = imgPosition?.top;
  const offsetWidth = imgPosition?.offsetWidth;
  const offsetHeight = imgPosition?.offsetHeight;
  return (
    <div
      className={
        toggleDisplay ? classes["teach-first-display"] : classes["teach-first"]
      }
      style={
        toggleDisplay
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

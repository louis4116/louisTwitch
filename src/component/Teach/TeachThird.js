import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaHandPaper, FaHandRock } from "react-icons/fa";
import classes from "./teachthird.module.scss";
const TeachThird = ({ toggleDisplay, count, setHandPosition, imgPosition }) => {
  const [good, setGood] = useState(false);
  const ref = useRef();
  const firstImgLeft = imgPosition?.left;
  const firstImgTop = imgPosition?.top;
  const offsetWidth = imgPosition?.offsetWidth;
  const offsetHeight = imgPosition?.offsetHeight;
  useEffect(() => {
    const refPosition = ref.current;
    const topPosition = refPosition.getBoundingClientRect().top;
    const rightPosition = refPosition.getBoundingClientRect().right;
    const bottomPosition = refPosition.getBoundingClientRect().bottom;
    const leftPosition = refPosition.getBoundingClientRect().left;
    setHandPosition({
      topPosition,
      rightPosition,
      bottomPosition,
      leftPosition,
    });
  }, [good]);
  return (
    <div className={classes["teach-third"]}>
      <div
        className={
          toggleDisplay
            ? classes["teach-third-rock-display"]
            : classes["teach-third-rock"]
        }
        style={
          toggleDisplay
            ? { left: `${firstImgLeft}px` }
            : { left: `${firstImgLeft}px` }
        }
      >
        <div
          className={classes["teach-third-rock-in"]}
          ref={ref}
          onAnimationEnd={() => setGood(true)}
        >
          <FaHandRock color="white" fontSize={80} />
        </div>
        <div
          className={classes["teach-third-live"]}
          style={
            toggleDisplay
              ? {
                  left: `${firstImgLeft}px`,
                  width: `${offsetWidth}px`,
                  height: `${offsetHeight}px`,
                }
              : {
                  left: `${firstImgLeft}px`,
                  width: `${offsetWidth}px`,
                  height: `${offsetHeight}px`,
                }
          }
        ></div>
      </div>
    </div>
  );
};

export default TeachThird;

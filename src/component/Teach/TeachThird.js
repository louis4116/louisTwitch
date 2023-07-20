import React, { useState, useRef, useEffect } from "react";
import { FaHandPaper, FaHandRock } from "react-icons/fa";
import classes from "./teachthird.module.scss";
const TeachThird = ({ toggleLeft, setHandPosition, firstImgPosition }) => {
  const [animation, setAnimation] = useState(false);
  const ref = useRef();
  const firstImgLeft = firstImgPosition?.left;
  const offsetWidth = firstImgPosition?.offsetWidth;
  const offsetHeight = firstImgPosition?.offsetHeight;
  useEffect(() => {
    const refPosition = ref.current;
    const topPosition = refPosition.getBoundingClientRect().top;
    const leftPosition = refPosition.getBoundingClientRect().left;
    setHandPosition({
      topPosition,
      leftPosition,
    });
  }, [animation]);
  return (
    <div className={classes["teach-third"]}>
      <div
        className={
          toggleLeft
            ? classes["teach-third-rock-display"]
            : classes["teach-third-rock"]
        }
        style={
          toggleLeft
            ? { left: `${firstImgLeft}px` }
            : { left: `${firstImgLeft}px` }
        }
      >
        <div
          className={classes["teach-third-rock-in"]}
          ref={ref}
          onAnimationEnd={() => setAnimation(true)}
        >
          <FaHandRock color="white" fontSize={80} />
        </div>
        <div
          className={classes["teach-third-live"]}
          style={
            toggleLeft
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

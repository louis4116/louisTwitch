import React, { useState } from "react";
import { FaHandPaper, FaHandRock } from "react-icons/fa";
import classes from "./teachsecond.module.scss";
const TeachSecond = ({ toggleLeft, firstImgPosition }) => {
  const [animation, setAnimation] = useState(true);
  const firstImgLeft = firstImgPosition?.left;
  const offsetWidth = firstImgPosition?.offsetWidth;
  const offsetHeight = firstImgPosition?.offsetHeight;
  return (
    <div className={classes["teach-second"]}>
      {animation && (
        <div
          className={
            toggleLeft
              ? classes["teach-second-handpapper-display"]
              : classes["teach-second-handpapper"]
          }
          onAnimationStart={() => setAnimation(true)}
          onAnimationEnd={() => setAnimation(false)}
          style={
            toggleLeft
              ? { left: `${firstImgLeft}px`, width: `${offsetWidth}px` }
              : { left: `${firstImgLeft}px`, width: `${offsetWidth}px` }
          }
        >
          <div className={classes["hand"]}>
            <div className={classes["hand-in"]}>
              <FaHandPaper color="white" fontSize={80} />
            </div>
          </div>
        </div>
      )}
      {!animation && (
        <div>
          <div
            className={
              toggleLeft
                ? classes["teach-second-rock-display"]
                : classes["teach-second-rock"]
            }
            onAnimationStart={() => setAnimation(false)}
            onAnimationEnd={() => setAnimation(false)}
            style={
              toggleLeft
                ? { left: `${firstImgLeft}px` }
                : { left: `${firstImgLeft}px` }
            }
          >
            <div className={classes["hand"]}>
              <div className={classes["hand-in"]}>
                <FaHandRock color="white" fontSize={80} />
              </div>

              <div
                className={classes["teach-second-live"]}
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
        </div>
      )}
    </div>
  );
};

export default TeachSecond;

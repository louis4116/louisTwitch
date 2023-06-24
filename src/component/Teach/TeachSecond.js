import React, { useState } from "react";
import { FaHandPaper, FaHandRock } from "react-icons/fa";
import classes from "./teachsecond.module.scss";
const TeachSecond = ({ toggleDisplay, imgPosition }) => {
  const [animation, setAnimation] = useState(true);
  const firstImgLeft = imgPosition?.left;
  const offsetWidth = imgPosition?.offsetWidth;
  const offsetHeight = imgPosition?.offsetHeight;
  return (
    <div className={classes["teach-second"]}>
      {animation && (
        <div
          className={
            toggleDisplay
              ? classes["teach-second-handpapper-display"]
              : classes["teach-second-handpapper"]
          }
          onAnimationStart={() => setAnimation(true)}
          onAnimationEnd={() => setAnimation(false)}
          style={
            toggleDisplay
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
              toggleDisplay
                ? classes["teach-second-rock-display"]
                : classes["teach-second-rock"]
            }
            onAnimationStart={() => setAnimation(false)}
            onAnimationEnd={() => setAnimation(false)}
            style={
              toggleDisplay
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
        </div>
      )}
    </div>
  );
};

export default TeachSecond;

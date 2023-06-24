import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegClock } from "react-icons/fa";
import { positionActions } from "../../../store/position";
import defaultImg from "../../../img/twitchDefault.jpg";
import classes from "./bottomdetailimg.module.scss";
const BottomDetailImg = ({
  type,
  viewer,
  time,
  login,
  duration,
  setDuration,
}) => {
  const [image, setImage] = useState(defaultImg);
  const positionRef = useRef();
  const dispatch = useDispatch();
  const toggleTeach = useSelector((item) => item.toggleResult?.teach);
  useEffect(() => {
    if (login) {
      setImage(
        `https://static-cdn.jtvnw.net/previews-ttv/live_user_${login}.jpg`
      );
    }
  }, [login]);

  //計算已實況時間
  useEffect(() => {
    let nowTime = new Date().getTime();
    let oldTime = new Date(time).getTime();
    let tempMs = nowTime - oldTime;
    let tempMin = Math.floor(tempMs / 1000 / 60);
    let hours = Math.floor(tempMin / 60);
    let mins = tempMin % 60;
    if (mins === 0) {
      setDuration(hours + ":" + "00");
    } else if (0 < mins && mins < 10) {
      setDuration(hours + ":" + "0" + mins);
    } else {
      setDuration(hours + ":" + mins);
    }
  }, [duration, time]);

  //計算圖片在畫面上的位置
  useEffect(() => {
    const top = positionRef.current.getBoundingClientRect().top;
    const right = positionRef.current.getBoundingClientRect().right;
    const bottom = positionRef.current.getBoundingClientRect().bottom;
    const left = positionRef.current.getBoundingClientRect().left;
    const offsetWidth = positionRef.current?.offsetWidth;
    const offsetHeight = positionRef.current?.offsetHeight;
    dispatch(
      positionActions.storedPosition({
        top,
        right,
        bottom,
        left,
        offsetWidth,
        offsetHeight,
      })
    );
    console.log("store啟動");
  }, [toggleTeach]);
  return (
    <div
      className={classes["twitch-right-bottom-content-img-first"]}
      onClick={() => {
        window.location.href = `https://www.twitch.tv/${login}`;
      }}
    >
      <div className={classes["twitch-right-bottom-content-img-second"]}></div>
      <div className={classes["twitch-right-bottom-content-img-third"]}></div>
      <div className={classes["twitch-right-bottom-content-img-fourth"]}></div>
      <div className={classes["twitch-right-bottom-content-img-fifth"]}></div>
      <div className={classes["twitch-right-bottom-content-img-container"]}>
        <div className={classes["twitch-right-bottom-content-img-small"]}>
          <div
            className={classes["twitch-right-bottom-content-img-padding"]}
          ></div>
          <img src={image} ref={positionRef} />
        </div>

        <div
          className={classes["twitch-right-bottom-content-img-type"]}
          style={{ position: "absolute", top: "0" }}
        >
          <p>{type?.toUpperCase()}</p>
        </div>
        <div
          className={classes["twitch-right-bottom-content-img-time"]}
          style={{ position: "absolute", top: "0", right: "0" }}
        >
          <div
            className={classes["twitch-right-bottom-content-img-time-detail"]}
          >
            <div
              className={
                classes["twitch-right-bottom-content-img-time-detail-clock"]
              }
            >
              <FaRegClock size={12} color="red" />
            </div>
            <p>{duration}</p>
          </div>
        </div>
        <div
          className={classes["twitch-right-bottom-content-img-name"]}
          style={{ position: "absolute", bottom: "0", left: "0" }}
        >
          <p>觀眾人數：{viewer}</p>
        </div>
      </div>
    </div>
  );
};

export default BottomDetailImg;

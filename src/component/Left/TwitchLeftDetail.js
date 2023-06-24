import React, { useRef, useEffect, useState } from "react";
import classes from "./twitchleftdetail.module.scss";
const TwitchLeftDetail = ({
  profileImg,
  name,
  game,
  title,
  login,
  viewer,
  scrollY,
  display,
}) => {
  const [top, setTop] = useState(0);
  const [toggle, setToggle] = useState(false);
  const hoverRef = useRef();

  useEffect(() => {
    //計算垂直高度，如果component超出螢幕範圍，那小視窗就會被設置一個固定值
    const temp = hoverRef.current.offsetTop;
    let result = temp - scrollY;
    if (result >= 860) {
      setTop(860);
    } else {
      setTop(result);
    }
  }, [scrollY]);
  return (
    <div
      className={classes["twitch-left-detail"]}
      ref={hoverRef}
      onClick={() => {
        window.open(`https://www.twitch.tv/${login}`);
      }}
      onMouseEnter={() => setToggle(true)}
      onMouseLeave={() => setToggle(false)}
    >
      <img
        className={classes["twitch-left-detail-img"]}
        src={profileImg}
        alt={name}
      />
      {/* 展開後的內容 */}
      {display && (
        <div className={classes["twitch-left-detail-display"]}>
          <div className={classes["twitch-left-detail-display-center"]}>
            <p className={classes["twitch-left-detail-display-name"]}>{name}</p>
            <p className={classes["twitch-left-detail-display-game"]}>{game}</p>
          </div>
          <div className={classes["twitch-left-detail-display-right"]}>
            <div
              className={classes["twitch-left-detail-display-right-container"]}
            >
              <span
                className={classes["twitch-left-detail-display-red-spot"]}
              ></span>

              <p className={classes["twitch-left-detail-display-viewer"]}>
                {viewer}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* 未展開的小視窗 */}
      {toggle && !display && (
        <div
          className={classes["twitch-left-detail-hover"]}
          style={{ top: `${top}px` }}
        >
          <div className={classes["twitch-left-detail-hover-name"]}>
            <span className={classes["twitch-left-detail-hover-name-content"]}>
              {name}
              {`\u000A`}
              {`\u2022`}
              {`\u000A`}
              {game}
            </span>
          </div>
          <div className={classes["twitch-left-detail-hover-title"]}>
            {title}
          </div>
          <div className={classes["twitch-left-detail-hover-live"]}>
            <span
              className={classes["twitch-left-detail-hover-live-point"]}
            ></span>
            <span className={classes["twitch-left-detail-hover-live-des"]}>
              Live{`\u000A`}|{`\u000A`}觀眾人數{`\u000A`}:{`\u000A`}
              {viewer}
            </span>
          </div>
        </div>
      )}
      {/* 展凱後的小視窗 */}
      {toggle && display && (
        <div
          className={classes["twitch-left-detail-display-hover"]}
          style={{ top: `${top}px` }}
        >
          {title}
        </div>
      )}
    </div>
  );
};

export default TwitchLeftDetail;

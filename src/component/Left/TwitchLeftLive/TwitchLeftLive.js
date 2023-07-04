import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { storeIdActions } from "../../../store/token";
import Swal from "sweetalert2";
import classes from "./twitchleftlive.module.scss";
const TwitchLeftLive = ({ userId, stream, user, toggle, display, top }) => {
  const [sure, setSure] = useState(false);
  const dispatch = useDispatch();
  const deleteItem = (e) => {
    e.stopPropagation();
    Swal.fire({
      title: "確定刪除？",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#26FF26",
      confirmButtonText: "確認",
      cancelButtonColor: "#FF2626",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(storeIdActions.deleteUserId({ userId }));
      }
    });
  };
  return (
    <>
      {display && (
        <div className={classes["twitch-left-live-detail-display-delete"]}>
          <button
            className={
              sure
                ? classes["twitch-left-live-detail-display-delete-true"]
                : classes["twitch-left-live-detail-display-delete-false"]
            }
            onClick={deleteItem}
            onMouseEnter={() => setSure(true)}
            onMouseLeave={() => setSure(false)}
          >
            {sure ? (
              <FaHeartBroken fontSize={15} color="black" />
            ) : (
              <FaHeart fontSize={15} color="rgb(239,239,241)" />
            )}
          </button>
        </div>
      )}
      <div className={classes["twitch-left-live-detail"]}>
        <img
          className={classes["twitch-left-live-detail-img"]}
          src={user?.profile_image_url}
        />
        {/* 展開後的內容 */}
        {display && (
          <div className={classes["twitch-left-live-detail-display"]}>
            <div className={classes["twitch-left-live-detail-display-center"]}>
              <p className={classes["twitch-left-live-detail-display-name"]}>
                {user?.display_name}
              </p>
              <p className={classes["twitch-left-live-detail-display-game"]}>
                {stream?.game_name}
              </p>
            </div>
            <div className={classes["twitch-left-live-detail-display-right"]}>
              <div
                className={
                  classes["twitch-left-live-detail-display-right-container"]
                }
              >
                <span
                  className={
                    classes["twitch-left-live-detail-display-red-spot"]
                  }
                ></span>

                <p
                  className={classes["twitch-left-live-detail-display-viewer"]}
                >
                  {stream?.viewer_count}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* 未展開的小視窗 */}
      {toggle && !display && (
        <div
          className={classes["twitch-left-live-detail-hover"]}
          style={{ top: `${top}px` }}
        >
          <div className={classes["twitch-left-live-detail-hover-name"]}>
            <span
              className={classes["twitch-left-live-detail-hover-name-content"]}
            >
              {user?.display_name}
              {`\u000A`}
              {`\u2022`}
              {`\u000A`}
              {stream?.game_name}
            </span>
          </div>
          <div className={classes["twitch-left-live-detail-hover-title"]}>
            {stream?.title}
          </div>
          <div className={classes["twitch-left-live-detail-hover-live"]}>
            <span
              className={classes["twitch-left-live-detail-hover-live-point"]}
            ></span>
            <span className={classes["twitch-left-live-detail-hover-live-des"]}>
              Live{`\u000A`}|{`\u000A`}觀眾人數{`\u000A`}:{`\u000A`}
              {stream?.viewer_count}
            </span>
          </div>
        </div>
      )}
      {/* 展凱後的小視窗 */}
      {toggle && display && (
        <div
          className={classes["twitch-left-live-detail-display-hover"]}
          style={{ top: `${top}px` }}
        >
          {stream?.title}
        </div>
      )}
    </>
  );
};

export default TwitchLeftLive;

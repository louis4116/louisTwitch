import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import Swal from "sweetalert2";
import { storeIdActions } from "../../../store/token";
import classes from "./twitchleftoffline.module.scss";
const TwitchLeftOffline = ({ userId, display, user }) => {
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
        <div className={classes["twitch-left-offline-detail-display-delete"]}>
          <button
            className={
              sure
                ? classes["twitch-left-offline-detail-display-delete-true"]
                : classes["twitch-left-offline-detail-display-delete-false"]
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
      <div className={classes["twitch-left-offline-detail"]}>
        <img
          className={classes["twitch-left-offline-detail-img"]}
          src={user?.profile_image_url}
        />
        {/* 展開後的內容 */}
        {display && (
          <div className={classes["twitch-left-offline-detail-display"]}>
            <div
              className={classes["twitch-left-offline-detail-display-center"]}
            >
              <p className={classes["twitch-left-offline-detail-display-name"]}>
                {user?.display_name}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TwitchLeftOffline;

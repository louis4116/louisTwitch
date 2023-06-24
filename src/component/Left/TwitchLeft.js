import React, { useState, useEffect, useRef, useCallback } from "react";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { throttle } from "lodash";
import { useGetUserQuery } from "../../api/TwitchAPI";
import { toggleActions } from "../../store/toggle";
import { twitchDataActions } from "../../store/twitchData";
import { ItemTypes } from "../support/ItemTypes";
import TwitchLeftDetail from "./TwitchLeftDetail";
import classes from "./twitchleft.module.scss";
const TwitchLeft = () => {
  const [user, setUser] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const [userId, setUserId] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const allRef = useRef();
  const dispatch = useDispatch();
  const token = useSelector((item) => item.tokenResult?.token);
  const display = useSelector((item) => item.toggleResult?.left);
  const twitchSmall = useSelector((item) => item?.twitchResult?.twitchSmall);
  const { data } = useGetUserQuery(
    { accessToken: token, user: userId?.userId }, //用已經儲存在state裡的userId去twitch API去尋找資料
    { skip: !token || !userId }
  );

  //reacd dnd drop之後的function，使用throttle不讓他們短時間內重複發送requset
  const dropAfter = throttle(({ userId, title, game, login, viewer }) => {
    setUser((pre) => [...pre, { userId, title, game, login, viewer }]);
    setUserId({ userId });
    //刪除原本的實況頻道資料
    dispatch(twitchDataActions.removeData({ userId }));
  }, 900);
  //react dnd drop之後要怎麼處理
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.DETAIL,
    drop: (item) => {
      dropAfter(item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));
  //將新資料儲存在store裡面
  useEffect(() => {
    dispatch(twitchDataActions.storeSmall(data?.data));
  }, [dispatch, data]);
  //判斷視窗大小是否為920px
  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      if (newWidth < 920) {
        dispatch(toggleActions.toggleLeft(false));
      }
    };
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, [windowWidth]);
  //取得物件在垂直捲軸的位置
  const scrollFn = () => {
    const scrollTop = allRef.current.scrollTop;
    setScrollY(scrollTop);
  };
  //展開前
  const unDisplay = windowWidth >= 920 && (
    <div
      className={classes["twitch-left-arrowright"]}
      onClick={() => {
        dispatch(toggleActions.toggleLeft(true));
      }}
    >
      <FiArrowRight color="white" fontSize={24} />
    </div>
  );
  //展開後
  const Display = windowWidth >= 920 && (
    <div className={classes["twitch-left-arrowleft"]}>
      <span className={classes["twitch-left-arrowleft-store"]}>已儲存</span>
      <div
        className={classes["twitch-left-arrowleft-content"]}
        onClick={() => {
          dispatch(toggleActions.toggleLeft(false));
        }}
      >
        <FiArrowLeft color="white" fontSize={24} />
      </div>
    </div>
  );

  return (
    <div
      className={display ? classes["twitchTop-display"] : classes.twitchTop}
      onScroll={scrollFn}
      ref={allRef}
    >
      <div className={classes["twitch-left"]} ref={drop}>
        {display ? Display : unDisplay}

        <div className={classes["twitch-left-container"]}>
          <div
            className={
              display
                ? classes["twitch-left-second-display"]
                : classes["twitch-left-second"]
            }
          >
            {/* 因為API的限制，所以有些資訊是從原本被drag的component來的，然後按照index的順序放入 */}
            {twitchSmall?.map((item, index) => {
              return (
                <TwitchLeftDetail
                  key={item.id}
                  name={item.display_name}
                  profileImg={item?.profile_image_url}
                  game={user[index]?.game}
                  title={user[index]?.title}
                  login={user[index]?.login}
                  scrollY={scrollY}
                  viewer={user[index]?.viewer}
                  display={display}
                />
              );
            })}
          </div>
          {isOver && canDrop && (
            <div
              className={
                display
                  ? classes["twitch-left-circle-display"]
                  : classes["twitch-left-circle"]
              }
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TwitchLeft;

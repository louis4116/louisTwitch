import React, { useState, useEffect, useRef } from "react";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { throttle } from "lodash";
import { toggleActions } from "../../store/toggle";
import { twitchDataActions } from "../../store/twitchData";
import { storeIdActions } from "../../store/token";
import { ItemTypes } from "../support/ItemTypes";
import TwitchLeftDetail from "./TwitchLeftDetail";
import classes from "./twitchleft.module.scss";
const TwitchLeft = () => {
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [renderId, setRenderId] = useState([]);
  const allRef = useRef();
  const dispatch = useDispatch();
  const token = useSelector((item) => item.tokenResult?.token);
  const display = useSelector((item) => item.toggleResult?.left);
  const userId = useSelector((item) => item.tokenResult?.userId);

  //reacd dnd drop之後的function，使用throttle不讓他們短時間內重複發送requset
  const dropAfter = throttle(({ userId, login, viewer }) => {
    dispatch(storeIdActions.storeUserId({ userId, login, viewer }));
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
  console.log(isOver);
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
  //sort排序，有大到小，未開台的放在最後面
  useEffect(() => {
    let temp = [...userId];
    temp.sort((a, b) => b.viewer - a.viewer);
    setRenderId(temp);
  }, [userId]);
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
            {renderId?.map((item, index) => {
              return (
                <TwitchLeftDetail
                  index={index}
                  key={item.userId}
                  userId={item.userId}
                  isOver={isOver}
                  token={token}
                  scrollY={scrollY}
                  display={display}
                  allUserId={renderId}
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

import React, { useRef, useEffect, useState } from "react";
import {
  useGetUserStreamQuery,
  useGetUserDataQuery,
} from "../../api/TwitchAPI";
import { useDispatch } from "react-redux";
import { storeIdActions } from "../../store/token";
import TwitchLeftLive from "./TwitchLeftLive/TwitchLeftLive";
import TwitchLeftOffline from "./TwitchLeftOffline/TwitchLeftOffline";
import classes from "./twitchleftdetail.module.scss";
const TwitchLeftDetail = ({
  index,
  userId,
  token,
  scrollY,
  display,
  renderId,
}) => {
  const [top, setTop] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [stream, setStream] = useState([]);
  const [user, setUser] = useState([]);
  const hoverRef = useRef();

  const dispatch = useDispatch();
  const { data: userStream } = useGetUserStreamQuery(
    { accessToken: token, userId: userId },
    { skip: !token || !userId, pollingInterval: 600000 }
  );
  const { data: userData } = useGetUserDataQuery(
    { accessToken: token, userId: userId },
    { skip: !token || !userId, pollingInterval: 600000 }
  );
  useEffect(() => {
    //計算垂直高度，如果component超出螢幕範圍，那小視窗就會被設置一個固定值
    const temp = hoverRef.current?.offsetTop;
    let result = temp - scrollY;
    if (result >= 860) {
      setTop(860);
    } else {
      setTop(result);
    }
  }, [display, renderId, toggle]);
  useEffect(() => {
    //最一開始收到的資訊是undefined，所以先return
    if (userStream?.data.length === undefined) return;
    setStream(userStream?.data[0]);
    setUser(userData?.data[0]);
    dispatch(
      storeIdActions.changeUserState({
        index,
        userId,
        viewer: userStream.data[0]?.viewer_count,
      })
    );
  }, [userStream, userData]);

  //用有無實況來判斷該出現的是哪個component
  const streamTrue = !stream ? (
    <TwitchLeftOffline
      display={display}
      userId={userId}
      toggle={toggle}
      stream={stream}
      user={user}
      top={top}
    />
  ) : (
    <TwitchLeftLive
      display={display}
      userId={userId}
      toggle={toggle}
      stream={stream}
      user={user}
      top={top}
    />
  );
  return (
    <div
      className={
        display
          ? classes["twitch-left-detail-display"]
          : classes["twitch-left-detail"]
      }
      ref={hoverRef}
      onClick={() => {
        window.open(`https://www.twitch.tv/${user.login}`);
      }}
      onMouseEnter={() => setToggle(true)}
      onMouseLeave={() => setToggle(false)}
    >
      {streamTrue}
    </div>
  );
};

export default TwitchLeftDetail;

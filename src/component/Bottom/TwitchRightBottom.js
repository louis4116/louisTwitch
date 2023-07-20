import React, { useEffect, useState, useCallback } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { twitchDataActions } from "../../store/twitchData";
import { positionActions } from "../../store/position";
import BottomDetail from "./BottomDetail";
import { CustomDragLayer } from "../customdraglayer/CustomDragLayer";
import classes from "./twitchrightbottom.module.scss";
import "./support.scss";

const TwitchRightBottom = ({ data }) => {
  const [end, setEnd] = useState(10);
  const dispatch = useDispatch();
  const twitchData = useSelector((item) => item?.twitchResult?.twitchData);
  const toggleResult = useSelector((item) => item.toggleResult?.left);
  const toggleTeach = useSelector((item) => item.toggleResult?.teach);
  const twitch = data?.data;
  //分割書量，以10個為一單位
  const loadMoreFn = useCallback(() => {
    if (end.length > 100) return;
    setEnd((item) => item + 10);
  }, []);
  //取得正在實況中的頻道
  useEffect(() => {
    if (data) {
      dispatch(twitchDataActions.storeData(twitch));
    }
  }, [twitch]);
  //清除position的內容，因為要取第一個值，不然會重複取得
  useEffect(() => {
    //會在引導未開啟的時候清除
    if (toggleTeach === false) {
      console.log("clean啟動");
      dispatch(positionActions.cleanPosition());
    }
  }, [toggleResult, toggleTeach]);
  return (
    <div className={classes["twitch-right-bottom"]}>
      <header>Live 頻道</header>
      <CustomDragLayer />
      <div className={classes["twitch-right-bottom-content"]}>
        {twitchData?.slice(0, end)?.map((item, index) => {
          return (
            <BottomDetail
              key={item.user_id}
              index={index}
              userId={item.user_id}
              login={item.user_login}
              title={item.title}
              name={item.user_name}
              game={item.game_name}
              tags={item.tags}
              time={item.started_at}
              viewer={item.viewer_count}
              type={item.type}
            />
          );
        })}
      </div>
      <div className="twitch-right-bottom-second">
        <div className="twitch-right-bottom-second-border">
          <div></div>
        </div>
        <div>
          <div
            className="twitch-right-bottom-second-more"
            onClick={() => loadMoreFn()}
          >
            <p>
              顯示更多
              <FiChevronDown size={22} />
            </p>
          </div>
        </div>
        <div className="twitch-right-bottom-second-border">
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default TwitchRightBottom;

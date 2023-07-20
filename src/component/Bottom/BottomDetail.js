import React, { useRef, useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { twitchDataActions } from "../../store/twitchData";
import BottomDetailTag from "./BottomDetailTag";
import { ItemTypes } from "../support/ItemTypes";
import { getEmptyImage } from "react-dnd-html5-backend";
import BottomDetailImg from "./content/BottomDetailImg";
import classes from "./bottomdetail.module.scss";
const BottomDetail = ({
  index,
  login,
  title,
  name,
  game,
  tags,
  userId,
  time,
  viewer,
  type,
}) => {
  const [allTag, setAlltag] = useState([]);
  const [duration, setDuration] = useState();
  const tagRef = useRef();
  const ref = useRef();
  const dispatch = useDispatch();
  //React-dnd 抓取
  const [, drag, preview] = useDrag(() => ({
    type: ItemTypes.DETAIL,
    //抓取時的資料
    item: {
      userIndex: index,
      userId: userId,
      login: login,
      title: title,
      game: game,
      name: name,
      viewer: viewer,
      duration: duration,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  //React-dnd 放下的部分(用於sortable)
  const [, drop] = useDrop({
    accept: ItemTypes.DETAIL,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item) {
      if (!ref.current) {
        return;
      }

      const hoverIndex = index;
      const draggedIndex = item.userIndex;
      //如果抓取和hover過去的元素一樣，那就會return
      if (draggedIndex === hoverIndex) {
        return;
      }
      //如果不一樣，那就繼續進行sortable
      dispatch(twitchDataActions.moveData({ draggedIndex, hoverIndex }));
      item.userIndex = hoverIndex;
    },
  });
  //用於React-dnd
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  const defaultWidth = 20; //defaultWidth是如果不包含字元，CSS原有的寬度
  useEffect(() => {
    //決定tag標籤的放置數量，太長就會移除超過畫面的tag
    const containerWidth = tagRef?.current?.offsetWidth;
    let tempArray = [];
    let tempTag = [];
    let tempCount = 0;
    let size = 0;
    for (let i = 0; i < tags?.length; i++) {
      tempArray = tags[i];
      tempCount = tempArray.length;
      size += tempCount * 12 + defaultWidth; //12是一個字的font-size，所以有多少字就乘上幾個12
      tempTag.push(tags[i]);
      if (size > containerWidth) {
        size -= tempCount * 12 + defaultWidth;
        tempTag.pop();
        break;
      }
    }
    setAlltag(tempTag);
  }, [tags]);
  const result = allTag?.map((item, index) => {
    return <BottomDetailTag key={item} tag={item} index={index} />;
  });
  drag(drop(ref)); //抓和放component上的每個元素
  return (
    <div className={classes["twitch-right-bottom-content-else"]} ref={ref}>
      <BottomDetailImg
        viewer={viewer}
        type={type}
        time={time}
        login={login}
        duration={duration}
        setDuration={setDuration}
      />

      <div className={classes["twitch-right-bottom-content-else-in-detail"]}>
        <div
          className={
            classes["twitch-right-bottom-content-else-in-detail-title"]
          }
        >
          {title}
        </div>

        <div
          className={classes["twitch-right-bottom-content-else-in-detail-name"]}
        >
          {name}
        </div>
        <div
          className={classes["twitch-right-bottom-content-else-in-detail-game"]}
        >
          {game}
        </div>
        <div
          className={classes["twitch-right-bottom-content-else-in-detail-tag"]}
          ref={tagRef}
        >
          {result}
        </div>
      </div>
    </div>
  );
};

export default BottomDetail;

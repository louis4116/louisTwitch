import React, { useRef, useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
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
  moveItem,
}) => {
  const [allTag, setAlltag] = useState([]);
  const [duration, setDuration] = useState();
  const tagRef = useRef();
  const ref = useRef();
  //React-dnd 抓取
  const [, drag, preview] = useDrag(
    () => ({
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
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [moveItem, userId, index]
  );
  //React-dnd 放下的部分(用於sortable)
  const [, drop] = useDrop({
    accept: ItemTypes.DETAIL,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const hoverIndex = index;
      const draggedIndex = item.userIndex;
      if (draggedIndex === hoverIndex) {
        return;
      }

      moveItem(draggedIndex, hoverIndex);
      item.userIndex = hoverIndex;
    },
  });
  //用於React-dnd
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  const defaultWidth = 20;

  useEffect(() => {
    //決定tag標籤的放置數量，太長就會移除最後一個
    const containerWidth = tagRef?.current?.offsetWidth;
    let tempArray = [];
    let tempTag = [];
    let tempCount = 0;
    let length = 0;
    for (let i = 0; i < tags?.length; i++) {
      tempArray = tags[i];
      tempCount = tempArray.length;
      length += tempCount * 12 + defaultWidth;
      tempTag.push(tags[i]);
      if (length > containerWidth) {
        length -= tempCount * 12 + defaultWidth;
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

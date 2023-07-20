import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TeachFirst from "./TeachFirst";
import TeachSecond from "./TeachSecond";
import TeachThird from "./TeachThird";
import TeachFourth from "./TeachFourth";
import classes from "./teach.module.scss";

//引道如何使用React dnd的component
const Teach = () => {
  const [count, setCount] = useState(0);
  const [handPosition, setHandPosition] = useState({});
  //第一個實況截圖位置
  const firstImgPosition = useSelector((item) => item?.positionResult[0]);
  //左側欄位的展開判斷
  const toggleLeft = useSelector((item) => item.toggleResult?.left);

  //計數器來判斷動畫的播放階段
  const counterFn = () => {
    if (count === 3) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  };

  return (
    <div className={classes.teach} onClick={counterFn}>
      {count === 0 && (
        <TeachFirst
          toggleLeft={toggleLeft}
          firstImgPosition={firstImgPosition}
        />
      )}
      {count === 1 && (
        <TeachSecond
          toggleLeft={toggleLeft}
          firstImgPosition={firstImgPosition}
        />
      )}
      {count === 2 && (
        <TeachThird
          toggleLeft={toggleLeft}
          handPosition={handPosition}
          firstImgPosition={firstImgPosition}
          setHandPosition={setHandPosition}
          count={count}
        />
      )}
      {count === 3 && <TeachFourth handPosition={handPosition} />}
    </div>
  );
};

export default Teach;

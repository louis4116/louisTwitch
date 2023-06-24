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
  const imgPosition = useSelector((item) => item?.positionResult[0]);
  const toggleDisplay = useSelector((item) => item.toggleResult?.left);

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
        <TeachFirst toggleDisplay={toggleDisplay} imgPosition={imgPosition} />
      )}
      {count === 1 && (
        <TeachSecond toggleDisplay={toggleDisplay} imgPosition={imgPosition} />
      )}
      {count === 2 && (
        <TeachThird
          toggleDisplay={toggleDisplay}
          handPosition={handPosition}
          imgPosition={imgPosition}
          setHandPosition={setHandPosition}
          count={count}
        />
      )}
      {count === 3 && <TeachFourth position={handPosition} />}
    </div>
  );
};

export default Teach;

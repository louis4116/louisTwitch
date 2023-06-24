import React, { useRef, useEffect, useState, useCallback } from "react";
import classes from "./bottomdetailtag.module.scss";
const BottomDetailTag = ({ tag }) => {
  return (
    <div className={classes["twitch-right-bottom-content-else-in-tag-oh"]}>
      <span>{tag}</span>
    </div>
  );
};

export default BottomDetailTag;

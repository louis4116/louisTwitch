import React from "react";
import classes from "./twitchnavbar.module.scss";
import { FiHardDrive, FiMessageSquare, FiTriangle } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
const TwitchNavbar = () => {
  return (
    <nav className={classes.twitchnavbar}>
      <div className={classes["twitch-left"]}>
        <div className={classes["twitch-left-img"]}>
          <img src={require("../../img/twitch.png")} alt="icon" />
        </div>
        <div className={classes["twitch-left-follow"]}>
          <div className={classes["twitch-left-follow-top"]}>
            <p>直播中</p>
          </div>
          <div className={classes["twitch-left-follow-bottom"]}></div>
        </div>
      </div>
      <div className={classes["twitch-right"]}>
        <div>
          <FaCrown fontSize={24} />
        </div>
        <div>
          <FiHardDrive fontSize={24} />
        </div>
        <div>
          <FiMessageSquare fontSize={24} />
        </div>
        <div className={classes["twitch-right-triangle"]}>
          <div>
            <FiTriangle fontSize={24} />
          </div>
          <div style={{ fontSize: "13px" }}>購買小奇點</div>
        </div>
        <div>
          <img
            src={require("../../img/frank.jpg")}
            style={{ width: "24px", height: "24px" }}
            alt="frank"
          />
        </div>
        <div>
          <img
            src={require("../../img/7tv.png")}
            style={{ width: "24px", height: "24px", backgroundColor: "white" }}
            alt="7tv"
          />
        </div>
        <div className={classes["twitch-right-profile"]}>
          <div className={classes["twitch-right-profile-div"]}></div>
        </div>
      </div>
    </nav>
  );
};

export default TwitchNavbar;

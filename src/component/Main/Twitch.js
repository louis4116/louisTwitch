import React from "react";
import { useSelector } from "react-redux";
import TwitchNavbar from "../NavBar/TwitchNavbar";
import TwitchLeft from "../Left/TwitchLeft";
import TwitchRight from "../Right/TwitchRight";
import Teach from "../Teach/Teach";
import classes from "./twitch.module.scss";

const Twitch = () => {
  const toggleTeach = useSelector((item) => item.toggleResult?.teach);

  return (
    <div className={classes.twitch}>
      {toggleTeach && <Teach />}
      <div>
        <TwitchNavbar />
      </div>
      <div className={classes["twitch-bottom"]}>
        <TwitchLeft />
        <TwitchRight />
      </div>
    </div>
  );
};

export default Twitch;

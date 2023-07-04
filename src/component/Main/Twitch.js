import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetTokenMutation, useGetTetsQuery } from "../../api/TwitchAPI";
import TwitchNavbar from "../NavBar/TwitchNavbar";
import TwitchLeft from "../Left/TwitchLeft";
import TwitchRight from "../Right/TwitchRight";
import Teach from "../Teach/Teach";
import classes from "./twitch.module.scss";

const Twitch = () => {
  const [accessToken, setAccessToken] = useState("");
  const toggleTeach = useSelector((item) => item.toggleResult?.teach);
  // const [getToken] = useGetTokenMutation();
  // const { data } = useGetDataQuery(
  //   { accessToken },
  //   { skip: !accessToken }
  // );
  // useEffect(() => {
  //   getToken()
  //     .then((res) => {
  //       dispatch(storeIdActions.storeId(res.data.access_token));
  //       setAccessToken(res.data.access_token);
  //     })
  //     .catch((e) => console.log(e));
  // }, []);
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

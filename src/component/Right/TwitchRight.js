import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeIdActions } from "../../store/token";
import { toggleActions } from "../../store/toggle";
import { useGetTokenMutation, useGetDataQuery } from "../../api/TwitchAPI";
import Category from "../UI/Category";
import TwitchRightBottom from "../../component/Bottom/TwitchRightBottom";
import classes from "./twitchright.module.scss";
//分類依據
const support = [
  {
    name: "中文",
    dist: "zh",
  },
  { name: "英文", dist: "en" },
  { name: "日文", dist: "ja" },
  { name: "韓文", dist: "ko" },
];
const TwitchRight = () => {
  const [lang, setLang] = useState("zh");
  const [accessToken, setAccessToken] = useState("");
  const [play, setPlay] = useState(false);
  const dispatch = useDispatch();
  const toggleTeach = useSelector((item) => item.toggleResult?.teach);
  const [getToken] = useGetTokenMutation();
  const { data } = useGetDataQuery(
    { accessToken, lang },
    { skip: !accessToken }
  );
  //動畫播放的按鍵
  const startPlay = () => {
    dispatch(toggleActions.toggleTeach(!toggleTeach));
    setPlay((item) => !item);
  };
  //根據分類去跟API取得資料
  useEffect(() => {
    getToken()
      .then((res) => {
        dispatch(storeIdActions.storeId(res.data.access_token));
        setAccessToken(res.data.access_token);
      })
      .catch((e) => console.log(e));
  }, []);

  const result = support.map((item) => (
    <Category
      key={item.name}
      name={item.name}
      dist={item.dist}
      setLang={setLang}
      lang={lang}
    />
  ));
  return (
    <div className={classes["twitch-right"]}>
      <div className={classes["twitch-right-first"]}>
        <div className={classes["twitch-right-first-in"]}>
          <h1>直播中</h1>

          <button
            className={classes["twitch-right-teach-button"]}
            onClick={startPlay}
          >
            {play ? (
              <div className={classes["twitch-right-teach-pause"]}>
                <div className={classes["pause1"]}></div>
                <div className={classes["pause2"]}></div>
              </div>
            ) : (
              <div className={classes["twitch-right-teach-play"]}>
                <div className={classes["play1"]}></div>
                <div className={classes["play2"]}></div>
                <div className={classes["play3"]}></div>
              </div>
            )}
          </button>
        </div>
        <div className={classes["twitch-right-navbar"]}>{result}</div>
      </div>
      <TwitchRightBottom data={data} />
    </div>
  );
};

export default TwitchRight;

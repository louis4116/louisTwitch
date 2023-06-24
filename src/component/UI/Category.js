import React from "react";
import classes from "./category.module.scss";
const Category = ({ name, setLang, lang, dist }) => {
  const changeLang = () => {
    //分類的結果設定
    if (name === "中文") setLang("zh");
    if (name === "英文") setLang("en");
    if (name === "日文") setLang("ja");
    if (name === "韓文") setLang("ko");
  };

  return (
    <div className={classes["twitch-right-p-first"]} onClick={changeLang}>
      <div
        className={
          dist === lang
            ? classes["twitch-right-p-all"]
            : classes["twitch-right-p-all-none"]
        }
      >
        <div className={classes["twitch-right-p-all-top"]}>
          <nav className={classes["twitch-right-p-all-in-top"]}>{name}</nav>
        </div>
        <div
          className={
            dist === lang ? classes["twitch-right-p-all-in-bottom"] : ""
          }
        ></div>
      </div>
    </div>
  );
};

export default Category;

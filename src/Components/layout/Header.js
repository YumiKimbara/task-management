import React, { useContext, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import classes from "./Header.module.scss";
//import { Link } from "react-router-dom";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import ListContext from "../../Context/ListContext";

const Header = ({ checkKey, setCheckKey }) => {
  const listCtx = useContext(ListContext);
  return (
    <>
      <div className={classes.headerContainer}>
        <div>
          <h3
            onClick={() => {
              localStorage.setItem("Key", "保存する値");
            }}
          >
            ToDoList
          </h3>
        </div>
        <div>
          {checkKey ? (
            <StarRoundedIcon
              className={classes.starRoundIcon}
              onClick={() => {
                setCheckKey(!checkKey);
                // listCtx.dispatchList({
                //   type: "KEY_TASK_PAGE",
                //   payload: true,
                // });
                // {
                //   console.log(listCtx.keyTaskPage);
                // }
              }}
            />
          ) : (
            <StarBorderRoundedIcon
              className={classes.starBorderRoundIcon}
              onClick={() => {
                setCheckKey(!checkKey);
                // listCtx.dispatchList({
                //   type: "KEY_TASK_PAGE",
                //   payload: true,
                // });
                // {
                //   console.log(listCtx.keyTaskPage);
                // }
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Header;

import React from "react";
import { FaRegHeart } from "react-icons/fa";
import classes from "./Header.module.scss";
import { Link } from "react-router-dom";
import StarRoundedIcon from "@material-ui/icons/StarRounded";

const Header = () => {
  return (
    <>
      <div className={classes.headerContainer}>
        <Link to="/">
          <div>
            <h3>ToDoList</h3>
          </div>
        </Link>
        <div>
          <form>
            <input
              type="text"
              placeholder="Search"
              className={classes.searchBox}
            />
          </form>
        </div>
        <div>
          <StarRoundedIcon className={classes.icons} />
        </div>
      </div>
    </>
  );
};

export default Header;

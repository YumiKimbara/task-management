import React, { useContext } from "react";
import { FaRegHeart } from "react-icons/fa";
import classes from "./Header.module.scss";
import { Link } from "react-router-dom";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import ListContext from "../../Context/ListContext";

const Header = () => {
  const listCtx = useContext(ListContext);
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
          <StarRoundedIcon
            className={classes.icons}
            onClick={() => {
              listCtx.dispatchList({
                type: "KEY_TASK_PAGE",
                payload: true,
              });
              {
                console.log(listCtx.keyTaskPage);
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Header;

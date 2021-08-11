import React, { useContext } from "react";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import HomeContext from "../../Context/HomeContext";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";

const useStyles = makeStyles(() =>
  createStyles({
    headerContainer: {
      padding: "0 1.5rem",
      boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
      color: "#484848",
      height: "70px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      // backgroundColor: orange[300],
    },

    starRoundIcon: {
      fontSize: "2rem",
      color: "#fdc500",
      cursor: "pointer",
    },

    starBorderRoundIcon: {
      fontSize: "2rem",
      cursor: "pointer",
    },
  })
);

const Header = ({ checkKey, setCheckKey }) => {
  const classes = useStyles();
  const homeCtx = useContext(HomeContext);
  return (
    <>
      <div className={classes.headerContainer}>
        <div>
          <h3>Task Management</h3>
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

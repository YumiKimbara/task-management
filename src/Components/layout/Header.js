import React, { useContext } from "react";

import HomeContext from "../../Context/HomeContext";

import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";

const useStyles = makeStyles(() =>
  createStyles({
    headerContainer: {
      padding: "0 1.5rem",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
      position: "relative",
      color: "#e5e5e5",
      height: "70px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: orange[900],
    },

    starRoundIcon: {
      fontSize: "2rem",
      cursor: "pointer",
      color: "#e5e5e5",
    },

    starBorderRoundIcon: {
      fontSize: "2rem",
      cursor: "pointer",
      color: "#e5e5e5",
    },
  })
);

const Header = ({ checkKey, setCheckKey }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.headerContainer}>
        <div>
          <h3>TASK MANAGEMENT</h3>
        </div>
        <div>
          {checkKey ? (
            <StarRoundedIcon
              className={classes.starRoundIcon}
              onClick={() => {
                setCheckKey(!checkKey);
              }}
            />
          ) : (
            <StarBorderRoundedIcon
              className={classes.starBorderRoundIcon}
              onClick={() => {
                setCheckKey(!checkKey);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Header;

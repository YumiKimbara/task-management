import React, { useContext } from "react";
import HomeContext from "../../Context/HomeContext";

import TaskCard from "./TaskCard";

import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    keyTaskDone: {
      color: "#484848",
      padding: "0 2rem",
    },
    noKeyTaskMessage: {
      textAlign: "center",
      paddingTop: "10rem",
    },
  })
);

const KeyTask = ({ checkKey }) => {
  const homeCtx = useContext(HomeContext);
  const classes = useStyles();

  const noKeyTask =
    homeCtx.storeTaskData &&
    homeCtx.storeTaskData.every((data) => {
      return !data.isKey;
    });

  return (
    <>
      {homeCtx.storeTaskData && (
        <div>
          <h2 className={classes.keyTaskDone}>KEY TASK</h2>
          <TaskCard
            checkKey={checkKey}
            cardData={homeCtx.storeTaskData.filter((item) => item.isKey)}
          />
        </div>
      )}
      {noKeyTask && (
        <div className={classes.noKeyTaskMessage}>
          <p>KEY TASK DOES'NT EXIST</p>
        </div>
      )}
    </>
  );
};

export default KeyTask;

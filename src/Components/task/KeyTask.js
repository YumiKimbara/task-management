import React, { useContext } from "react";
import HomeContext from "../../Context/HomeContext";
import TaskCard from "./TaskCard";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    keyTaskDone: {
      color: "#484848",
    },
  })
);

const KeyTask = () => {
  const homeCtx = useContext(HomeContext);
  const classes = useStyles();

  const keyHandler = (isKeyTask) => {
    console.log(isKeyTask);
  };

  return (
    <>
      <div>
        <h2 className={classes.keyTaskDone}>Key Task Done</h2>
        {/* <TaskCard cardData={listCtx.doneTaskData} /> */}
        <TaskCard
          keyHandler={keyHandler}
          cardData={
            homeCtx.storeTaskData &&
            homeCtx.storeTaskData.filter((item) => item.isKey)
          }
        />
      </div>
    </>
  );
};

export default KeyTask;

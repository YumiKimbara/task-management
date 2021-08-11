import React, { useContext } from "react";
import HomeContext from "../../Context/HomeContext";
import TaskCard from "./TaskCard";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    taskDone: {
      color: "#484848",
    },
  })
);

const TaskDone = () => {
  const homeCtx = useContext(HomeContext);
  const classes = useStyles();

  const checkDone =
    homeCtx.storeTaskData && homeCtx.storeTaskData.map((data) => data.isDone);

  console.log(checkDone);

  return (
    <>
      {checkDone.includes(true) && (
        <div>
          <h2 className={classes.taskDone}>Done</h2>
          {/* <TaskCard cardData={listCtx.doneTaskData} /> */}
          <TaskCard
            cardData={
              homeCtx.storeTaskData &&
              homeCtx.storeTaskData.filter((item) => item.isDone)
            }
          />
        </div>
      )}
    </>
  );
};

export default TaskDone;

import React, { useContext } from "react";
import classes from "./TaskDone.module.scss";
import ListContext from "../../Context/ListContext";
import TaskCard from "./TaskCard";

const KeyTask = () => {
  const listCtx = useContext(ListContext);
  return (
    <>
      <div className={classes.taskDoneContainer}>
        <h2>Key Task Done</h2>
        {/* <TaskCard cardData={listCtx.doneTaskData} /> */}
        <TaskCard
          cardData={
            listCtx.storeTaskData &&
            listCtx.storeTaskData.filter((item) => item.isKey && item.isDone)
          }
        />
      </div>
    </>
  );
};

export default KeyTask;

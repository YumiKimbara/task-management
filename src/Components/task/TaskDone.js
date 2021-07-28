import React, { useContext } from "react";
import classes from "./TaskDone.module.scss";
import ListContext from "../../Context/ListContext";

const TaskDone = () => {
  const listCtx = useContext(ListContext);

  return (
    <>
      <div className={classes.taskDoneContainer}>
        <h2>Done</h2>
      </div>
    </>
  );
};

export default TaskDone;

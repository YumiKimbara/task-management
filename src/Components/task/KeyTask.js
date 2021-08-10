import React, { useContext, useState } from "react";
import classes from "./TaskDone.module.scss";
import ListContext from "../../Context/ListContext";
import TaskCard from "./TaskCard";

const KeyTask = () => {
  const listCtx = useContext(ListContext);
  const [key, setKey] = useState("");

  const keyHandler = (isKeyTask) => {
    setKey(isKeyTask);
  };

  return (
    <>
      <div className={classes.taskDoneContainer}>
        <h2>Key Task Done</h2>
        {/* <TaskCard cardData={listCtx.doneTaskData} /> */}
        <TaskCard
          keyHandler={keyHandler}
          cardData={
            listCtx.storeTaskData &&
            listCtx.storeTaskData.filter((item) => item.isKey)
          }
        />
      </div>
    </>
  );
};

export default KeyTask;
